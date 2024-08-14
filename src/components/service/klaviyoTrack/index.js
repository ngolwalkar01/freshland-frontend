import { generateRandomId, getEmail, getCorrectPrice, getBaseUrl } from "@/helper";
import KlaviyoAPI from "@/services/klaviyo/apiIndex";
import { gtViewItem, gtAddToCart, gtViewCart, gtCheckout, gtOrder } from "../googleTrack";

export const setKlaviyoEmail = (klaviyoEmail) => {
    if(klaviyoEmail)
        localStorage.setItem("klaviyoEmail", klaviyoEmail);
}

export const identifyUser = async () => {
    const email = getEmail();
    if (email)
        await KlaviyoAPI.klaviyoTrackAPI('identify', { email })
    // klaviyo.push(['identify', { $email: email }]);
};

export const userActiveOnSite = async () => {
    const email = getEmail();
    if (email)
        await KlaviyoAPI.klaviyoTrackAPI('active-on-site', { email })
    // klaviyo.push(['identify', { $email: email }]);
};

export const trackProductDetailPage = async (productDetail) => {
    try {
        const email = getEmail();
        if (productDetail && email) {
            gtViewItem(productDetail);
            const payload = {
                "email": email,
                "product_name": productDetail?.name,
                "product_id": productDetail?.id,
                "price": productDetail.price
            }
            await KlaviyoAPI.klaviyoTrackAPI('viewed-product', payload);
            // const item = {
            //     "ProductName": productDetail?.name,
            //     "ProductID": productDetail?.id,
            //     "SKU": productDetail?.sku,
            //     "Categories": productDetail.categories.join(', '),
            //     "ImageURL": productDetail.thumbnail,
            //     "URL": window.location.href,
            //     "Brand": "",
            //     "Price": productDetail.price,
            //     "CompareAtPrice": productDetail.regular_price
            // };
            // klaviyo.push(["track", "Viewed Product", item]);
        }
    } catch (error) {
        console.log(error);
    }
}

export const trackAddToCartPage = async (cartData) => {
    try {
        if(cartData) {
            gtViewCart(cartData);
        }
        // if (cartData) {
        //     const lastItemIndex = cartData.items.length - 1;
        //     const currMinorUnit = cartData.totals.currency_minor_unit;
        //     const totalValue = getCorrectPrice(cartData.totals.total_price, currMinorUnit);

        //     const newCartObject = {
        //         "$value": totalValue.toFixed(2),
        //         "AddedItemProductName": cartData.items[lastItemIndex].name, // Assuming the last item added is at index 1
        //         "AddedItemProductID": cartData.items[lastItemIndex].id.toString(),
        //         "AddedItemSKU": cartData.items[lastItemIndex].sku,
        //         "AddedItemCategories": cartData.items[lastItemIndex].categories,
        //         "AddedItemImageURL": cartData.items[lastItemIndex].images[0].src,
        //         "AddedItemURL": cartData.items[lastItemIndex].permalink,
        //         "AddedItemPrice": getCorrectPrice(cartData.items[lastItemIndex].prices.price, currMinorUnit),
        //         "AddedItemQuantity": cartData.items[lastItemIndex].quantity,
        //         "ItemNames": cartData.items.map(item => item.name),
        //         "CheckoutURL": `${getBaseUrl()}/checkout`,
        //         "Items": cartData.items && cartData.items.length > 0 ?
        //             cartData.items.map(item => ({
        //                 "ProductID": item.id.toString(),
        //                 "SKU": item.sku,
        //                 "ProductName": item.name,
        //                 "Quantity": item.quantity,
        //                 "ItemPrice": getCorrectPrice(item.prices.price, currMinorUnit),
        //                 "RowTotal": getCorrectPrice(item.prices.price, currMinorUnit) * item.quantity,
        //                 "ProductURL": item.permalink,
        //                 "ImageURL": item.images[0].src,
        //                 "ProductCategories": item.categories
        //             })) :
        //             []
        //     };
        //     klaviyo.push(["track", "Added to Cart", newCartObject])
        // }
    } catch (error) {
        console.log(error);
    }
}

export const trackAddToCheckoutPage = async (cartData) => {
    try {
        const email = getEmail();
        if (cartData && email) {
            gtCheckout(cartData);
            const currMinorUnit = cartData.totals.currency_minor_unit;
            const newCheckoutObjectAPI = {
                email,
                checkout_id: generateRandomId(),
                items: cartData.items.map(item => ({
                    product_name: item.name,
                    product_id: item.id.toString(),
                    quantity: item.quantity,
                    price: getCorrectPrice(item.prices.price, currMinorUnit)
                })),
                total: getCorrectPrice(cartData.totals.total_price, currMinorUnit)
            };
            await KlaviyoAPI.klaviyoTrackAPI('started-checkout', newCheckoutObjectAPI)
        }
    } catch (error) {
        console.log(error);
    }
}

export const trackItemAddToCart = async (cartData, prodId, quantity) => {
    try {
        const email = getEmail();
        if (cartData && prodId && email && cartData.items && cartData.items.length > 0) {
            const productDetail = cartData.items.find(x => x.id == prodId);
            if (productDetail) {
                gtAddToCart(cartData);
                const currMinorUnit = cartData.totals.currency_minor_unit;
                const newCheckoutObjectAPI = {
                    email,
                    "product_name": productDetail.name,
                    "product_id": productDetail.id,
                    "quantity": quantity,
                    "price": getCorrectPrice(productDetail.prices.price, currMinorUnit)
                };
                await KlaviyoAPI.klaviyoTrackAPI('added-to-cart', newCheckoutObjectAPI)
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const trackItemPlaceOrder = async (orderData) => {
    try {
        const email = getEmail();
        const currentEmail = email || orderData?.billing_address?.email;
        const isProcessOrderTracking = currentEmail && orderData;
        if (isProcessOrderTracking) {
            gtOrder(orderData);
            const currency_minor_unit = orderData.totals.currency_minor_unit
            await KlaviyoAPI.klaviyoTrackAPI('identify', { email: currentEmail })
            const orderDataObj = {
                email: currentEmail,
                order_id: orderData.id,
                items: orderData.items.map(item => ({
                    product_name: item.name,
                    product_id: item.id.toString(),
                    quantity: item.quantity,
                    price: getCorrectPrice(parseInt(item?.totals?.line_subtotal) + parseInt(item?.totals?.line_subtotal_tax), currency_minor_unit),
                })),
                total: getCorrectPrice(
                    parseInt(orderData?.totals?.total_price),
                    currency_minor_unit
                )
            }
            await KlaviyoAPI.klaviyoTrackAPI('placed-order', orderDataObj)
        }
    } catch (error) {
        console.log(error);
    }
}