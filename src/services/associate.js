import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getAllAssociates = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/associates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching associates: ${error.message}`);
    return null;
  }
};