import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const validateCaptcha = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>(
  'captcha/validateCaptcha',
  async (captchaToken, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/captcha/validate', {
        token: captchaToken,
      });
      return response.data.success;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);