import { Attribute, ResultElement, IProduct, ISearchResult, IProductResult } from '../interfaces';

//TODO Categories

export const search = async (data: ResultElement[]): Promise<ISearchResult> => {
    const items = data.map(({ id, title, price, thumbnail, attributes, shipping, category_id, currency_id, address }) => {
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
        author: {
            name: 'Geider',
            lastName: 'Arevalo Quintana'
        },
        categories: ['Uno'],
        items
    };
};

export const getOne = async ({ id, title, price, thumbnail, attributes, shipping, sold_quantity }: ResultElement, description: string): Promise<IProductResult> => {
    const [amount, decimals = '0'] = price.toString().split('.');

    return {
        author: {
            name: 'Geider',
            lastName: 'Arevalo Quintana'
        },
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
