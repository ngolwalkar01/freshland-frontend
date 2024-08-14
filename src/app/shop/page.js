'use client';

import Shop from "@/components/pages/shop";
import Layout from "@/components/layout";
import productCategoryService from "@/services/productCategories";
import { useEffect, useState } from "react";
import Shopskeleton from "@/components/skeleton/shopskeleton";
import { getCartData } from "@/components/service/cart";
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const GoodsPage = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const categoryWithProducts = await productCategoryService.getCategoriesWithProducts();
        setData({ categoryWithProducts })
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        getCartData();
      }
    }

    fetchData();
  }, [])

  return (
    <Layout>
      <ActiveUserKlaviyo />
      {loading ? <Shopskeleton /> : <Shop {...data} />}
    </Layout>
  );
};

export default GoodsPage;
