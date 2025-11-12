import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getAllInvoices = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/invoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching invoices: ${error.message}`);
    return null;
  }
};

export const createInvoice = async (newInvoice, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/invoices`, newInvoice, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in creating invoice: ${error.message}`);
  }
};

export const updateInvoice = async (updatedInvoice, invoiceId, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/invoices/${invoiceId}`, updatedInvoice, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in updating invoice: ${error.message}`);
  }
};