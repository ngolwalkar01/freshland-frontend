export const subData = [
    {
        "id": 1314,
        "parent_id": 0,
        "status": "pending",
        "currency": "USD",
        "version": "5.2.0",
        "prices_include_tax": true,
        "date_created": "2021-04-23T17:22:22",
        "date_modified": "2021-04-23T17:24:34",
        "discount_total": "0.00",
        "discount_tax": "0.00",
        "shipping_total": "0.00",
        "shipping_tax": "0.00",
        "cart_tax": "6.32",
        "total": "69.56",
        "total_tax": "6.32",
        "customer_id": 3,
        "order_key": "wc_order_vYhjmTsexB6rH",
        "billing": {
            "first_name": "Jane",
            "last_name": "Doe",
            "company": "",
            "address_1": "10 Main Rd",
            "address_2": "",
            "city": "Brisbane",
            "state": "QLD",
            "postcode": "4000",
            "country": "AU",
            "email": "jane-doe@example.com",
            "phone": "0000000000"
        },
        "shipping": {
            "first_name": "Jane",
            "last_name": "Doe",
            "company": "",
            "address_1": "10 Main Rd",
            "address_2": "",
            "city": "Brisbane",
            "state": "QLD",
            "postcode": "4000",
            "country": "AU"
        },
        "payment_method": "",
        "payment_method_title": "",
        "customer_ip_address": "",
        "customer_user_agent": "",
        "created_via": "",
        "customer_note": "",
        "date_completed": null,
        "date_paid": null,
        "number": "1314",
        "meta_data": [
            {
                "id": 53835,
                "key": "_stripe_source_id",
                "value": ""
            }
        ],
        "line_items": [
            {
                "id": 1689,
                "name": "Subscription",
                "product_id": 1035,
                "variation_id": 0,
                "quantity": 1,
                "tax_class": "",
                "subtotal": "63.24",
                "subtotal_tax": "6.32",
                "total": "63.24",
                "total_tax": "6.32",
                "taxes": [
                    {
                        "id": 3,
                        "total": "6.324111",
                        "subtotal": "6.324111"
                    }
                ],
                "meta_data": [],
                "sku": "",
                "price": 63.241106000000002,
                "parent_name": null
            }
        ],
        "tax_lines": [
            {
                "id": 1690,
                "rate_code": "AU-GST-2",
                "rate_id": 3,
                "label": "GST",
                "compound": true,
                "tax_total": "6.32",
                "shipping_tax_total": "0.00",
                "rate_percent": 10,
                "meta_data": []
            }
        ],
        "shipping_lines": [],
        "fee_lines": [],
        "coupon_lines": [],
        "date_created_gmt": "2021-04-23T07:22:22",
        "date_modified_gmt": "2021-04-23T07:24:34",
        "date_completed_gmt": null,
        "date_paid_gmt": null,
        "billing_period": "day",
        "billing_interval": "1",
        "start_date_gmt": "2021-04-23T07:21:00",
        "trial_end_date_gmt": "",
        "next_payment_date_gmt": "",
        "last_payment_date_gmt": "",
        "cancelled_date_gmt": "",
        "end_date_gmt": "",
        "resubscribed_from": "",
        "resubscribed_subscription": "",
        "removed_line_items": [],
        "_links": {
            "self": [
                {
                    "href": "https://example.com/wp-json/wc/v3/subscriptions/1314"
                }
            ],
            "collection": [
                {
                    "href": "https://xample.com/wp-json/wc/v3/subscriptions"
                }
            ],
            "customer": [
                {
                    "href": "https://example.com/wp-json/wc/v3/customers/3"
                }
            ]
        }
    },
    {
        "id": 1313,
        "parent_id": 0,
        "status": "active",
        "currency": "USD",
        "version": "5.2.0",
        "prices_include_tax": true,
        "date_created": "2021-04-23T16:38:41",
        "date_modified": "2021-04-23T16:38:41",
        "discount_total": "0.00",
        "discount_tax": "0.00",
        "shipping_total": "10.00",
        "shipping_tax": "0.00",
        "cart_tax": "16.60",
        "total": "192.61",
        "total_tax": "16.60",
        "customer_id": 1,
        "order_key": "wc_order_lyCT6s4CE82cP",
        "billing": {
            "first_name": "John",
            "last_name": "Doe",
            "company": "",
            "address_1": "969 Market",
            "address_2": "",
            "city": "San Francisco",
            "state": "CA",
            "postcode": "94103",
            "country": "US",
            "email": "john.doe@example.com",
            "phone": "(555) 555-5555"
        },
        "shipping": {
            "first_name": "John",
            "last_name": "Doe",
            "company": "",
            "address_1": "969 Market",
            "address_2": "",
            "city": "San Francisco",
            "state": "CA",
            "postcode": "94103",
            "country": "US"
        },
        "payment_method": "stripe",
        "payment_method_title": "Credit Card (Stripe)",
        "customer_ip_address": "",
        "customer_user_agent": "",
        "created_via": "rest-api",
        "customer_note": "",
        "date_completed": null,
        "date_paid": null,
        "number": "1313",
        "meta_data": [
            {
                "id": 53824,
                "key": "_custom_subscription_meta",
                "value": "custom meta"
            },
            {
                "id": 53825,
                "key": "_stripe_customer_id",
                "value": "cus_Yjw4cyvPHBFzc8"
            },
            {
                "id": 53826,
                "key": "_stripe_source_id",
                "value": "src_BSFD2kaYChDBtg2tP5qn7R3E"
            }
        ],
        "line_items": [
            {
                "id": 1685,
                "name": "Yearly",
                "product_id": 1175,
                "variation_id": 0,
                "quantity": 2,
                "tax_class": "",
                "subtotal": "126.48",
                "subtotal_tax": "12.65",
                "total": "126.48",
                "total_tax": "12.65",
                "taxes": [
                    {
                        "id": 2,
                        "total": "12.648221",
                        "subtotal": "12.648221"
                    }
                ],
                "meta_data": [],
                "sku": "",
                "price": 63.241107,
                "parent_name": null
            },
            {
                "id": 1686,
                "name": "Variable Subscription - Small",
                "product_id": 633,
                "variation_id": 636,
                "quantity": 1,
                "tax_class": "",
                "subtotal": "39.53",
                "subtotal_tax": "3.95",
                "total": "39.53",
                "total_tax": "3.95",
                "taxes": [
                    {
                        "id": 2,
                        "total": "3.952569",
                        "subtotal": "3.952569"
                    }
                ],
                "meta_data": [
                    {
                        "id": 13607,
                        "key": "pa_size",
                        "value": "small",
                        "display_key": "Size",
                        "display_value": "Small"
                    }
                ],
                "sku": "",
                "price": 39.525691999999999,
                "parent_name": "Variable Subscription"
            }
        ],
        "tax_lines": [
            {
                "id": 1688,
                "rate_code": "US-TAX-1",
                "rate_id": 2,
                "label": "TAX",
                "compound": true,
                "tax_total": "16.60",
                "shipping_tax_total": "0.00",
                "rate_percent": 10,
                "meta_data": []
            }
        ],
        "shipping_lines": [
            {
                "id": 1687,
                "method_title": "Flat Rate",
                "method_id": "flat_rate",
                "instance_id": "",
                "total": "10.00",
                "total_tax": "0.00",
                "taxes": [],
                "meta_data": []
            }
        ],
        "fee_lines": [],
        "coupon_lines": [],
        "date_created_gmt": "2021-04-23T06:38:41",
        "date_modified_gmt": "2021-04-23T06:38:41",
        "date_completed_gmt": null,
        "date_paid_gmt": null,
        "billing_period": "month",
        "billing_interval": "3",
        "start_date_gmt": "2021-04-23T10:45:00",
        "trial_end_date_gmt": "",
        "next_payment_date_gmt": "2021-07-23T10:45:00",
        "last_payment_date_gmt": "",
        "cancelled_date_gmt": "",
        "end_date_gmt": "",
        "resubscribed_from": "",
        "resubscribed_subscription": "",
        "removed_line_items": [],
        "_links": {
            "self": [
                {
                    "href": "https://example.com/wp-json/wc/v3/subscriptions/1313"
                }
            ],
            "collection": [
                {
                    "href": "https://example.com/wp-json/wc/v3/subscriptions"
                }
            ],
            "customer": [
                {
                    "href": "https://example.com/wp-json/wc/v3/customers/1"
                }
            ]
        }
    },
    {
        "id": 1312,
        "parent_id": 0,
        "status": "pending",
        "currency": "USD",
        "version": "5.2.0",
        "prices_include_tax": false,
        "date_created": "2021-04-23T15:41:47",
        "date_modified": "2021-04-23T15:41:47",
        "discount_total": "0.00",
        "discount_tax": "0.00",
        "shipping_total": "0.00",
        "shipping_tax": "0.00",
        "cart_tax": "0.00",
        "total": "0.00",
        "total_tax": "0.00",
        "customer_id": 1,
        "order_key": "wc_order_5Us6R9XndaBRA",
        "billing": {
            "first_name": "John",
            "last_name": "Doe",
            "company": "",
            "address_1": "969 Market",
            "address_2": "",
            "city": "San Francisco",
            "state": "CA",
            "postcode": "94103",
            "country": "US",
            "email": "john.doe@example.com",
            "phone": "(555) 555-5555"
        },
        "shipping": {
            "first_name": "John",
            "last_name": "Doe",
            "company": "",
            "address_1": "969 Market",
            "address_2": "",
            "city": "San Francisco",
            "state": "CA",
            "postcode": "94103",
            "country": "US"
        },
        "payment_method": "",
        "payment_method_title": "",
        "customer_ip_address": "",
        "customer_user_agent": "",
        "created_via": "",
        "customer_note": "",
        "date_completed": null,
        "date_paid": null,
        "number": "1312",
        "meta_data": [
            {
                "id": 53775,
                "key": "_custom_subscription_meta",
                "value": "custom meta"
            },
            {
                "id": 53776,
                "key": "_stripe_customer_id",
                "value": "cus_Yjw4cyvPHBFzc8"
            },
            {
                "id": 53777,
                "key": "_stripe_source_id",
                "value": "src_BSFD2kaYChDBtg2tP5qn7R3E"
            }
        ],
        "line_items": [
            {
                "id": 1682,
                "name": "Yearly",
                "product_id": 1175,
                "variation_id": 0,
                "quantity": 2,
                "tax_class": "",
                "subtotal": "126.48",
                "subtotal_tax": "0.00",
                "total": "126.48",
                "total_tax": "0.00",
                "taxes": [],
                "meta_data": [],
                "sku": "",
                "price": 63.241107,
                "parent_name": null
            },
            {
                "id": 1683,
                "name": "Variable Subscription - Small",
                "product_id": 633,
                "variation_id": 636,
                "quantity": 1,
                "tax_class": "",
                "subtotal": "39.53",
                "subtotal_tax": "0.00",
                "total": "39.53",
                "total_tax": "0.00",
                "taxes": [],
                "meta_data": [
                    {
                        "id": 13583,
                        "key": "pa_size",
                        "value": "small",
                        "display_key": "Size",
                        "display_value": "Small"
                    }
                ],
                "sku": "",
                "price": 39.525691999999999,
                "parent_name": "Variable Subscription"
            }
        ],
        "tax_lines": [],
        "shipping_lines": [
            {
                "id": 1684,
                "method_title": "Flat Rate",
                "method_id": "flat_rate",
                "instance_id": "",
                "total": "10.00",
                "total_tax": "0.00",
                "taxes": [],
                "meta_data": []
            }
        ],
        "fee_lines": [],
        "coupon_lines": [],
        "date_created_gmt": "2021-04-23T05:41:47",
        "date_modified_gmt": "2021-04-23T05:41:47",
        "date_completed_gmt": null,
        "date_paid_gmt": null,
        "billing_period": "month",
        "billing_interval": "3",
        "start_date_gmt": "2021-04-23T05:41:47",
        "trial_end_date_gmt": "",
        "next_payment_date_gmt": "",
        "last_payment_date_gmt": "",
        "cancelled_date_gmt": "",
        "end_date_gmt": "",
        "resubscribed_from": "",
        "resubscribed_subscription": "",
        "removed_line_items": [],
        "_links": {
            "self": [
                {
                    "href": "https://example.com/wp-json/wc/v3/subscriptions/1312"
                }
            ],
            "collection": [
                {
                    "href": "https://example.com/wp-json/wc/v3/subscriptions"
                }
            ],
            "customer": [
                {
                    "href": "https://example.com/wp-json/wc/v3/customers/1"
                }
            ]
        }
    },
    {
        "id": 1311,
        "parent_id": 0,
        "status": "active",
        "currency": "USD",
        "version": "5.2.0",
        "prices_include_tax": true,
        "date_created": "2021-04-23T15:02:42",
        "date_modified": "2021-04-23T15:02:42",
        "discount_total": "0.00",
        "discount_tax": "0.00",
        "shipping_total": "10.00",
        "shipping_tax": "0.00",
        "cart_tax": "16.60",
        "total": "192.61",
        "total_tax": "16.60",
        "customer_id": 1,
        "order_key": "wc_order_sjJYONc6eMdua",
        "billing": {
            "first_name": "John",
            "last_name": "Doe",
            "company": "",
            "address_1": "969 Market",
            "address_2": "",
            "city": "San Francisco",
            "state": "CA",
            "postcode": "94103",
            "country": "US",
            "email": "john.doe@example.com",
            "phone": "(555) 555-5555"
        },
        "shipping": {
            "first_name": "John",
            "last_name": "Doe",
            "company": "",
            "address_1": "969 Market",
            "address_2": "",
            "city": "San Francisco",
            "state": "CA",
            "postcode": "94103",
            "country": "US"
        },
        "payment_method": "stripe",
        "payment_method_title": "Credit Card (Stripe)",
        "customer_ip_address": "",
        "customer_user_agent": "",
        "created_via": "rest-api",
        "customer_note": "",
        "date_completed": null,
        "date_paid": null,
        "number": "1311",
        "meta_data": [
            {
                "id": 53724,
                "key": "_custom_subscription_meta",
                "value": "custom meta"
            },
            {
                "id": 53725,
                "key": "_stripe_customer_id",
                "value": "cus_Yjw4cyvPHBFzc8"
            },
            {
                "id": 53726,
                "key": "_stripe_source_id",
                "value": "src_BSFD2kaYChDBtg2tP5qn7R3E"
            }
        ],
        "line_items": [
            {
                "id": 1678,
                "name": "Yearly",
                "product_id": 1175,
                "variation_id": 0,
                "quantity": 2,
                "tax_class": "",
                "subtotal": "126.48",
                "subtotal_tax": "12.65",
                "total": "126.48",
                "total_tax": "12.65",
                "taxes": [
                    {
                        "id": 2,
                        "total": "12.648221",
                        "subtotal": "12.648221"
                    }
                ],
                "meta_data": [],
                "sku": "",
                "price": 63.241107,
                "parent_name": null
            },
            {
                "id": 1679,
                "name": "Variable Subscription - Small",
                "product_id": 633,
                "variation_id": 636,
                "quantity": 1,
                "tax_class": "",
                "subtotal": "39.53",
                "subtotal_tax": "3.95",
                "total": "39.53",
                "total_tax": "3.95",
                "taxes": [
                    {
                        "id": 2,
                        "total": "3.952569",
                        "subtotal": "3.952569"
                    }
                ],
                "meta_data": [
                    {
                        "id": 13553,
                        "key": "pa_size",
                        "value": "small",
                        "display_key": "Size",
                        "display_value": "Small"
                    }
                ],
                "sku": "",
                "price": 39.525691999999999,
                "parent_name": "Variable Subscription"
            }
        ],
        "tax_lines": [
            {
                "id": 1681,
                "rate_code": "US-TAX-1",
                "rate_id": 2,
                "label": "TAX",
                "compound": true,
                "tax_total": "16.60",
                "shipping_tax_total": "0.00",
                "rate_percent": 10,
                "meta_data": []
            }
        ],
        "shipping_lines": [
            {
                "id": 1680,
                "method_title": "Flat Rate",
                "method_id": "flat_rate",
                "instance_id": "",
                "total": "10.00",
                "total_tax": "0.00",
                "taxes": [],
                "meta_data": []
            }
        ],
        "fee_lines": [],
        "coupon_lines": [],
        "date_created_gmt": "2021-04-23T05:02:42",
        "date_modified_gmt": "2021-04-23T05:02:42",
        "date_completed_gmt": null,
        "date_paid_gmt": null,
        "billing_period": "month",
        "billing_interval": "3",
        "start_date_gmt": "2021-04-23T10:45:00",
        "trial_end_date_gmt": "",
        "next_payment_date_gmt": "2021-07-23T10:45:00",
        "last_payment_date_gmt": "",
        "cancelled_date_gmt": "",
        "end_date_gmt": "",
        "resubscribed_from": "",
        "resubscribed_subscription": "",
        "removed_line_items": [],
        "_links": {
            "self": [
                {
                    "href": "https://example.com/wp-json/wc/v3/subscriptions/1311"
                }
            ],
            "collection": [
                {
                    "href": "https://example.com/wp-json/wc/v3/subscriptions"
                }
            ],
            "customer": [
                {
                    "href": "https://example.com/wp-json/wc/v3/customers/1"
                }
            ]
        }
    }
]

