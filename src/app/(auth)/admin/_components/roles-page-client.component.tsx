'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import { ShieldCheck, Home, Search } from 'lucide-react';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';
import { RolesListComponent } from './list/roles-list.component';
import { CreateRoleDialog } from './create-role-dialog.component';
import { getAllRoles, deleteRole } from '../_services/role.service';
import type { RoleType } from '../_schemas/role.schema';
import Link from 'next/link';

export function RolesPageClient() {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [filtered, setFiltered] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getAllRoles();
      const items: RoleType[] = data?.items ?? data ?? [];
      setRoles(items);
      setFiltered(items);
    } catch {
      setError(
        'Erro ao carregar cargos. Verifique a conexão e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(roles);
      return;
    }
    const lower = search.toLowerCase();
    setFiltered(
      roles.filter(
        (r) =>
          r.name.toLowerCase().includes(lower) ||
          r.description?.toLowerCase().includes(lower),
      ),
    );
  }, [search, roles]);

  async function handleConfirmDelete() {
    if (!deleteId) return;
    try {
      await deleteRole(deleteId);
      await fetchRoles();
    } catch {
      setError('Erro ao excluir cargo.');
    } finally {
      setDeleteId(null);
    }
  }

  const roleToDelete = roles.find((r) => r.id === deleteId);

  return (
    <Box className="w-full max-w-6xl mx-auto bg-white rounded-[2rem] p-8 md:p-10">
      <Breadcrumbs className="mb-8">
        <Link href="/dashboard" passHref legacyBehavior>
          <MuiLink
            underline="hover"
            color="inherit"
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-[#03017D] transition-colors"
          >
            <Home size={12} /> DASHBOARD
          </MuiLink>
        </Link>
        <Typography className="text-[10px] uppercase tracking-widest font-bold text-[#03017D] bg-sky-50 px-3 py-1 rounded-full">
          GESTÃO DE CARGOS
        </Typography>
      </Breadcrumbs>

      {/* Joined Header and Search Container */}
      <Box
        sx={{
          borderRadius: 4,
          border: '1px solid #eceef2',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          p: 4,
          mb: 6,
          boxShadow: '0 10px 30px -12px rgba(0,0,0,0.05)',
        }}
      >
        <Box className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <Box className="flex items-start gap-4">
            <Box className="bg-[#03017D] w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck size={28} strokeWidth={2} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                className="font-bold text-[#03017D] tracking-tight mb-2"
              >
                Cargos e Funções
              </Typography>
              <Typography
                variant="body1"
                className="text-slate-400 text-sm max-w-md leading-relaxed"
              >
                Defina e gerencie os papéis administrativos da instituição,
                garantindo organização e clareza nas responsabilidades.
              </Typography>
            </Box>
          </Box>

          <Box className="flex-shrink-0 mt-2 md:mt-0">
            <CreateRoleDialog onCreated={fetchRoles} />
          </Box>
        </Box>

        <Divider sx={{ mb: 4, opacity: 0.6 }} />

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={2}
          alignItems="center"
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar por nome ou descrição do cargo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#03017D" style={{ opacity: 0.5 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'white',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 0 0 4px rgba(3,1,125,0.05)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 0 0 4px rgba(3,1,125,0.1)',
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Content Section */}
      <Box className="space-y-2">
        {error && (
          <Alert
            severity="error"
            className="rounded-xl border border-rose-100 bg-rose-50 text-rose-700"
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Box className="flex flex-col items-center justify-center py-20 gap-4">
            <CircularProgress size={40} sx={{ color: '#03017D' }} />
            <Typography className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">
              Carregando dados...
            </Typography>
          </Box>
        ) : (
          <RolesListComponent
            roles={filtered}
            onDelete={setDeleteId}
            onUpdated={fetchRoles}
          />
        )}
      </Box>

      <ConfirmDialog
        open={!!deleteId}
        title="Excluir Cargo"
        content={`Tem certeza que deseja excluir o cargo "${roleToDelete?.name}"? Esta ação removerá permanentemente o registro do sistema.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  );
}
