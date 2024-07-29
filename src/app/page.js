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

export default function Home() {
  const [data, setData] = useState({
    farmProducts: [],
    sessionalProducts: [],
    shippingMethods: [],
    vipPages: [],
    cutOffDaysDetail: undefined
  });
  const [isActivatehomeApis, setISActivateHomeApis] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [
        productsResponse,
        sessionalProductsResponse,
        shippingResponse,
        vipPagesResponse,
        DeliveryCycleResponse
      ] = await Promise.all([
        productService.getProducts(),
        productService.getSessionalProducts(),
        shippingService.getShippingMethods(),
        vipPagesService.getVipPages(10),
        deliveryCycleAPI.getcuttoffday()
      ]);

      setData({
        farmProducts: productsResponse || [],
        sessionalProducts: sessionalProductsResponse || [],
        shippingMethods: shippingResponse || [],
        vipPages: vipPagesResponse || [],
        cutOffDaysDetail: DeliveryCycleResponse || undefined
      });
      getCartData();
    }

    if (isActivatehomeApis)
      fetchData();
  }, [isActivatehomeApis]);

  return (
    <Layout>
      <AuthHandlerWithSession
        stopRedirect={true}
        activateApis={setISActivateHomeApis}
      />
      <HomePage homePageProps={{ ...data }} />
    </Layout>
  );
}
