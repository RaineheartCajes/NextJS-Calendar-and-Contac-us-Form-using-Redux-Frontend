import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from '../redux/slice/calendar';
import contactFormReducer from '../redux/slice/contact';
import captchaReducer from '../redux/slice/captcha';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    contactForm: contactFormReducer,
    captcha: captchaReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
