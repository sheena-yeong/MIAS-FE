import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const updateUser = async (updatedUser, userId, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in updating user: ${error.message}`);
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in deleting user: ${error.message}`);
  }
};
