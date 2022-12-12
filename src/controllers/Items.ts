import { Response, Request, NextFunction } from 'express';
import axios from 'axios';
import { DescriptionResult, Result, ResultElement } from '@interfaces/index';
import { mapResponse } from '../utils';
import mlApi from '../api/mlApi';

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id = '' } = req.params;

    try {
        const { data } = await mlApi.get<ResultElement>(`/items/${id}`);
        const { data: dataDescription } = await mlApi.get<DescriptionResult>(`/items/${id}/description`);
        const dataResult = await mapResponse.getOne(data, dataDescription.plain_text);
        return res.status(200).json({ data: dataResult });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(400).json({ message: error.response?.data.message });
        }

        return res.status(400).json({ error });
    }
};

const search = async (req: Request, res: Response, next: NextFunction) => {
    const { q = '' } = req.query;

    try {
        const { data } = await mlApi.get<Result>(`/sites/MLA/search?q=${q}`);
        const result = await mapResponse.search(data.results);
        return res.status(200).json({ data: result });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(400).json({ message: error.response?.data.message });
        }

        return res.status(400).json({ error });
    }
};

export default {
    getOne,
    search
};
