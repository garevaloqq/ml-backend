import { Attribute, ResultElement, IProduct, ISearchResult, IProductResult } from '../interfaces';
import { author } from './constants';
import { findProductCategory } from './mlService';

//TODO Categories

export const toListProduct = async (data: ResultElement[], categories: string[]): Promise<ISearchResult> => {
    if (data.length === 0) {
        return {
            author,
            categories,
            items: []
        };
    }

    const items = data.splice(0, 4).map(({ id, title, price, thumbnail, attributes, shipping, category_id, currency_id, address }) => {
        const [amount, decimals = '0'] = price.toString().split('.');

        return <IProduct>{
            id,
            title,
            price: {
                currency: currency_id,
                amount: parseInt(amount),
                decimals: parseInt(decimals)
            },
            picture: thumbnail,
            condition: attributes ? attributes.find((cond: Attribute) => cond.id === 'ITEM_CONDITION')?.value_name : 'Unknown',
            free_shipping: shipping.free_shipping,
            category_id,
            city_name: address.city_name
        };
    });

    return {
        author,
        categories,
        items
    };
};

export const toProduct = async ({ id, title, price, thumbnail, attributes, shipping, sold_quantity }: ResultElement, description: string, categories: string[]): Promise<IProductResult> => {
    const [amount, decimals = '0'] = price.toString().split('.');

    return {
        author,
        categories,
        item: {
            id,
            title,
            price: {
                currency: 'USD',
                amount: parseInt(amount),
                decimals: parseInt(decimals)
            },
            picture: thumbnail,
            condition: attributes?.find((cond: Attribute) => cond.id === 'ITEM_CONDITION')?.value_name || 'Unknown',
            free_shipping: shipping.free_shipping,
            sold_quantity,
            description
        }
    };
};
