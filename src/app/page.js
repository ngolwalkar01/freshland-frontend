'use client';

import { useEffect, useState } from "react";
import HomePage from '@/components/pages/home-page/page';
import Layout from '@/components/layout';

import productService from '@/services/product';
import shippingService from '@/services/shipping';
import vipPagesService from '@/services/vipPages';
import deliveryCycleAPI from '@/services/deliveryCycle';
import { getCartData } from "@/components/service/cart";
import AuthHandlerWithSession from '@/components/atoms/auth/google';
import { useData } from '@/contexts/DataContext';

export default function Home() {
  const { productsData: data, loadingProducts: loading, fetchProducts } = useData() || {};
  const [isActivatehomeApis, setISActivateHomeApis] = useState(false);

  useEffect(() => {
    async function fetchData() {
      fetchProducts(false);
      getCartData();
    }

    if (isActivatehomeApis)
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivatehomeApis]);

  return (
    <Layout>
      <AuthHandlerWithSession
        stopRedirect={true}
        activateApis={setISActivateHomeApis}
      />
      <HomePage homePageProps={{ ...data, loading }} />
    </Layout>
  );
}
