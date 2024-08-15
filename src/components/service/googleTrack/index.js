
import { getCorrectPrice } from "@/helper";

const getPayloadFromOrderData = (event_name, orderData) => {
    try {
        if (!orderData) return;

        const currency_minor_unit = orderData.totals.currency_minor_unit;
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({ ecommerce: null });

        dataLayer.push({
            event: event_name,
            ecommerce: {
                transaction_id: orderData.id.toString(),
                value: getCorrectPrice(
                    parseInt(orderData?.totals?.total_price),
                    currency_minor_unit
                ),
                tax: getCorrectPrice(
                    parseInt(orderData?.totals?.total_tax),
                    currency_minor_unit
                ),
                shipping: getCorrectPrice(
                    parseInt(orderData?.totals?.total_shipping),
                    currency_minor_unit
                ),
                currency: orderData.totals.currency_code,
                coupon: (orderData.coupons.length > 0 ? orderData.coupons.join(", ") : ""),
                email: orderData.billing_address.email,
                phone_number: orderData.billing_address.phone,
                first_name: orderData.billing_address.first_name,
                last_name: orderData.billing_address.last_name,
                street: orderData.billing_address.address_1,
                city: orderData.billing_address.city,
                region: orderData.billing_address.state,
                postal_code: orderData.billing_address.postcode,
                country: orderData.billing_address.country,

                items: orderData.items.map(item => ({
                    item_id: item.sku,
                    item_name: item.name,
                    affiliation: "Freshland SE",
                    item_category: "",
                    currency: orderData.totals.currency_code,
                    price: getCorrectPrice(
                        parseInt(item.totals.line_total),
                        currency_minor_unit
                    ),
                    quantity: item.quantity
                }))
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const getPayloadFromProductDetail = (event_name, productDetail) => {
    try {
        if (!productDetail) return;

        const productData = {
            item_id: productDetail.sku,
            item_name: productDetail.name,
            affiliation: "Freshland SE",
            item_category: productDetail.categories.join(", "),
            currency: process.env.NEXT_PUBLIC_CURRENCY_CODE,
            price: productDetail.price,
            quantity: 1
        };

        const totalValue = productData.price;

        window.dataLayer = window.dataLayer || [];
        dataLayer.push({ ecommerce: null });

        dataLayer.push({
            event: event_name,
            ecommerce: {
                currency: process.env.NEXT_PUBLIC_CURRENCY_CODE,
                value: totalValue,
                items: [productData]
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const getPayloadFromCartData = (event_name, cartData) => {
    try {
        if (!cartData) return;

        const currencyCode = cartData.totals.currency_code
        const currMinorUnit = cartData.totals.currency_minor_unit;
        const cartItems = cartData.items.map(item => ({
            item_id: item.sku,
            item_name: item.name,
            affiliation: "Freshland SE",
            item_category: item.type,
            currency: currencyCode,
            price: getCorrectPrice(item.prices.price, currMinorUnit),
            quantity: item.quantity
        }));

        const totalValue = getCorrectPrice(cartData.totals.total_price, currMinorUnit);
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({ ecommerce: null });
        dataLayer.push({
            event: event_name,
            ecommerce: {
                currency: currencyCode,
                value: totalValue,
                items: cartItems
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const gtViewItem = (productDetail) => {
    getPayloadFromProductDetail("view_item", productDetail);
}

export const gtAddToCart = (cartData) => {
    getPayloadFromCartData("add_to_cart", cartData);
}

export const gtViewCart = (cartData) => {
    getPayloadFromCartData("view_cart", cartData);
}

export const gtCheckout = (cartData) => {
    getPayloadFromCartData("begin_checkout", cartData);
}

export const gtOrder = (orderData) => {
    getPayloadFromOrderData("purchase", orderData);
}