'use client';

import Shop from "@/components/pages/shop";
import Layout from "@/components/layout";
import { useEffect } from "react";
import Shopskeleton from "@/components/skeleton/shopskeleton";
import { getCartData } from "@/components/service/cart";
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';
import { useData } from '@/contexts/DataContext';

const GoodsPage = () => {
  const { shopData: data, loadingShop: loading, fetchShopData } = useData() || {};

  useEffect(() => {
    async function fetchData() {
      try {
        fetchShopData(false)
        getCartData();
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <ActiveUserKlaviyo />
      {loading ? <Shopskeleton /> : <Shop {...data} />}
    </Layout>
  );
};

export default GoodsPage;
