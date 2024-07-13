interface Address {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email?: string;
    phone?: string;
}

export interface OrderData {
    guest: boolean;
    billing_info: Address;
    shipping_info: Address;
    cart_key: string;
}
