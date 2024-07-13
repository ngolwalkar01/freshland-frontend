export interface Product {
    id: number;
    name: string;
    price: string;
    permalink: string;
    thumbnail: string;

    description: string;
    excerpt: string;
    regular_price: string;
    sale_price: string;
    categories: string[];
    images: string[]; 
    related_products: Product[];
}