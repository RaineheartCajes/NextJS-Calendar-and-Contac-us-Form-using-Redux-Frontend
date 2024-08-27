import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { submitContactForm } from '../thunk/contact';

interface ContactFormState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactFormState = {
  loading: false,
  error: null,
  success: false,
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    resetFormState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetFormState } = contactFormSlice.actions;

export default contactFormSlice.reducer;
