'use client';
import React from 'react';
import { Logo } from '@/components/layout/logo.component';
import { Button, Toolbar, AppBar } from '@mui/material';
import { AuthForm } from '../(auth)/auth/_components/auth-form.component';
import { RegisterForm } from '../(auth)/users/_components/register-form.component';

interface LayoutProps {
  children: React.ReactNode;
}

export default function CustomLayout({ children }: LayoutProps) {
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);

  const handleOpenAuthDialog = () => {
    setOpenAuthDialog(true);
  };

  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  return (
    <div className="layout-container">
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Logo orientation="horizontal" theme="dark" width={200} />
          <div className="flex flex-row gap-2 ml-auto">
            <Button
              onClick={handleOpenAuthDialog}
              color="secondary"
              variant="contained"
            >
              Fazer Login
            </Button>
            <AuthForm
              open={openAuthDialog}
              onClose={() => setOpenAuthDialog(false)}
            />
            <Button
              onClick={handleOpenRegisterDialog}
              color="secondary"
              variant="contained"
            >
              Registrar
            </Button>
            <RegisterForm
              open={openRegisterDialog}
              onClose={() => setOpenRegisterDialog(false)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
}
