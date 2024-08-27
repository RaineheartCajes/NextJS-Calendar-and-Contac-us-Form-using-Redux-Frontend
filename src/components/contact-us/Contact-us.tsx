"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { submitContactForm } from '../../redux/thunk/contact';
import PhoneInputField from '../form/PhoneInputField';
import TextInput from '../form/TextInput';
import FormValidator from '../form/FormValidator';
import { Button, Box, Typography, Container, Paper, CircularProgress } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormData {
  firstname: string;
  lastname: string;
  subject: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  message: string;
  token: string | null;
}

const ContactUsForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: formLoading, error: formError, success } = useSelector((state: RootState) => state.contactForm);

  const [formData, setFormData] = useState<ContactFormData>({
    firstname: '',
    lastname: '',
    subject: '',
    email: '',
    phoneNumber: '',
    countryCode: '+1',
    message: '',
    token: null,
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    subject: '',
    email: '',
    phoneNumber: '',
    message: '',
    captcha: '',
  });

  const validateForm = () => {
    const { errors: newErrors, isValid } = FormValidator.validateForm(formData);
    setErrors(newErrors);
    return isValid;
  };

  const handlePhoneNumberChange = (phone: string) => {
    setFormData({ ...formData, phoneNumber: phone });
  };

  const handleCountryCodeChange = (code: string) => {
    setFormData({ ...formData, countryCode: code });
  };

  const handleTextInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
        try {
            const contactResult = await dispatch(submitContactForm(formData)).unwrap();
            setFormData({
                firstname: '',
                lastname: '',
                subject: '',
                email: '',
                phoneNumber: '',
                countryCode: '+1',
                message: '',
                token: null,
            });
        } catch (error) {
            console.error('Error during form submission:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                form: typeof error === 'string' ? error : 'An error occurred',
            }));
        }
    }
  };

  const onCaptchaChange = (token: string | null) => {
    setFormData({ ...formData, token });
  };

  return (
    <Container maxWidth="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
      <Paper elevation={3} style={{ padding: '40px', width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextInput
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleTextInputChange}
              error={errors.firstname}
            />
          </Box>
          <Box mb={3}>
            <TextInput
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleTextInputChange}
              error={errors.lastname}
            />
          </Box>
          <Box mb={3}>
            <TextInput
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleTextInputChange}
              error={errors.subject}
            />
          </Box>
          <Box mb={3}>
            <TextInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleTextInputChange}
              error={errors.email}
            />
          </Box>
          <Box mb={3}>
            <PhoneInputField
              phoneNumber={formData.phoneNumber}
              countryCode={formData.countryCode}
              onPhoneNumberChange={handlePhoneNumberChange}
              onCountryCodeChange={handleCountryCodeChange}
            />
          </Box>
          <Box mb={3}>
            <TextInput
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleTextInputChange}
              error={errors.message}
              multiline
              rows={4}
            />
          </Box>
          <Box mb={3} display="flex" justifyContent="center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''} 
              onChange={onCaptchaChange}
            />
            {errors.captcha && (
              <Typography color="error" style={{ marginTop: '8px' }}>
                {errors.captcha}
              </Typography>
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" type="submit" size="large" disabled={formLoading} style={{ width: '100%' }}>
              {formLoading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
          {success && <Typography color="primary" align="center" style={{ marginTop: '20px' }}>Form submitted successfully!</Typography>}
          {formError && (
            <Typography color="error" align="center" style={{ marginTop: '20px' }}>
              {typeof formError === 'string' ? formError : (formError as any)?.message || 'An error occurred'}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default ContactUsForm;
