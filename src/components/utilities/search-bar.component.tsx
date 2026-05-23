'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { Close, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  delay?: number;
}

export function SearchBarComponent({
  onSearch,
  placeholder = 'Pesquisar...',
  delay = 500,
}: SearchBarProps) {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(term);
    }, delay);

    return () => clearTimeout(timer);
  }, [term, delay, onSearch]);

  const handleClear = () => {
    setTerm('');
    onSearch('');
  };

  return (
    <TextField
      variant="outlined"
      value={term}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}
      InputProps={{
        placeholder: placeholder,
        sx: {
          height: '2.5rem',
          width: '20rem',
          backgroundColor: 'background.default',
          borderRadius: '1rem',
          paddingY: '0rem',
        },
        startAdornment: (
          <InputAdornment position="start">
            <Search color="secondary" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {term.length > 0 && (
              <IconButton onClick={handleClear}>
                <Close color="secondary" />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
