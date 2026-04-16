'use client';
import { IMaskInput } from 'react-imask';
import React from 'react';
import { InputBaseComponentProps } from '@mui/material';

interface CustomProps extends InputBaseComponentProps {
  name: string;
  mask: string;
}

export const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, mask, name, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        inputRef={ref}
        onAccept={(value: string) => onChange({ target: { name, value } })}
        overwrite
      />
    );
  },
);
