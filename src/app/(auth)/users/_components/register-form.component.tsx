'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  ArrowLeft,
  ArrowRight,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from '@/components/layout/logo.component';
import { User, userSchema } from '../_schemas/user.schema';

export function RegisterForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { control, handleSubmit, watch, trigger } = useForm({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const password = watch('password');

  React.useEffect(() => {
    if (password) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const steps = ['Identificação', 'Informações Pessoais', 'Definição de senha'];
  const [activeStep, setActiveStep] = useState(0);

  const stepFields = [
    ['name', 'email'],
    ['cpf'],
    ['password', 'confirmPassword'],
  ];
  const handleNext = async () => {
    const isValid = await trigger(stepFields[activeStep]);

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  async function submit(data: User) {}

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          minHeight: '600px',
          height: '80vh',
        },
      }}
    >
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
      <DialogContent>
        <div className="flex justify-center mt-4 mb-2">
          <Logo orientation="vertical" theme="dark" />
        </div>
        <h2 className="text-2xl text-center font-bold mb-4">Criar conta</h2>
        <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <Box sx={{ mt: 2, minHeight: '200px' }}>
            {activeStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <label htmlFor="name">Nome completo:</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="name"
                        placeholder="Digite seu nome completo"
                        fullWidth
                        error={!!fieldState.error}
                        required
                      />
                      {fieldState.error && (
                        <Typography color="error" variant="caption">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
                <label htmlFor="email">Email:</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="email"
                        placeholder="Digite seu email"
                        error={!!fieldState.error}
                        fullWidth
                        required
                      />
                      {fieldState.error && (
                        <Typography color="error" variant="caption">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <label htmlFor="cpf">CPF:</label>

                <Controller
                  name="cpf"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="cpf"
                        placeholder="Digite seu CPF"
                        fullWidth
                        error={!!fieldState.error}
                        required
                      />
                      {fieldState.error && (
                        <Typography color="error" variant="caption">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <label htmlFor="password">Senha:</label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        error={!!fieldState.error}
                        placeholder="Escolha uma senha"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {fieldState.error && (
                        <Typography color="error" variant="caption">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
                <label htmlFor="confirmPassword">Confirme sua senha:</label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value === watch('password') || 'As senhas não coincidem',
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        error={!!fieldState.error}
                        placeholder="Confirme sua senha"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {fieldState.error && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5 }}
                        >
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>
            )}
          </Box>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft />}
          color="secondary"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ textTransform: 'none' }}
        >
          Voltar
        </Button>

        <Box>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowRight />}
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit(submit)
                : handleNext
            }
            sx={{ textTransform: 'none', px: 4 }}
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
