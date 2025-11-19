import axios from 'axios';

const BASE_URL = 'https://mias-be-production.up.railway.app';

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

export const createAssociate = async (newAssociate, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/associates`, newAssociate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in creating associate: ${error.message}`);
  }
};

export const updateAssociate = async (updatedAssociate, associateId, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/associates/${associateId}`, updatedAssociate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in updating associate: ${error.message}`);
  }
};

export const deleteAssociate = async (associateId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/associates/${associateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in deleting associate: ${error.message}`);
  }
};