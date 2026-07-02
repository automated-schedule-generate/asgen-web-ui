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
  Typography,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { Logo } from '@/components/layout/logo.component';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { toast } from 'react-toastify';

export function AuthForm({
  open,
  onClose,
  openRegisterDialog,
}: {
  open: boolean;
  onClose: () => void;
  openRegisterDialog: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useFormWithZod(authSchema);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState('');
  const [wrongCredentials, setWrongCredentials] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleClose() {
    reset();
    setWrongCredentials(false);
    setShowPassword(false);
    onClose();
  }

  async function submit(data: AuthType) {
    const toastId = toast.loading('Fazendo login...');
    try {
      await login(data);
      toast.update(toastId, {
        render: 'Login realizado!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
      router.push('/dashboard');
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message === 'Login ou senha incorretos'
      ) {
        setWrongCredentials(true);
      }
      toast.update(toastId, {
        render: 'Falha ao fazer login! Tente novamente',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  return (
    <Dialog open={open}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
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
          {wrongCredentials && (
            <p className="text-sm text-red-500 text-center">
              Login ou senha inválidos.
            </p>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <label
              htmlFor="email"
              className={
                wrongCredentials || !!errors.email ? 'text-red-600' : undefined
              }
            >
              Email
              <Typography component="span" color="error" aria-hidden>
                {' *'}
              </Typography>
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...field }, fieldState }) => (
                <>
                  <OutlinedInput
                    {...field}
                    inputRef={ref}
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    error={wrongCredentials || !!fieldState.error}
                    sx={
                      wrongCredentials || !!fieldState.error
                        ? { '& input': { color: 'error.main' } }
                        : undefined
                    }
                  />
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
            <label
              htmlFor="password"
              className={
                wrongCredentials || !!errors.password
                  ? 'text-red-600'
                  : undefined
              }
            >
              Senha
              <Typography component="span" color="error" aria-hidden>
                {' *'}
              </Typography>
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...field }, fieldState }) => (
                <>
                  <OutlinedInput
                    {...field}
                    inputRef={ref}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    error={wrongCredentials || !!fieldState.error}
                    sx={
                      wrongCredentials || !!fieldState.error
                        ? { '& input': { color: 'error.main' } }
                        : undefined
                    }
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
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!isValid}
          >
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
