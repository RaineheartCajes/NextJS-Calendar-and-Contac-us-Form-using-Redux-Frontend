import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { validateCaptcha } from '../thunk/captcha';

interface CaptchaState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CaptchaState = {
  loading: false,
  error: null,
  success: false,
};

const captchaSlice = createSlice({
  name: 'captcha',
  initialState,
  reducers: {
    resetCaptchaState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCaptcha.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(validateCaptcha.fulfilled, (state) => {
        state.loading = false;
        state.success = true;  
      })
      .addCase(validateCaptcha.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
        state.success = false;  
      });
  },
});

export const { resetCaptchaState } = captchaSlice.actions;

export default captchaSlice.reducer;
