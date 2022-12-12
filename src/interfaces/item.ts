export interface IProduct {
    id: string;
    title: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    city_name?: string;
    category_id?: string;
    sold_quantity?: number;
    description?: string;
}

interface IAuthor {
    name: string;
    lastName: string;
}

export interface ISearchResult {
    author: IAuthor;
    categories: string[];
    items: IProduct[];
}

//TODO: Revisar IProduct
export interface IProductResult {
    author: IAuthor;
    categories: string[];
    item: {
        id: string;
        title: string;
        price: {
            currency: string;
            amount: number;
            decimals: number;
        };
        picture: string;
        condition: string;
        free_shipping: Boolean;
        sold_quantity: number;
        description: string;
    };
}
