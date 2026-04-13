'use client';

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
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
  Close,
} from '@mui/icons-material';
import Logo from '@/components/layout/logo.component';
import { UserType, userSchema } from '../_schemas/user.schema';
import { register } from '../_services/user.service';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';

export function RegisterForm({
  open,
  onClose,
  openAuthDialog,
}: {
  open: boolean;
  onClose: () => void;
  openAuthDialog: () => void;
}) {
  const { control, handleSubmit, watch, trigger } = useFormWithZod(userSchema);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Identificação', 'Informações', 'Senha'];
  const password = watch('password');

  // Sincroniza validação de confirmação de senha
  React.useEffect(() => {
    if (password) trigger('confirmPassword');
  }, [password, trigger]);

  const stepFields: (keyof UserType)[][] = [
    ['name', 'surname'],
    ['cpf', 'email'],
    ['password', 'confirmPassword'],
  ];

  const handleNext = async () => {
    const isValid = await trigger(stepFields[activeStep]);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  async function submit(data: UserType) {
    try {
      await register(data);
      onClose(); // Importante fechar antes de navegar
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro no registro:', error);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3, minHeight: '550px' } }}
    >
      <IconButton
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Logo orientation="vertical" theme="dark" />
        </Box>

        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          Criar conta
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(submit)}>
          <Box
            sx={{
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {activeStep === 0 && (
              <>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    Nome
                  </Typography>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <OutlinedInput
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Ex: Seu primeiro nome"
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    Sobrenome
                  </Typography>
                  <Controller
                    name="surname"
                    control={control}
                    render={({ field, fieldState }) => (
                      <OutlinedInput
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Ex: Seu segundo nome"
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </Box>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    Email
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <OutlinedInput
                        {...field}
                        fullWidth
                        size="small"
                        type="email"
                        placeholder="email@exemplo.com"
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    CPF
                  </Typography>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field, fieldState }) => (
                      <OutlinedInput
                        {...field}
                        fullWidth
                        size="small"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        inputComponent={IMaskInput as any}
                        inputProps={{ mask: '000.000.000-00' }}
                        placeholder="000.000.000-00"
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </Box>
              </>
            )}

            {activeStep === 2 && (
              <>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    Senha
                  </Typography>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                      <OutlinedInput
                        {...field}
                        fullWidth
                        size="small"
                        type={showPassword ? 'text' : 'password'}
                        error={!!fieldState.error}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
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
                    )}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    Confirmar Senha
                  </Typography>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState }) => (
                      <OutlinedInput
                        {...field}
                        fullWidth
                        size="small"
                        type={showConfirmPassword ? 'text' : 'password'}
                        error={!!fieldState.error}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
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
                    )}
                  />
                </Box>
              </>
            )}
          </Box>
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ textTransform: 'none' }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={
            activeStep === steps.length - 1 ? handleSubmit(submit) : handleNext
          }
          sx={{ bgcolor: '#03017D', textTransform: 'none', px: 4 }}
          endIcon={activeStep !== steps.length - 1 && <ArrowForward />}
        >
          {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
        </Button>
      </DialogActions>

      <Box sx={{ pb: 3, textAlign: 'center' }}>
        <Typography
          variant="caption"
          sx={{
            color: '#1976d2',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
          onClick={openAuthDialog}
        >
          Já tem uma conta? Faça login.
        </Typography>
      </Box>
    </Dialog>
  );
}
