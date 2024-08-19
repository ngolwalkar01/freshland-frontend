import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import { myaccountTranslation } from "@/locales";
const lang = process.env.NEXT_PUBLIC_LANG || "se";
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const createKlarnaPayload = () => {
    const cartData = localStorage.getItem(cartDataStorage) ? JSON.parse(localStorage.getItem(cartDataStorage)): {
        items: []
    };
    const orderLines = cartData.items.map(item => ({
        type: 'physical',
        reference: item.id.toString(),
        name: item.name,
        quantity: item.quantity,
        unit_price: parseInt(item.prices.price),
        tax_rate: 0,
        total_amount: parseInt(item.totals.line_total),
        total_tax_amount: 0
    }));

    const payload = {
        purchase_country: "US",
        purchase_currency: "USD", //cartData.totals.currency_code,
        locale: "en-US",
        order_amount: parseInt(cartData.totals.total_price),
        order_lines: orderLines,
        merchant_urls: {
            terms: process.env.NEXT_PUBLIC_API_BASE_URL,
            checkout: process.env.NEXT_PUBLIC_API_BASE_URL,
            // confirmation: 'http://localhost:8080/confirmation?klarna_order_id={checkout.order.id}',
            confirmation: process.env.NEXT_PUBLIC_API_BASE_URL,
            push: process.env.NEXT_PUBLIC_API_BASE_URL
        }
    };

    return payload;
}

const KlarnaCheckout = ({ styles }) => {
    const mat = myaccountTranslation[lang];
    const [clientToken, setClientToken] = useState('');
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchClientToken = async () => {
        try {
            const { data } = await axios.post('/api/klarnaSession', createKlarnaPayload());
            setClientToken(data.client_token);
            initializeKlarna(data.client_token);
        } catch (error) {
            console.log(error);
        }
    };

    const finalizePurchase = async (authorizationToken) => {
        try {
            const response = await axios.post('/api/klarnafinalizePurchase', {
                authorizationToken,
                orderDetails: createKlarnaPayload()
            });
            window.location = response.data.order.redirect_url;
            console.log('Purchase finalized:', response.data);
        } catch (error) {
            console.error('Error finalizing purchase:', error);
        }
    };

    const initializeKlarna = (clientToken) => {
        window.Klarna.Payments.init({
            client_token: clientToken
        });

        window.Klarna.Payments.load({
            container: '#klarna-payments-container',
            payment_method_category: 'pay_over_time' // This can be adjusted based on your needs
        }, (res) => {
            console.log('Load response:', res);
        });
    };

    const handleAuthorization = async () => {
        await fetchClientToken();
        window.Klarna.Payments.authorize({
            // payment_method_category: selectedOption // Assuming this maps directly to Klarna's expected identifiers
        }, (res) => {
            console.log('Authorization response:', res);
            if (res.approved) {
                finalizePurchase(res.authorization_token); // Custom function to finalize the purchase on your backend
            } else {
                console.error('Authorization failed:', res.error);
            }
        });
    };

    return (
        <div>
            <div id="klarna-payments-container" style={{ minHeight: '200px', display: 'none' }}></div>
            <div>
                <div className={styles.checkoutpayement}>
                    <div className={styles.paymentOption}>
                        <div className={styles.dividepayment}>
                            <input
                                type="radio"
                                name="payment"
                                value="divide"
                                checked={selectedOption === "divide"}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="divide">Divide.</label>
                        </div>
                        <p>Klarna.</p>
                    </div>
                    {selectedOption === "divide" && (
                        <div className={styles.payementpara}>
                            <i class="fa-solid fa-check"></i>
                            <p>
                                Shoppa säkert med Klarnas Köparskydd. Se
                                betalalternativ.
                            </p>
                        </div>
                    )}
                </div>

                <div className={styles.checkoutpayement}>
                    <div className={styles.paymentOption}>
                        <div className={styles.dividepayment}>
                            <input
                                type="radio"
                                name="payment"
                                value="direct"
                                checked={selectedOption === "direct"}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="direct">{mat.directPayment}</label>
                        </div>
                        <p>Klarna.</p>
                    </div>
                    {selectedOption === "direct" && (
                        <div>
                            <div className={styles.payementpara}>
                                <i class="fa-solid fa-check"></i>
                                <p>
                                    Shoppa säkert med Klarnas Köparskydd. Se
                                    betalalternativ.
                                </p>
                            </div>
                            <div className={styles.cards}>
                                <Image
                                    src="/Images/Dkfooter.png"
                                    alt="Dk"
                                    height={20}
                                    width={32}
                                />
                                <Image
                                    src="/Images/mobilepay.png"
                                    alt="mobilepay"
                                    height={20}
                                    width={32}
                                />
                                <Image
                                    src="/Images/visa.png"
                                    alt="visa"
                                    height={20}
                                    width={32}
                                />
                                <Image
                                    src="/Images/mastercard.png"
                                    alt="mastercard"
                                    height={20}
                                    width={32}
                                />
                            </div>
                        </div>

                    )}
                </div>

                <div className={styles.checkoutpayement}>
                    <div className={styles.paymentOption}>
                        <div className={styles.dividepayment}>
                            <input
                                type="radio"
                                name="payment"
                                value="later"
                                checked={selectedOption === "later"}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="later">{mat.getFirstPayLater}</label>
                        </div>
                        <p>Klarna.</p>
                    </div>
                    {selectedOption === "later" && (
                        <div className={styles.payementpara}>
                            <i class="fa-solid fa-check"></i>
                            <p>
                                Shoppa säkert med Klarnas Köparskydd. Se
                                betalalternativ.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {
                selectedOption && <button onClick={handleAuthorization}>{mat.completePurchase}</button>
            }
        </div>
    );
};

export default KlarnaCheckout;
