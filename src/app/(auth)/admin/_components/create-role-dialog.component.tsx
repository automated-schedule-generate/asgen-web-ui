'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Plus, ShieldCheck, X } from 'lucide-react';
import { createRole } from '../_services/role.service';

interface CreateRoleDialogProps {
  onCreated: () => void;
}

export function CreateRoleDialog({ onCreated }: CreateRoleDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
    setError('');
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 3) {
      setError('O nome deve ter pelo menos 3 caracteres');
      return;
    }
    setLoading(true);
    try {
      await createRole({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      onCreated();
      handleClose();
    } catch {
      setError('Erro ao criar cargo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        id="btn-create-role"
        variant="contained"
        className="bg-[#03017D] hover:bg-[#03017D]/90 text-white font-bold px-6 py-2.5 rounded-xl shadow-none hover:shadow-lg transition-all"
        startIcon={<Plus size={20} />}
        onClick={handleOpen}
      >
        NOVO CARGO
      </Button>

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
              Criar Novo Cargo
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            className="text-slate-400 hover:bg-slate-100 rounded-xl"
          >
            <X size={20} />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
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
                  id="input-role-name"
                  placeholder="Ex: Coordenador, Diretor..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  fullWidth
                  required
                  error={!!error}
                  helperText={error}
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
                  id="input-role-description"
                  placeholder="Descreva as responsabilidades deste cargo..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  slotProps={{
                    input: { className: 'rounded-2xl bg-slate-50 border-none' },
                  }}
                />
              </Box>
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
              id="btn-submit-role"
              type="submit"
              variant="contained"
              className="bg-[#03017D] hover:bg-[#03017D]/90 text-white font-bold px-8 py-3 rounded-xl shadow-none"
              disabled={loading}
              startIcon={<Plus size={18} />}
            >
              {loading ? 'Criando...' : 'Criar Cargo'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
