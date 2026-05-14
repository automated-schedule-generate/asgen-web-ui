'use client';
import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';

interface SearchBarComponentProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBarComponent({
  placeholder = 'Pesquisar por um docente',
  value,
  onChange,
}: SearchBarComponentProps = {}) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      InputProps={{
        placeholder,
        sx: {
          backgroundColor: 'background.default',
          borderColor: 'secondary.light',
          borderRadius: '1.5rem',
          paddingY: '0rem',
        },
        startAdornment: (
          <InputAdornment position="start">
            <Search color="secondary" />
          </InputAdornment>
        ),
      }}
    />
  );
}
