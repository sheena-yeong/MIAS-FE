import axios from 'axios';
const BASE_URL = 'http://localhost:3000'

export const getAllAssets = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/assets`)
    return res.data;
  } catch (error) {
    console.log(`Error in fetching assets: ${error.message}`);
    return null;
  }
};

