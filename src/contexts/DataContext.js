"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import productService from '@/services/product';
import vipPagesService from '@/services/vipPages';
import deliveryCycleAPI from '@/services/deliveryCycle';
import productCategoryService from "@/services/productCategories";
import { usePathname } from 'next/navigation';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const pathname = usePathname();

  const [productsData, setProductsData] = useState({
    farmProducts: [],
    vipPages: [],
    cutOffDaysDetail: undefined
  });
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [shopData, setShopData] = useState([]);
  const [loadingShop, setLoadingShop] = useState(false);

  const [categories, setCategories] = useState([]);

  const [vipPageData, setVipPageData] = useState([]);
  const [loadingVipPage, setLoadingVipPage] = useState(false);

  const fetchProducts = async (isApplyLoader = true) => {
    isApplyLoader ? setLoadingProducts(true) : null;
    try {
      const [
        productsResponse,
        // sessionalProductsResponse,
        // shippingResponse,
        vipPagesResponse,
        DeliveryCycleResponse
      ] = await Promise.all([
        productService.getProducts(),
        // productService.getSessionalProducts(),
        // shippingService.getShippingMethods(),
        vipPagesService.getVipPages(10),
        deliveryCycleAPI.getcuttoffday()
      ]);
      isApplyLoader ? setLoadingProducts(false) : null;
      setProductsData({
        farmProducts: productsResponse || [],
        // sessionalProducts: sessionalProductsResponse || [],
        // shippingMethods: shippingResponse || [],
        vipPages: vipPagesResponse || [],
        cutOffDaysDetail: DeliveryCycleResponse || undefined
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setLoadingProducts(false);
    }
  };

  const fetchShopData = async (isApplyLoader = true) => {
    try {
      isApplyLoader ? setLoadingShop(true) : null;
      const categoryWithProducts = await productCategoryService.getCategoriesWithProducts();
      setShopData({ categoryWithProducts })
    } catch (error) {
      console.log(error);
    } finally {
      isApplyLoader ? setLoadingShop(false) : null;
    }
  }

  const fetchHeaderData = async () => {
    const data = await productCategoryService.getCategories();
    setCategories(data);
  }

  const fetchVipData = async (isApplyLoader = true) => {
    try {
      isApplyLoader ? setLoadingVipPage(true) : null;
      const vipData = await vipPagesService.getAllVipPages();
      setVipPageData(vipData)
    } catch (error) {
      console.log(error);
    } finally {
      isApplyLoader ? setLoadingVipPage(false) : null;
    }
  }

  const fetchData = async () => {
    switch (pathname) {
      case '/':
        await Promise.all([fetchHeaderData(), fetchProducts()]);
        await Promise.all([fetchShopData(), fetchVipData()]);
        break;
      case '/shop':
        await Promise.all([fetchHeaderData(), fetchShopData()]);
        await Promise.all([fetchProducts(), fetchVipData()]);
        break;
      case '/vip':
        await Promise.all([fetchHeaderData(), fetchVipData()]);
        await Promise.all([fetchProducts(), fetchShopData()]);
        break;
      default:
        await Promise.all([fetchHeaderData(), fetchProducts(), fetchShopData(), fetchVipData()]);
        break;
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider value={{
      productsData, loadingProducts, fetchProducts,
      shopData, loadingShop, fetchShopData,
      categories,
      vipPageData, loadingVipPage, fetchVipData
    }}>
      {children}
    </DataContext.Provider>
  );
};
