'use client';

import React from 'react';
import { Box } from '@mui/material';
import { HomeAppBar } from './_components/app-bar.component';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Aqui fica apenas a barra com os botões de Login/Registrar */}
      <HomeAppBar />

      {/* O 'children' é onde o texto "ISSO É UM TESTE" (ou sua Home real) vai aparecer */}
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
