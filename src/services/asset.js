import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getAllAssets = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/assets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching assets: ${error.message}`);
    return null;
  }
};

export const createAsset = async (newAsset, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/assets`, newAsset, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in creating asset: ${error.message}`);
    if (error.response?.data) {
      return error.response.data;
    }
  }
};

export const updateAsset = async (updatedAsset, assetId, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/assets/${assetId}`, updatedAsset, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in updating asset: ${error.message}`);
  }
};

export const deleteAsset = async (assetId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/assets/${assetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in deleting asset: ${error.message}`);
  }
};
