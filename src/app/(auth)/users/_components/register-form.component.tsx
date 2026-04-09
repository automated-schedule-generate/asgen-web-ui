'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
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
  ArrowBack,
  ArrowForward,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from '@/components/layout/logo.component';
import { User, userSchema } from '../_schemas/user.schema';
import { register } from '../_services/user.service';

export function RegisterForm({
  open,
  onClose,
  openAuthDialog,
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
    ['name', 'surname'],
    ['cpf', 'email'],
    ['password', 'confirmPassword'],
  ];
  const handleNext = async () => {
    const isValid = await trigger(stepFields[activeStep]);

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  async function submit(data: User) {
    await register(data);
    router.push('/dashboard');
  }

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
                <label htmlFor="name">Nome:</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="name"
                        placeholder="Digite seu nome"
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
                <label htmlFor="surname">Sobrenome:</label>
                <Controller
                  name="surname"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="surname"
                        placeholder="Digite seu sobrenome"
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

            {activeStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                <label htmlFor="cpf">CPF:</label>

                <Controller
                  name="cpf"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="cpf"
                        inputComponent={IMaskInput as any}
                        inputProps={{
                          mask: '000.000.000-00',
                        }}
                        fullWidth
                        error={!!fieldState.error}
                        placeholder="Digite seu CPF"
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

      <DialogActions sx={{ px: 3, py: 0, justifyContent: 'space-between' }}>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            color="secondary"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ textTransform: 'none' }}
          >
            Voltar
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowForward />}
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
      <Box sx={{ px: 3, py: 2, textAlign: 'center' }}>
        <a
          onClick={() => openAuthDialog()}
          className="text-sm text-blue-500 text-center"
        >
          Já tem uma conta? Faça login.
        </a>
      </Box>
    </Dialog>
  );
}
