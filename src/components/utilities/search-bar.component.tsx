'use client';
import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

export function SearchBarComponent() {
  return (
    <TextField
      variant="outlined"
      fullWidth
      InputProps={{
        placeholder: 'Pesquisar por um docente',
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
