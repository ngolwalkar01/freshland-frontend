import React from 'react';
import OrderDeadline from '@/components/atoms/OrderDeadline/OrderDeadline';
import TopImage from '@/components/atoms/TopImage/TopImage';
import Goods from '@/components/atoms/Goods/Goods';
import ProductSlider from '@/components/atoms/ProductSlider/ProductSlider';
import AddSignUp from '@/components/atoms/AddSignUp/AddSignUp';
import VideoComponent from '@/components/atoms/video';
import Register from '@/components/atoms/register';
import Testimonials from '@/components/atoms/Testimonials/Testimonials';
import { usePathname } from 'next/navigation';
import Award from '@/components/atoms/Award/Awardlogo';
import { addToCart, updateCartQuantity, removeCartItem } from '@/components/service/cart';
import LazyLoad from "react-lazyload"; // Import LazyLoad component
import CustomTestimonial from '@/components/atoms/CustomTestimonial/CustomTestimonial'
import Categories from '@/components/atoms/categories';

const HomePage = ({ homePageProps }) => {
  const { farmProducts, sessionalProducts, shippingMethods, vipPages, cutOffDaysDetail, loading: pageLoading } = homePageProps;
  const enableMockData = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === 'true';

  const shippingProps = { shippingMethods, enableMockData, cutOffDaysDetail };
  const vipProps = { vipPages, enableMockData };
  const pathname = usePathname();

  const page = "home"
  return (
    <>
      {pathname === '/' && <TopImage farmProductProps={{
        productData: farmProducts,
        enableMockData,
        addToCart,
        updateCartQuantity,
        removeCartItem,
        page,
        pageLoading
      }} />}

      <LazyLoad height={200} offset={100}>
        <OrderDeadline {...shippingProps} />
        {/* <Goods sessionalProductProps={{ productData: sessionalProducts, enableMockData, addToCart, updateCartQuantity, removeCartItem }} /> */}

        <Categories />
        <Register />
        <AddSignUp {...vipProps} homePageLoading={pageLoading}/>
        <VideoComponent />
        <Award />
        <ProductSlider />
        {/* <Testimonials /> */}
        {/* <CustomTestimonial /> */}

      </LazyLoad>
    </>
  );
};

export default HomePage;