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
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { Logo } from '@/components/layout/logo.component';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';

export function AuthForm({
  open,
  onClose,
  openRegisterDialog,
}: {
  open: boolean;
  onClose: () => void;
  openRegisterDialog: () => void;
}) {
  const { control, handleSubmit } = useFormWithZod(authSchema);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function submit(data: AuthType) {
    setLoading(true);
    setErro('');
    try {
      await login(data);
      router.push('/dashboard');
    } catch {
      setErro('Email ou senha incorretos. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
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
        <Close />
      </IconButton>
      <DialogContent className="w-[500px]">
        <div className="flex justify-center mt-4 mb-6">
          <Logo orientation="vertical" theme="dark" />
        </div>
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <label htmlFor="email">Email:</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...field } }) => (
                <OutlinedInput
                  {...field}
                  inputRef={ref}
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                />
              )}
            />
            <label htmlFor="password">Senha:</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...field } }) => (
                <OutlinedInput
                  {...field}
                  inputRef={ref}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
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
          {erro && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {erro}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={16} color="inherit" /> : null
            }
          >
            {loading ? 'Entrando...' : 'Login'}
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
