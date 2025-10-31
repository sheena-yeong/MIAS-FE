import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export const getAllAssets = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/assets`);
    return res.data;
  } catch (error) {
    console.log(`Error in fetching assets: ${error.message}`);
    return null;
  }
};

export const createAsset = async (newAsset) => {
  try {
    const res = await axios.post(`${BASE_URL}/assets`, newAsset);
    return res.data;
  } catch (error) {
    console.log(`Error in creating asset: ${error.message}`);
  }
};

export const updateAsset = async (updatedAsset, assetId) => {
  try {
    const res = await axios.put(`${BASE_URL}/assets/${assetId}`, updatedAsset);
    return res.data;
  } catch (error) {
    console.log(`Error in updating asset: ${error.message}`);
  }
};

export const deleteAsset = async (assetId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/assets/${assetId}`);
    return res.data;
  } catch (error) {
    console.log(`Error in deleting asset: ${error.message}`);
  }
};
