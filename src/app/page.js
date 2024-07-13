'use client';

import { useEffect, useState } from "react";
import HomePage from '@/components/pages/home-page/page';
import Layout from '@/components/layout';

import productService from '@/services/product';
import shippingService from '@/services/shipping';
import vipPagesService from '@/services/vipPages';
import deliveryCycleAPI from '@/services/deliveryCycle';
import { toast, ToastContainer } from 'react-toastify';

export default function Home() {
  const [data, setData] = useState({
    farmProducts: [],
    sessionalProducts: [],
    shippingMethods: [],
    vipPages: [],
    cutOffDaysDetail: undefined
  });

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
        vipPagesService.getVipPages(),
        deliveryCycleAPI.getcuttoffday()
      ]);

      setData({
        farmProducts: productsResponse || [],
        sessionalProducts: sessionalProductsResponse || [],
        shippingMethods: shippingResponse || [],
        vipPages: vipPagesResponse || [],
        cutOffDaysDetail: DeliveryCycleResponse || undefined
      });
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <HomePage homePageProps={{ ...data }} />
    </Layout>
  );
}
