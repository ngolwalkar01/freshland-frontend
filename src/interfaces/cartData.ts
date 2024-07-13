interface CartItem {
    product_id: number;
    variation_id: number;
    quantity: number;
    line_subtotal: number;
    line_subtotal_tax: number;
    line_total: number;
    line_tax: number;
    product_name: string;
    product_price: string;
}

interface CartTotals {
    subtotal: string;
    subtotal_tax: number;
    shipping_total: string;
    shipping_tax: number;
    shipping_taxes: any[]; // Replace 'any' with a more specific type if known
    discount_total: number;
    discount_tax: number;
    cart_contents_total: string;
    cart_contents_tax: number;
    cart_contents_taxes: any[];
    fee_total: string;
    fee_tax: number;
    fee_taxes: any[];
    total: string;
    total_tax: number;
}

interface PackageContent {
    key: string;
    product_id: number;
    variation_id: number;
    variation: any[]; // Replace 'any' with a more specific type if known
    quantity: number;
    data_hash: string;
    line_tax_data: {
        subtotal: any[]; // Replace 'any' with a more specific type if known
        total: any[];
    };
    line_subtotal: number;
    line_subtotal_tax: number;
    line_total: number;
    line_tax: number;
    data: any; // Replace 'any' with a more specific type if needed
}

interface ShippingPackage {
    contents: Record<string, PackageContent>;
    contents_cost: number;
    applied_coupons: any[]; // Specify type if known
    user: {
        ID: number;
    };
    destination: {
        country: string;
        state: string;
        postcode: string;
        city: string;
        address: string;
        address_1: string;
        address_2: string;
    };
    cart_subtotal: string;
}

export interface CartData {
    items: CartItem[];
    totals: CartTotals;
    coupons: any[]; // Specify type if known
    shipping: {
        packages: ShippingPackage[];
        total: string;
    };
}


// interface Currency {
//     currency_code: string;
//     currency_symbol: string;
//     currency_minor_unit: number;
//     currency_decimal_separator: string;
//     currency_thousand_separator: string;
//     currency_prefix: string;
//     currency_suffix: string;
// }

// interface Address {
//     billing_first_name: string;
//     billing_last_name: string;
//     billing_company: string;
//     billing_country: string;
//     billing_address_1: string;
//     billing_address_2: string;
//     billing_city: string;
//     billing_state: string;
//     billing_postcode: string;
//     billing_phone: string;
//     billing_email: string;
// }

// interface ShippingAddress {
//     shipping_first_name: string;
//     shipping_last_name: string;
//     shipping_company: string;
//     shipping_country: string;
//     shipping_address_1: string;
//     shipping_address_2: string;
//     shipping_city: string;
//     shipping_state: string;
//     shipping_postcode: string;
// }

// interface Customer {
//     billing_address: Address;
//     shipping_address: ShippingAddress;
// }

// interface Quantity {
//     value: number;
//     min_purchase: number;
//     max_purchase: number;
// }

// interface Totals {
//     subtotal: string;
//     subtotal_tax: number;
//     total: number;
//     tax: number;
// }

// interface Dimensions {
//     length: string;
//     width: string;
//     height: string;
//     unit: string;
// }

// interface Meta {
//     product_type: string;
//     sku: string;
//     dimensions: Dimensions;
//     weight: number;
//     variation: any[];
// }

// interface Item {
//     item_key: string;
//     id: number;
//     name: string;
//     title: string;
//     price: string;
//     quantity: Quantity;
//     totals: Totals;
//     slug: string;
//     meta: Meta;
//     backorders: string;
//     cart_item_data: any[];
//     featured_image: string;
// }

// interface Shipping {
//     total_packages: number;
//     show_package_details: boolean;
//     has_calculated_shipping: boolean;
//     packages: any[];
// }

// export interface CartData {
//     cart_hash: string;
//     cart_key: string;
//     currency: Currency;
//     customer: Customer;
//     items: Item[];
//     item_count: number;
//     items_weight: number;
//     coupons: any[];
//     needs_payment: boolean;
//     needs_shipping: boolean;
//     shipping: Shipping;
//     fees: any[];
//     taxes: any[];
//     totals: {
//         subtotal: string;
//         subtotal_tax: string;
//         fee_total: string;
//         fee_tax: string;
//         discount_total: string;
//         discount_tax: string;
//         shipping_total: string;
//         shipping_tax: string;
//         total: string;
//         total_tax: string;
//     };
//     removed_items: any[];
//     cross_sells: any[];
//     notices: any[];
// }
