interface Person {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }
  
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
  
  export interface CustomerInfo {
    // personal: Person;
    billing_address: Address;
    shipping_address: Address;
  }