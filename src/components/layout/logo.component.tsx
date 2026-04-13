'use client';

import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface LogoProps {
  orientation?: 'vertical' | 'horizontal';
  theme?: 'light' | 'dark';
  width?: number;
}

export default function Logo({ theme = 'light', width = 150 }: LogoProps) {
  // Escolhe a imagem baseada no tema
  const src =
    theme === 'dark'
      ? '/images/asgen-horizontal-dark.svg'
      : '/images/asgen-horizontal-light.svg';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src={src}
        alt="ASgen Logo"
        width={width}
        height={50} // Altura fixa para manter proporção
        style={{
          objectFit: 'contain',
          width: 'auto',
          height: '40px', // Garante que não fique gigante
        }}
        priority
      />
    </Box>
  );
}
