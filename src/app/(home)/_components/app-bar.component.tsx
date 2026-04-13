'use client';

import React, { useState } from 'react';
import Logo from '@/components/layout/logo.component';
import { Button, Toolbar, AppBar, Box, Container } from '@mui/material';
import { AuthForm } from '@/app/(auth)/auth/_components/auth-form.component';
import { RegisterForm } from '@/app/(auth)/users/_components/register-form.component';
export function HomeAppBar() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const handleOpenAuth = () => {
    setRegisterDialogOpen(false);
    setAuthDialogOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthDialogOpen(false);
    setRegisterDialogOpen(true);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: '#fff',
        boxShadow: 'none',
        borderBottom: '1px solid #eee',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: '0 !important',
          }}
        >
          <Logo theme="dark" width={140} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="text"
              onClick={handleOpenAuth}
              sx={{ color: '#333', textTransform: 'none', fontWeight: 600 }}
            >
              Fazer Login
            </Button>
            <Button
              variant="contained"
              onClick={handleOpenRegister}
              sx={{
                bgcolor: '#03017D',
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 2,
                px: 3,
              }}
            >
              Cadastre-se
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* COMPONENTES DOS POP-UPS */}
      <AuthForm
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        openRegisterDialog={handleOpenRegister}
      />

      <RegisterForm
        open={registerDialogOpen}
        onClose={() => setRegisterDialogOpen(false)}
        openAuthDialog={handleOpenAuth}
      />
    </AppBar>
  );
}
