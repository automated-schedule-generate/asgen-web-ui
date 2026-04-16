'use client';

import { OutlinedInput, Typography, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface FormInputProps {
  control?: Control;
  key: string;
  type: string;
  placeholder: string;
  label: string;
  name: string;
  minRows?: number;
  maxRows?: number;
}

export function FormInput({
  control,
  key,
  type,
  placeholder,
  label,
  name,
  minRows,
  maxRows,
}: FormInputProps) {
  if (type === 'textarea') {
    return (
      <>
        <label htmlFor={key}>{label}</label>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TextField
                {...field}
                id={key}
                placeholder={placeholder}
                variant="outlined"
                multiline
                minRows={minRows}
                maxRows={maxRows}
                error={!!fieldState.error}
                fullWidth
              />
              {fieldState.error && (
                <Typography color="error" variant="caption">
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />
      </>
    );
  }
  return (
    <>
      <label htmlFor={key}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <>
            <OutlinedInput
              {...field}
              inputRef={ref}
              id={key}
              type={type}
              placeholder={placeholder}
              aria-label={label}
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Typography color="error" variant="caption">
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}
