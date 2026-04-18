'use client';

import { OutlinedInput, Typography, TextField } from '@mui/material';
import { Control, Controller, type Path } from 'react-hook-form';

interface FormInputProps<T extends object> {
  control?: Control<T>;
  id: string;
  type: string;
  placeholder: string;
  label: string;
  name: string;
  minRows?: number;
  maxRows?: number;
}

export function FormInput<T extends object>({
  control,
  id,
  type,
  placeholder,
  label,
  name,
  minRows,
  maxRows,
}: FormInputProps<T>) {
  if (type === 'textarea') {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <Controller
          name={name as Path<T>}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TextField
                {...field}
                id={id}
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
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <>
            <OutlinedInput
              {...field}
              inputRef={ref}
              id={id}
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
