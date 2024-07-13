import { Category } from "./category";
import { Product } from "./product";

export interface CategoryWithProducts {
    category: Category;
    products: Product[];
}