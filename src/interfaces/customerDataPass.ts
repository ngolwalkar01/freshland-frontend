interface CustomerInfo {
    first_name: string;
    last_name: string;
    display_name: string;
    old_password: string;
    new_password: string;
    confirm_password: string;
}

export interface CustomerData {
    customer_info: CustomerInfo;
}