import React from 'react';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface PhoneInputFieldProps {
  phoneNumber: string;
  countryCode: string;
  onPhoneNumberChange: (phone: string) => void;
  onCountryCodeChange: (code: string) => void;
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  phoneNumber,
  countryCode,
  onPhoneNumberChange,
  onCountryCodeChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Country Code</InputLabel>
          <Select
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value as string)}
          >
            <MenuItem value="+1">🇺🇸 +1 (USA)</MenuItem>
            <MenuItem value="+91">🇮🇳 +91 (India)</MenuItem>
            <MenuItem value="+44">🇬🇧 +44 (UK)</MenuItem>
            <MenuItem value="+63">🇵🇭 +63 (Philippines)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default PhoneInputField;
