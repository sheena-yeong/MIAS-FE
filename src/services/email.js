import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function sendAssetAckEmail({ emailTemplate, recipient, data}, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/mails`,
            { emailTemplate, recipient, data },
            { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (err) {
        const message = 
        err.response?.data?.error || err.message || 'Failed to send email';
        throw new Error(message);
    }
}