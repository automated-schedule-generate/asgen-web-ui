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
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
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
  onFocus,
  defaultValue,
  disabled,
  required,
}: FormInputProps<T>) {
  if (type === 'number') {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <Controller
          name={name as Path<T>}
          control={control}
          render={({ field: { onChange, ref, ...field }, fieldState }) => (
            <>
              <OutlinedInput
                {...field}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onChange(val < 0 ? '0' : val);
                }}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                    e.preventDefault();
                  }
                }}
                inputProps={{ min: 0 }}
                inputRef={ref}
                id={id}
                type={type}
                placeholder={placeholder}
                aria-label={label}
                error={!!fieldState.error}
                disabled={disabled}
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
  if (type === 'textarea') {
    return (
      <>
        <Controller
          name={name as Path<T>}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Typography
                component="label"
                htmlFor={id}
                color={fieldState.error ? 'error' : 'textPrimary'}
                sx={{ mb: 0, display: 'block' }}
              >
                {label}
                {required && (
                  <Typography component="span" color="error" aria-hidden>
                    {' *Campo obrigatório'}
                  </Typography>
                )}
              </Typography>
              <TextField
                {...field}
                onFocus={(e) => {
                  if (onFocus) onFocus(e);
                }}
                defaultValue={defaultValue}
                id={id}
                placeholder={placeholder}
                variant="outlined"
                multiline
                minRows={minRows}
                maxRows={maxRows}
                error={!!fieldState.error}
                fullWidth
                required
                disabled={disabled}
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
      <label htmlFor={id}>
        {label}
        {required && (
          <Typography component="span" color="error" aria-hidden>
            {' *Campo obrigatório'}
          </Typography>
        )}
      </label>
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
              disabled={disabled}
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
