import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_KLAVIYO_URL;
const COMPANY_KEY = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY;
const APPLICATION_NAME = process.env.NEXT_PUBLIC_APPLICATION_NAME;

const getProfile = async () => {
    try {
        const headers = {
            Authorization: `Klaviyo-API-Key ${COMPANY_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            Revision: "2023-06-15",
            "X-Klaviyo-Onsite": 1,
        };
        const url = `${API_BASE_URL}/api/profiles`;
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Error in adding profile :", error);
        throw error;
    }
};

const createProfile = async (email, first_name) => {
    try {
        const headers = {
            'Authorization': `Klaviyo-API-Key ${COMPANY_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Revision': "2023-06-15",
            "X-Klaviyo-Onsite": 1
        }
        const url = `${API_BASE_URL}/api/profiles`;
        const obj =
        {
            "data": {
                "type": "profile",
                "attributes": {
                    "email": email,
                    "first_name": first_name
                }
            }
        }

        const response = await axios.post(url, { data: [obj] }, {
            headers: headers
        })
        return response.data;
    } catch (error) {
        console.error('Error in adding profile :', error);
        throw error;
    }
    // try {
    //     const tp = new Date().getTime();
    //     const config = {
    //         headers: {
    //             revision: "2023-06-15",
    //             "X-Klaviyo-Onsite": 1
    //         }
    //     };
    //     const obj = {
    //         "data": {
    //             "type": "profile",
    //             "attributes": {
    //                 email,
    //                 first_name,
    //                 "properties": {
    //                     "$referrer": {
    //                         "ts": tp,
    //                         "value": "",
    //                         "first_page": APPLICATION_NAME
    //                     },
    //                     "$last_referrer": {
    //                         "ts": tp,
    //                         "value": "",
    //                         "first_page": APPLICATION_NAME
    //                     },
    //                     "$source": "DK: 210128 Homepage Newsletter Signup "
    //                 }
    //             }
    //         }
    //     }

    //     const url = `${API_BASE_URL}/profiles/?company_id=${COMPANY_KEY}`;
    //     const response = await axios.post(url, obj, config);
    //     return response.data;
    // } catch (error) {
    //     console.error('Error in creating profile :', error);
    //     throw error;
    // }
};

const addProfileToList = async (id = "01J3E1P9WVNV7MSXGC70W1G6J3", listId = "RWdnc8") => {
    try {
        const headers = {
            'Authorization': `Klaviyo-API-Key ${COMPANY_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Revision': "2023-06-15",
            "X-Klaviyo-Onsite": 1
        }
        const url = `${API_BASE_URL}/api/lists/${listId}/relationships/profiles`;
        const obj = {
            type: "profile", id
        }
        const response = await axios.post(url, { data: [obj] }, {
            headers: headers
        })
        return response.data;
    } catch (error) {
        console.error('Error in adding profile to list :', error);
        throw error;
    }
};

const CartAPI = {
    createProfile,
    addProfileToList,
    getProfile
};

export default CartAPI;