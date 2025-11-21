import axios from 'axios';

const BASE_URL = 'https://mias-be-production.up.railway.app';

export const getAllUsers = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching users: ${error.message}`);
    return null;
  }
};

export const getUserById = async (userId, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching ${userId}: ${error.message}`);
    return null;
  }
};

export const createUser = async (newUser, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in creating user: ${error.message}`);
  }
};