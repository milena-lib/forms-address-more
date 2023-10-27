export interface Product {
    id: number;
    name: string;
    isFreeShipping: boolean;
    price: number;
}

export interface ProductFullDetails extends Product {
    description: string;
}