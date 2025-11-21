import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword,
  token
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/change-password`,
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(`Change password failed: ${error.message}`);
    return error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/forgot-password`,
      {email}
    );
    return res.data;
  } catch (error) {
    console.log(`Forgot password error: ${error.message}`);
    return error;
  }
};

export const resetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/reset-password`, {
      token,
      newPassword,
      confirmPassword,
    });
    return res.data;
  } catch (error) {
    console.log(`Reset password failed: ${error.message}`);
    return error;
  }
};
