import { getCorrectPrice, getEmail } from "@/helper";

const init = () => {
    if (typeof window === 'undefined' || !window.pintrk) {
        return false;
    }

    const email = getEmail();
    if (email) {
        if (!window.pintrk.loaded) {
            pintrk('load', '2612957874414', { em: email });
            pintrk('page');
            window.pintrk.loaded = true;
        }
        return true;
    }

    return false;
};

const sendPinterestEvent = (event_name, payload) => {
    try {
        if (!(window && window.pintrk)) return;

        window.pintrk('track', event_name, payload);
    } catch (error) {
        console.log(error);
    }
};

const getPayloadFromOrderData = (event_name, orderData) => {
    try {
        if (!orderData) return;

        const currency_minor_unit = orderData.totals.currency_minor_unit;

        const payload = {
            order_id: orderData.id.toString(),
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
                id: item.sku,
                name: item.name,
                category: "", // Pinterest doesn't specifically require item categories
                price: getCorrectPrice(
                    parseInt(item.totals.line_total),
                    currency_minor_unit
                ),
                quantity: item.quantity
            }))
        };

        sendPinterestEvent(event_name, payload);
    } catch (error) {
        console.log(error);
    }
};

const getPayloadFromProductDetail = (event_name, productDetail) => {
    try {
        if (!productDetail) return;

        const payload = {
            id: productDetail.sku,
            name: productDetail.name,
            category: productDetail.categories.join(", "),
            currency: process.env.NEXT_PUBLIC_CURRENCY_CODE,
            price: productDetail.price,
            quantity: 1
        };

        sendPinterestEvent(event_name, { items: [payload] });
    } catch (error) {
        console.log(error);
    }
};

const getPayloadFromCartData = (event_name, cartData) => {
    try {
        if (!cartData) return;

        const currencyCode = cartData.totals.currency_code;
        const currMinorUnit = cartData.totals.currency_minor_unit;

        const cartItems = cartData.items.map(item => ({
            id: item.sku,
            name: item.name,
            category: item.type,
            currency: currencyCode,
            price: getCorrectPrice(item.prices.price, currMinorUnit),
            quantity: item.quantity
        }));

        const payload = {
            value: getCorrectPrice(cartData.totals.total_price, currMinorUnit),
            currency: currencyCode,
            items: cartItems
        };

        sendPinterestEvent(event_name, payload);
    } catch (error) {
        console.log(error);
    }
};

export const ptViewItem = (productDetail) => {
    if (init())
        getPayloadFromProductDetail("PageVisit", productDetail);
};

export const ptAddToCart = (cartData) => {
    if (init())
        getPayloadFromCartData("AddToCart", cartData);
};

export const ptViewCart = (cartData) => {
    if (init())
        getPayloadFromCartData("ViewCart", cartData);
};

export const ptCheckout = (cartData) => {
    if (init())
        getPayloadFromCartData("InitiateCheckout", cartData);
};

export const ptOrder = (orderData) => {
    if (init())
        getPayloadFromOrderData("Purchase", orderData);
};
