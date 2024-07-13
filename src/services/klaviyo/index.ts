import axios from '@/utils/axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_KLAVIYO_URL;
const COMPANY_KEY = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY;
const APPLICATION_NAME = process.env.NEXT_PUBLIC_APPLICATION_NAME;

const createProfile = async (email: string, first_name: string) => {
    try {
        const tp = new Date().getTime();
        const config = {
            headers: {
                revision: "2023-06-15",
                "X-Klaviyo-Onsite": 1
            }
        };
        const obj = {
            "data": {
                "type": "profile",
                "attributes": {
                    email,
                    first_name,
                    "properties": {
                        "$referrer": {
                            "ts": tp,
                            "value": "",
                            "first_page": APPLICATION_NAME
                        },
                        "$last_referrer": {
                            "ts": tp,
                            "value": "",
                            "first_page": APPLICATION_NAME
                        },
                        "$source": "DK: 210128 Homepage Newsletter Signup "
                    }
                }
            }
        }

        const url = `/profiles/?company_id=${COMPANY_KEY}`;
        const response = await axios.post(url, obj, config);
        return response.data;
    } catch (error) {
        console.error('Error in creating profile :', error);
        throw error;
    }
};

const CartAPI = {
    createProfile
};

export default CartAPI;