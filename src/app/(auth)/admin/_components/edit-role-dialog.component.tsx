'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { X, ShieldCheck, Save } from 'lucide-react';
import { updateRole } from '../_services/role.service';
import { roleSchema, RoleType } from '../_schemas/role.schema';

interface EditRoleDialogProps {
  role: RoleType;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

type FormData = Omit<RoleType, 'id'>;

export function EditRoleDialog({
  role,
  open,
  onClose,
  onUpdated,
}: EditRoleDialogProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role.name,
      description: role.description ?? '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: role.name,
        description: role.description ?? '',
      });
    }
  }, [role, open, reset]);

  const handleClose = () => {
    onClose();
    setServerError('');
  };

  async function onSubmit(data: FormData) {
    setLoading(true);
    setServerError('');
    try {
      await updateRole(role.id, {
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
      });
      onUpdated();
      handleClose();
    } catch {
      setServerError('Erro ao atualizar cargo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: '#ffffff',
          borderRadius: '2rem',
          padding: '1rem',
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        },
      }}
    >
      <Box className="flex items-center justify-between p-4 pb-0">
        <Box className="flex items-center gap-3">
          <Box className="bg-[#03017D]/10 p-2 rounded-xl text-[#03017D]">
            <ShieldCheck size={24} />
          </Box>
          <Typography variant="h6" className="font-black text-[#03017D]">
            Editar Cargo
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          className="text-slate-400 hover:bg-slate-100 rounded-xl"
        >
          <X size={20} />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box className="flex flex-col gap-6 pt-4">
            <Box>
              <Typography
                variant="body2"
                className="font-bold text-slate-700 mb-2 ml-1"
              >
                Nome do Cargo
              </Typography>
              <TextField
                {...register('name')}
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                slotProps={{
                  input: { className: 'rounded-2xl bg-slate-50 border-none' },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                className="font-bold text-slate-700 mb-2 ml-1"
              >
                Descrição (opcional)
              </Typography>
              <TextField
                {...register('description')}
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                slotProps={{
                  input: { className: 'rounded-2xl bg-slate-50 border-none' },
                }}
              />
            </Box>

            {serverError && (
              <Typography
                variant="caption"
                className="text-rose-500 font-bold text-center"
              >
                {serverError}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions className="p-4 gap-3">
          <Button
            onClick={handleClose}
            className="text-slate-500 font-bold px-6 hover:bg-slate-50 rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            id="btn-submit-edit-role"
            type="submit"
            variant="contained"
            disabled={loading}
            className="bg-[#03017D] hover:bg-[#03017D]/90 text-white font-bold px-8 py-3 rounded-xl shadow-none"
            startIcon={<Save size={18} />}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
