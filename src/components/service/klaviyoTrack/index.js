const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;

    const baseUrl = `${protocol}//${hostname}${port ? ':' + port : ''}`;
    return baseUrl;
}

export const trackProductDetailPage = async (productDetail) => {
    try {
        if (productDetail) {
            const item = {
                "ProductName": productDetail?.name,
                "ProductID": productDetail?.id,
                "SKU": productDetail?.sku,
                "Categories": productDetail.categories.join(', '),
                "ImageURL": productDetail.thumbnail,
                "URL": window.location.href,
                "Brand": "",
                "Price": productDetail.price,
                "CompareAtPrice": productDetail.regular_price
            };
            klaviyo.push(["track", "Viewed Product", item]);
        }
    } catch (error) {
        console.log(error);
    }
}

const getCorrectPrice = (number, currency_minor_unit) => {
    if (currency_minor_unit)
        return parseFloat((number / 100).toFixed(currency_minor_unit));

    return number;
}

export const trackAddToCartPage = async (cartData) => {
    try {
        if (cartData) {
            const lastItemIndex = cartData.items.length - 1;
            const currMinorUnit = cartData.totals.currency_minor_unit;
            const totalValue = getCorrectPrice(cartData.totals.total_price, currMinorUnit);

            const newCartObject = {
                "$value": totalValue.toFixed(2),
                "AddedItemProductName": cartData.items[lastItemIndex].name, // Assuming the last item added is at index 1
                "AddedItemProductID": cartData.items[lastItemIndex].id.toString(),
                "AddedItemSKU": cartData.items[lastItemIndex].sku,
                "AddedItemCategories": cartData.items[lastItemIndex].categories,
                "AddedItemImageURL": cartData.items[lastItemIndex].images[0].src,
                "AddedItemURL": cartData.items[lastItemIndex].permalink,
                "AddedItemPrice": getCorrectPrice(cartData.items[lastItemIndex].prices.price, currMinorUnit),
                "AddedItemQuantity": cartData.items[lastItemIndex].quantity,
                "ItemNames": cartData.items.map(item => item.name),
                "CheckoutURL": `${getBaseUrl()}/checkout`,
                "Items": cartData.items && cartData.items.length > 0 ?
                    cartData.items.map(item => ({
                        "ProductID": item.id.toString(),
                        "SKU": item.sku,
                        "ProductName": item.name,
                        "Quantity": item.quantity,
                        "ItemPrice": getCorrectPrice(item.prices.price, currMinorUnit),
                        "RowTotal": getCorrectPrice(item.prices.price, currMinorUnit) * item.quantity,
                        "ProductURL": item.permalink,
                        "ImageURL": item.images[0].src,
                        "ProductCategories": item.categories
                    })) :
                    []
            };
            klaviyo.push(["track", "Added to Cart", newCartObject])
        }
    } catch (error) {
        console.log(error);
    }
}

export const trackAddToCheckoutPage = async (cartData) => {
    try {
        if (cartData) {
            const currMinorUnit = cartData.totals.currency_minor_unit;
            const newCheckoutObject = {
                "$event_id": "1000123_1387299423",
                "$value": getCorrectPrice(cartData.totals.total_price, currMinorUnit),
                "ItemNames": cartData.items.map(item => item.name),
                "CheckoutURL": window.location.href,
                "Categories": [],
                "Items": cartData.items.map(item => ({
                    "ProductID": item.id.toString(),
                    "SKU": item.sku,
                    "ProductName": item.name,
                    "Quantity": item.quantity,
                    "ItemPrice": getCorrectPrice(item.prices.price, currMinorUnit),
                    "RowTotal": getCorrectPrice(item.prices.price, currMinorUnit) * item.quantity,
                    "ProductURL": item.permalink,
                    "ImageURL": item.images[0].src,
                    "ProductCategories": item.categories
                }))
            };
            klaviyo.push(["track", "Started Checkout", newCheckoutObject])
        }
    } catch (error) {
        console.log(error);
    }
}