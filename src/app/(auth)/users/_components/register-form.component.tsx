'use client';

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
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
  FormHelperText,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Visibility,
  VisibilityOff,
  Close,
} from '@mui/icons-material';
import { Logo } from '@/components/layout/logo.component';
import { UserType, userSchema } from '../_schemas/user.schema';
import { register } from '../_services/user.service';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { TextMaskCustom } from '@/components/utilities/mask-input.component';
import { toast } from 'react-toastify';

export function RegisterForm({
  open,
  onClose,
  openAuthDialog,
}: {
  open: boolean;
  onClose: () => void;
  openAuthDialog: () => void;
}) {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useFormWithZod(userSchema);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [wrongCredentials, setWrongCredentials] = React.useState(false);

  function handleClose() {
    reset();
    setWrongCredentials(false);
    setActiveStep(0);
    onClose();
  }

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

  const stepFields: (keyof UserType)[][] = [
    ['name', 'surname'],
    ['cpf', 'email'],
    ['password', 'confirmPassword'],
  ];
  const stepErrors = stepFields.map(
    (fields, index) =>
      (index === 1 && wrongCredentials) ||
      fields.some((field) => !!errors[field]),
  );

  const handleNext = async () => {
    const isValid = await trigger(stepFields[activeStep]);

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  async function submit(data: UserType) {
    const toastId = toast.loading('Cadastrando...');
    try {
      await register(data);
      toast.update(toastId, {
        render: 'Cadastro realizado com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
      router.push('/dashboard');
    } catch (error: unknown) {
      setWrongCredentials(true);
      toast.update(toastId, {
        render: 'Falha ao cadastrar! Tente novamente',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
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
      <DialogContent>
        <div className="flex justify-center mt-4 mb-2">
          <Logo orientation="vertical" theme="dark" />
        </div>
        <h2 className="text-2xl text-center font-bold mb-4">Criar conta</h2>
        {wrongCredentials && (
          <p className="text-sm text-red-500 text-center mb-2">
            Email ou CPF já cadastrado!
          </p>
        )}
        <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
          {steps.map((label, index) => (
            <Step
              key={label}
              completed={!stepErrors[index] && index < activeStep}
            >
              <StepLabel error={stepErrors[index]}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <Box sx={{ mt: 2, minHeight: '200px' }}>
            {activeStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <label
                  htmlFor="name"
                  className={!!errors.name ? 'text-red-600' : undefined}
                >
                  Nome
                  <Typography component="span" color="error" aria-hidden>
                    {' *'}
                  </Typography>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="name"
                        placeholder="Digite seu nome"
                        fullWidth
                        error={!!errors.name}
                        sx={
                          !!errors.name
                            ? { '& input': { color: 'error.main' } }
                            : undefined
                        }
                      />
                      {errors.name && (
                        <FormHelperText error>
                          {errors.name.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
                <label
                  htmlFor="surname"
                  className={!!errors.surname ? 'text-red-600' : undefined}
                >
                  Sobrenome
                  <Typography component="span" color="error" aria-hidden>
                    {' *'}
                  </Typography>
                </label>
                <Controller
                  name="surname"
                  control={control}
                  render={({ field }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="surname"
                        placeholder="Digite seu sobrenome"
                        fullWidth
                        error={!!errors.surname}
                        sx={
                          !!errors.surname
                            ? { '& input': { color: 'error.main' } }
                            : undefined
                        }
                      />
                      {errors.surname && (
                        <FormHelperText error>
                          {errors.surname.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <label
                  htmlFor="email"
                  className={
                    wrongCredentials || !!errors.email
                      ? 'text-red-600'
                      : undefined
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
                  render={({ field }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="email"
                        placeholder="Digite seu email"
                        error={wrongCredentials || !!errors.email}
                        fullWidth
                        sx={
                          wrongCredentials || !!errors.email
                            ? { '& input': { color: 'error.main' } }
                            : undefined
                        }
                      />
                      {errors.email && (
                        <FormHelperText error>
                          {errors.email.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
                <label
                  htmlFor="cpf"
                  className={
                    wrongCredentials || !!errors.cpf
                      ? 'text-red-600'
                      : undefined
                  }
                >
                  CPF
                  <Typography component="span" color="error" aria-hidden>
                    {' *'}
                  </Typography>
                </label>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        inputRef={ref}
                        id="cpf"
                        inputComponent={TextMaskCustom}
                        inputProps={{ mask: '000.000.000-00' }}
                        fullWidth
                        error={wrongCredentials || !!errors.cpf}
                        placeholder="Digite seu CPF"
                        sx={
                          wrongCredentials || !!errors.cpf
                            ? { '& input': { color: 'error.main' } }
                            : undefined
                        }
                      />
                      {errors.cpf && (
                        <FormHelperText error>
                          {errors.cpf.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <label
                  htmlFor="password"
                  className={!!errors.password ? 'text-red-600' : undefined}
                >
                  Senha
                  <Typography component="span" color="error" aria-hidden>
                    {' *'}
                  </Typography>
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        error={!!errors.password}
                        placeholder="Escolha uma senha"
                        sx={
                          !!errors.password
                            ? { '& input': { color: 'error.main' } }
                            : undefined
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? 'Esconder senha'
                                  : 'Mostrar senha'
                              }
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
                      {errors.password && (
                        <FormHelperText error>
                          {errors.password.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
                <label
                  htmlFor="confirmPassword"
                  className={
                    !!errors.confirmPassword ? 'text-red-600' : undefined
                  }
                >
                  Confirme sua senha
                  <Typography component="span" color="error" aria-hidden>
                    {' *'}
                  </Typography>
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        error={!!errors.confirmPassword}
                        placeholder="Confirme sua senha"
                        sx={
                          !!errors.confirmPassword
                            ? { '& input': { color: 'error.main' } }
                            : undefined
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showConfirmPassword
                                  ? 'Esconder senha'
                                  : 'Mostrar senha'
                              }
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
                      {errors.confirmPassword && (
                        <FormHelperText error>
                          {errors.confirmPassword.message}
                        </FormHelperText>
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
