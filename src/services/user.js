import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

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