'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '../_services/auth.service';
import { authSchema, AuthType } from '../_schemas/auth-schema.schema';
import {
  Dialog,
  DialogContent,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import Logo from '@/components/layout/logo.component';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';

export function AuthForm({
  open,
  onClose,
  openRegisterDialog,
}: {
  open: boolean;
  onClose: () => void;
  openRegisterDialog: () => void; // Adicionei o tipo aqui
}) {
  const { control, handleSubmit } = useFormWithZod(authSchema);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function submit(data: AuthType) {
    try {
      await login(data);
      window.localStorage.setItem('userEmail', data.email);
      const userLabel = data.email.split('@')[0];
      window.localStorage.setItem('userName', userLabel);

      // Fecha o modal antes de redirecionar
      onClose();
      router.push('/dashboard');
    } catch (error) {
      console.log('Login failed:', error);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Logo orientation="vertical" theme="dark" />
        </Box>

        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(submit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Email
              </Typography>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    fullWidth
                    size="small"
                    type="email"
                    placeholder="Seu email"
                  />
                )}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Senha
              </Typography>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    fullWidth
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#03017D', py: 1.2, fontWeight: 'bold' }}
            >
              Entrar
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: '#1976d2',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
              onClick={openRegisterDialog}
            >
              Não tem uma conta? Registre-se.
            </Typography>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
