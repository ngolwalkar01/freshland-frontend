import { GetServerSideProps, NextPage } from "next";
import Shop from "@/components/pages/shop";
import Layout from "@/components/layout";
import { CategoryWithProducts } from "@/interfaces/categoryWithProducts";
import productCategoryService from "@/services/productCategories";

interface ProductCategoryProps {
  categoryWithProducts: CategoryWithProducts[];
}

export const getServerSideProps: GetServerSideProps<
  ProductCategoryProps
> = async () => {
  try {
    const categoryWithProducts: CategoryWithProducts[] =
      await productCategoryService.getCategoriesWithProducts();

    return { props: { categoryWithProducts } };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { categoryWithProducts: [] } };
  }
};

const GoodsPage: NextPage<ProductCategoryProps> = (props) => {
  return (
    <Layout>
      <Shop {...props} />
    </Layout>
  );
};

export default GoodsPage;
