
import { getCorrectPrice } from "@/helper";

const getPayloadFromOrderData = (event_name, orderData) => {
    try {
        if (!(orderData && window && window.dataLayer)) return;

        const currency_minor_unit = orderData.totals.currency_minor_unit;
        let content_ids = [];
        const additional_info = {
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

            items: orderData.items.map(item => {
                content_ids.push(item.sku);
                return {
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
                }
            })
        }
        fbq('track', event_name, {
            content_ids: content_ids,
            content_type: 'product',
            value: additional_info.value,
            currency: additional_info.currency,
            num_items: additional_info?.items.length || 0,
            order_id: orderData.id
        });
    } catch (error) {
        console.log(error);
    }
}

const getPayloadFromProductDetail = (event_name, productDetail) => {
    try {
        if (!(productDetail && window && window.dataLayer)) return;

        const productData = {
            item_id: productDetail.sku,
            item_name: productDetail.name,
            affiliation: "Freshland SE",
            item_category: productDetail.categories.join(", "),
            currency: process.env.NEXT_PUBLIC_CURRENCY_CODE,
            price: productDetail.price,
            quantity: 1
        };

        fbq('track', event_name, {
            content_ids: [productDetail.sku],
            content_type: 'product',
            content_name: productDetail.name,
            content_category: productDetail.categories.join(", "),
            value: productDetail.price,
            currency: process.env.NEXT_PUBLIC_CURRENCY_CODE,
            additional_info: productData
        });
    } catch (error) {
        console.log(error);
    }
}

const getPayloadFromCartData = (event_name, cartData) => {
    try {
        if (!(cartData && window && window.dataLayer)) return;

        const currencyCode = cartData.totals.currency_code
        const currMinorUnit = cartData.totals.currency_minor_unit;
        let content_ids = []
        const cartItems = cartData.items.map(item => {
            content_ids.push(item.sku);
            return {
                item_id: item.sku,
                item_name: item.name,
                affiliation: "Freshland SE",
                item_category: item.type,
                currency: currencyCode,
                price: getCorrectPrice(item.prices.price, currMinorUnit),
                quantity: item.quantity
            }
        });
        const totalValue = getCorrectPrice(cartData.totals.total_price, currMinorUnit);

        const obj = {
            content_ids: content_ids,
            content_type: 'product',
            value: totalValue,
            currency: currencyCode,
            num_items: cartData?.items.length || 0,
            additional_info: cartItems
        }

        fbq('track', event_name, obj);
    } catch (error) {
        console.log(error);
    }
}

export const fbViewItem = (productDetail) => {
    getPayloadFromProductDetail("ViewContent", productDetail);
}

export const fbAddToCart = (cartData) => {
    getPayloadFromCartData("AddToCart", cartData);
}

export const fbViewCart = (cartData) => {
    getPayloadFromCartData("ViewCart", cartData);
}

export const fbCheckout = (cartData) => {
    getPayloadFromCartData("InitiateCheckout", cartData);
}

export const fbOrder = (orderData) => {
    getPayloadFromOrderData("Purchase", orderData);
}