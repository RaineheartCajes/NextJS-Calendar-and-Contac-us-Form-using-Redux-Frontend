import React from 'react';
import { TextField } from '@mui/material';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = 'text',
  multiline = false,
  rows = 1,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      error={!!error}
      helperText={error}
      required={required}
      type={type}
      multiline={multiline}
      rows={rows}
    />
  );
};

export default TextInput;