export const currentSub = {
    "id": 1300,
    "parent_id": 1299,
    "status": "active",
    "currency": "USD",
    "version": "5.2.0",
    "prices_include_tax": true,
    "date_created": "2021-04-22T20:44:41",
    "date_modified": "2021-04-22T20:47:58",
    "discount_total": "0.00",
    "discount_tax": "0.00",
    "shipping_total": "10.00",
    "shipping_tax": "0.00",
    "cart_tax": "4.74",
    "total": "32.65",
    "total_tax": "4.74",
    "customer_id": 1,
    "order_key": "wc_order_lDWPiAmVoaBRL",
    "billing": {
        "first_name": "James",
        "last_name": "Allan",
        "company": "",
        "address_1": "1 Main Road",
        "address_2": "",
        "city": "Brisbane",
        "state": "QLD",
        "postcode": "4000",
        "country": "AU",
        "email": "james.allan@automattic.com",
        "phone": "0000000000"
    },
    "shipping": {
        "first_name": "James",
        "last_name": "Allan",
        "company": "",
        "address_1": "1 Main Road",
        "address_2": "",
        "city": "Brisbane",
        "state": "QLD",
        "postcode": "4000",
        "country": "AU"
    },
    "payment_method": "stripe",
    "payment_method_title": "Credit Card (Stripe)",
    "customer_ip_address": "",
    "customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36",
    "created_via": "checkout",
    "customer_note": "",
    "date_completed": null,
    "date_paid": "2021-04-22T20:44:45",
    "number": "1300",
    "meta_data": [
        {
            "id": 53158,
            "key": "is_vat_exempt",
            "value": "no"
        },
        {
            "id": 53178,
            "key": "_stripe_customer_id",
            "value": "cus_xxxxxx"
        },
        {
            "id": 53179,
            "key": "_stripe_source_id",
            "value": "src_xxxxxx"
        }
    ],
    "line_items": [
        {
            "id": 1648,
            "name": "Weekly",
            "product_id": 1027,
            "variation_id": 0,
            "quantity": 1,
            "tax_class": "",
            "subtotal": "7.91",
            "subtotal_tax": "2.09",
            "total": "7.91",
            "total_tax": "2.09",
            "taxes": [
                {
                    "id": 3,
                    "total": "0.790514",
                    "subtotal": "0.790514"
                },
                {
                    "id": 4,
                    "total": "1.304348",
                    "subtotal": "1.304348"
                }
            ],
            "meta_data": [],
            "sku": "",
            "price": 7.905138,
            "parent_name": null
        }
    ],
    "tax_lines": [
        {
            "id": 1649,
            "rate_code": "AU-GST-2",
            "rate_id": 3,
            "label": "GST",
            "compound": true,
            "tax_total": "1.79",
            "shipping_tax_total": "0.00",
            "rate_percent": 10,
            "meta_data": []
        },
        {
            "id": 1650,
            "rate_code": "AU-QLD-TAX-3",
            "rate_id": 4,
            "label": "Tax",
            "compound": true,
            "tax_total": "2.95",
            "shipping_tax_total": "0.00",
            "rate_percent": 15,
            "meta_data": []
        }
    ],
    "shipping_lines": [
        {
            "id": 1647,
            "method_title": "Flat rate",
            "method_id": "flat_rate",
            "instance_id": "2",
            "total": "10.00",
            "total_tax": "0.00",
            "taxes": [
                {
                    "id": 3,
                    "total": "",
                    "subtotal": ""
                },
                {
                    "id": 4,
                    "total": "",
                    "subtotal": ""
                }
            ],
            "meta_data": [
                {
                    "id": 13309,
                    "key": "Items",
                    "value": "Weekly &times; 1",
                    "display_key": "Items",
                    "display_value": "Weekly &times; 1"
                }
            ]
        }
    ],
    "fee_lines": [
        {
            "id": 1652,
            "name": "Express",
            "tax_class": "",
            "tax_status": "taxable",
            "amount": "10",
            "total": "10.00",
            "total_tax": "2.65",
            "taxes": [
                {
                    "id": 3,
                    "total": "1",
                    "subtotal": ""
                },
                {
                    "id": 4,
                    "total": "1.65",
                    "subtotal": ""
                }
            ],
            "meta_data": []
        }
    ],
    "coupon_lines": [],
    "date_created_gmt": "2021-04-22T10:44:41",
    "date_modified_gmt": "2021-04-22T10:47:58",
    "date_completed_gmt": null,
    "date_paid_gmt": "2021-04-22T10:44:45",
    "billing_period": "week",
    "billing_interval": "1",
    "start_date_gmt": "2021-04-22T10:44:41",
    "trial_end_date_gmt": "",
    "next_payment_date_gmt": "2021-04-29T10:44:41",
    "last_payment_date_gmt": "2021-04-22T10:44:41",
    "cancelled_date_gmt": "",
    "end_date_gmt": "",
    "resubscribed_from": "",
    "resubscribed_subscription": "",
    "removed_line_items": [],
    "_links": {
        "self": [
            {
                "href": "https://example.com/wp-json/wc/v3/subscriptions/1300"
            }
        ],
        "collection": [
            {
                "href": "https://example.com/wp-json/wc/v3/subscriptions"
            }
        ],
        "customer": [
            {
                "href": "https://example.com/wp-json/wc/v3/customers/1"
            }
        ],
        "up": [
            {
                "href": "https://example.com/wp-json/wc/v3/orders/1299"
            }
        ]
    }
}