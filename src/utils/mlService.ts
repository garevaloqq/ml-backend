import { CategoryInfo, DescriptionResult, Result, ResultElement } from '@interfaces/ml-api';
import axios from 'axios';
import { config } from '../config/config';

const mlService = axios.create({
    baseURL: config.externalApi.url
});

export const isAxiosError = axios.isAxiosError;

export const getProducts = async (q: string) => await mlService.get<Result>(`/sites/MLA/search?q=${q}`);
export const findProduct = async (id: string) => await mlService.get<ResultElement>(`/items/${id}`);
export const findProductDescription = async (id: string) => await mlService.get<DescriptionResult>(`/items/${id}/description`);
export const findProductCategory = async (categoryId: string) => await mlService.get<CategoryInfo>(`/categories/${categoryId}`);
