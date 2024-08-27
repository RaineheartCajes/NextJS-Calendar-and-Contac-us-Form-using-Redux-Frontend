import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const submitContactForm = createAsyncThunk(
  'contactForm/submitContactForm',
  async (
    formData: { 
      firstname: string;
      lastname: string;
      subject: string;
      email: string;
      phoneNumber: string;
      countryCode: string;
      message: string;
      token: string | null; 
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('http://localhost:2000/contact/submit', formData); 
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
