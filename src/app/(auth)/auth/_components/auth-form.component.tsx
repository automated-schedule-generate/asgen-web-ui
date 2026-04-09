'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '../_services/auth.service';
import { authSchema, AuthSchema } from '../_schemas/auth-schema.schema';
import {
  Dialog,
  DialogContent,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from '@/components/layout/logo.component';

export function AuthForm({
  open,
  onClose,
  openRegisterDialog,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: zodResolver(authSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function submit(data: AuthSchema) {
    try {
      await login(data);
    } catch (error) {
      console.log('Login failed:', error);
      return;
    }
    router.push('/dashboard');
  }

  return (
    <Dialog open={open}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent className="w-[500px]">
        <div className="flex justify-center mt-4 mb-6">
          <Logo orientation="vertical" theme="dark" />
        </div>
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <label htmlFor="email">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              )}
            />
            <label htmlFor="password">Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'Esconder senha' : 'Mostrar senha'
                        }
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
          <Button type="submit" variant="contained" color="secondary">
            Login
          </Button>
          <a
            onClick={() => openRegisterDialog()}
            className="text-sm text-blue-500 text-center"
          >
            Não tem uma conta? Registre-se.
          </a>
        </form>
      </DialogContent>
    </Dialog>
  );
}
