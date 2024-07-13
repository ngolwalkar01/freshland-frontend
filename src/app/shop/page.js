'use client';

import Shop from "@/components/pages/shop";
import Layout from "@/components/layout";
import productCategoryService from "@/services/productCategories";
import { useEffect, useState } from "react";
import Shopskeleton from "@/components/skeleton/shopskeleton";

const GoodsPage = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const categoryWithProducts = await productCategoryService.getCategoriesWithProducts();
      setData({ categoryWithProducts })
      setLoading(false);
    }

    fetchData();
  }, [])

  return (
    <Layout>
      {loading ? <Shopskeleton /> : <Shop {...data} />}
    </Layout>
  );
};

export default GoodsPage;
