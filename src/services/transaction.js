import axios from 'axios';

const BASE_URL = 'https://mias-be-production.up.railway.app';

export const getAllTransactions = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching transactions: ${error.message}`);
    return null;
  }
};