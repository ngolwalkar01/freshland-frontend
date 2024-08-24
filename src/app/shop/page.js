'use client';

import Shop from "@/components/pages/shop";
import Layout from "@/components/layout";
import { useEffect } from "react";
import Shopskeleton from "@/components/skeleton/shopskeleton";
import { getCartData } from "@/components/service/cart";
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';
import { useData } from '@/contexts/DataContext';

const GoodsPage = () => {
  const { shopData: data, loadingShop: loading } = useData() || {};

  useEffect(() => {
    async function fetchData() {
      try {
        getCartData();
      } catch (error) {
        console.log(error);
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
