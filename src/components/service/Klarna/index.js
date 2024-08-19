import { useEffect, useState } from "react";
import axios from "axios";
import KlarnaAPI from "@/services/klarna";
import cookieService from "@/services/cookie";

const expires = parseInt(process.env.NEXT_PUBLIC_CART_KEY_EXPIRY);

const createKlarnaPayload = (cartData) => {
  const orderLines = cartData.items.map((item) => {
    return {
      type: "physical",
      reference: item.id.toString(),
      name: item.name,
      quantity: item.quantity,
      unit_price: parseInt(item.prices.price),
      tax_rate: 0,
      total_amount:
        parseInt(item.totals.line_subtotal) + parseInt(item.totals.line_subtotal_tax),
      total_tax_amount: 0,
    }
  })

  orderLines.push({
    type: "shipping_fee",
    reference: "SHIPPING",
    name: "Standard Shipping",
    quantity: 1,
    unit_price:
      parseInt(cartData.totals.total_shipping) +
      parseInt(cartData.totals.total_shipping_tax),
    tax_rate: 0,
    total_amount:
      parseInt(cartData.totals.total_shipping) +
      parseInt(cartData.totals.total_shipping_tax),
    total_tax_amount: 0,
  });

  if (cartData?.totals?.total_discount)
    orderLines.push({
      type: "discount",
      reference: "DISCOUNT",
      name: "Standard Discount",
      quantity: 1,
      unit_price:
        -parseInt(cartData.totals.total_discount) -
        parseInt(cartData.totals.total_discount_tax),
      tax_rate: 0,
      total_amount:
        -parseInt(cartData.totals.total_discount) -
        parseInt(cartData.totals.total_discount_tax),
      total_tax_amount: 0,
    });

  if (cartData?.totals?.total_fees)
    orderLines.push({
      type: "surcharge",
      reference: "SURCHARGE",
      name: "Standard Surcharge",
      quantity: 1,
      unit_price:
        parseInt(cartData.totals.total_fees) +
        parseInt(cartData.totals.total_fees_tax),
      tax_rate: 0,
      total_amount:
        parseInt(cartData.totals.total_fees) +
        parseInt(cartData.totals.total_fees_tax),
      total_tax_amount: 0,
    });

  const payload = {
    purchase_country: "SE",
    purchase_currency: "SEK", //cartData.totals.currency_code,
    locale: "se-SE",
    order_amount: parseInt(cartData.totals.total_price),
    order_lines: orderLines,
    merchant_urls: {
      terms: process.env.NEXT_PUBLIC_API_BASE_URL,
      checkout: process.env.NEXT_PUBLIC_API_BASE_URL,
      // confirmation: 'http://localhost:8080/confirmation?klarna_order_id={checkout.order.id}',
      confirmation: process.env.NEXT_PUBLIC_API_BASE_URL,
      push: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  };

  return payload;
};

export const updateSessionInOrder = async (order_id, session_id) => {
  await KlarnaAPI.updateOrderKlarnaSession(order_id, session_id);
};

export const fetchClientToken = async (order_id, payload, callBack) => {
  try {
    const { data } = await axios.post("/api/klarnaSession", payload);
    callBack(data.session_id);
    initializeKlarna(data.client_token);
  } catch (error) {
    console.log(error);
  }
};

const generateOrderPayload = (response, session_id, order_id) => {
  const { success, order } = response;
  const obj = {
    success,
    order: {
      ...order,
      session_id,
      woo_order_id: order_id,
    },
  };
  return obj;
};

const onPaymentSuccess = async (payload) => {
  const data = await KlarnaAPI.updateWooOrderSuccess(payload);
  if (data) {
    const { token, user_id } = data;
    if (token) {
      localStorage.setItem("token", `Bearer ${data.token}`);
      cookieService.setCookie("token", `Bearer ${data.token}`, expires);
    }

    if (user_id) {
      localStorage.setItem("userId", data.user_id);
      cookieService.setCookie("userId", data.user_id, expires);
    }
  }
  return data;
};

export const finalizePurchase = async (
  authorizationToken,
  session_id,
  order_id,
  klarnaPayload
) => {
  try {
    const response = await axios.post("/api/klarnafinalizePurchase", {
      authorizationToken,
      orderDetails: klarnaPayload,
    });
    const payload = generateOrderPayload(response.data, session_id, order_id);
    await onPaymentSuccess(payload);
    // window.location = response.data.order.redirect_url;
    console.log("Purchase finalized:", response.data);
  } catch (error) {
    console.error("Error finalizing purchase:", error);
  }
};

export const initializeKlarna = (clientToken) => {
  window.Klarna.Payments.init({
    client_token: clientToken,
  });

  window.Klarna.Payments.load(
    {
      container: "#klarna-payments-container",
      // payment_method_category: 'pay_over_time'
    },
    (res) => {
      console.log("Load response:", res);
    }
  );
};

export const handleKlarnaAuthorization = async (
  orderData,
  cartKey,
  cartData,
  callBack,
  failedCallBack
) => {
  const orderId = orderData.order_id;
  const payload = createKlarnaPayload(cartData);
  await fetchClientToken(orderData.order_id, payload, async (sessionId) => {
    await updateSessionInOrder(orderId, sessionId);
    window.Klarna.Payments.authorize(
      {
        // payment_method_category: selectedOption // Assuming this maps directly to Klarna's expected identifiers
      },
      async (res) => {
        console.log("Authorization response:", res);
        if (res.approved) {
          await finalizePurchase(
            res.authorization_token,
            sessionId,
            orderId,
            payload
          ); // Custom function to finalize the purchase on your backend
          callBack(orderData);
        } else {
          failedCallBack(orderData, cartKey);
          console.error("Authorization failed:", res.error);
        }
      }
    );
  });
};
