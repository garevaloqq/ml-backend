import { Response, Request, NextFunction } from 'express';

import { isAxiosError, getProducts, findProduct, findProductDescription, findProductCategory } from '../utils/mlService';
import { toProduct, toListProduct } from '../utils/mapper';
import { ResultElement } from '@interfaces/ml-api';
import { findMostFrequent } from '../utils/util';

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id = '' } = req.params;

    try {
        const { data } = await findProduct(id);
        const { data: dataDescription } = await findProductDescription(id);
        const { data: category } = await findProductCategory(data.category_id);
        const categories = category.path_from_root.map((path) => path.name);

        const dataResult = await toProduct(data, dataDescription.plain_text, categories);
        return res.status(200).json({ data: dataResult });
    } catch (error) {
        if (isAxiosError(error)) {
            return res.status(400).json({ message: error.response?.data.message });
        }

        return res.status(500).json({ error });
    }
};

const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { q = '' } = req.query;

    if (q === '') {
        const result = await toListProduct([], []);
        return res.status(200).json({ data: result });
    }

    try {
        const { data } = await getProducts(q.toString());
        const products: ResultElement[] = data.results.splice(0, 4);
        const categoriesIds = products.map(({ category_id }) => category_id);
        const categoryId = await findMostFrequent(categoriesIds);
        const { data: category } = await findProductCategory(categoryId);
        const categories = category.path_from_root.map((path) => path.name);

        const result = await toListProduct(products, categories);
        return res.status(200).json({ data: result });
    } catch (error) {
        if (isAxiosError(error)) {
            return res.status(400).json({ message: error.response?.data.message });
        }

        return res.status(500).json({ error });
    }
};

export default {
    getProduct,
    searchProducts
};
