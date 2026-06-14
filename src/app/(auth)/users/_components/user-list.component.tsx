'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Collapse,
  AlertColor,
  Tooltip,
  Chip,
  Fade,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  DeleteOutline,
  EditOutlined,
  ManageAccountsOutlined,
  AdminPanelSettings,
  School,
  SupportAgent,
  PersonAddOutlined,
} from '@mui/icons-material';

import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';

import type { IUser } from '@/interfaces/user.interface';
import {
  getAllUsers,
  updateUserRole,
  updateUserName,
  deleteUser,
  createUser,
} from '../_services/user.service';
import { RegisterForm } from './register-form.component';

const ROLES = [
  { value: 'Teacher', icon: <School />, color: '#10b981', bg: '#ecfdf5' },
  {
    value: 'Coordinator',
    icon: <AdminPanelSettings />,
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  { value: 'CRADT', icon: <SupportAgent />, color: '#f59e0b', bg: '#fffbeb' },
];

export function UserList() {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState<IUser | null>(null);

  const [selectedTab, setSelectedTab] = useState(0);

  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editedUser, setEditedUser] = useState<IUser | null>(null);
  const [newRole, setNewRole] = useState('');
  const [newName, setNewName] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as AlertColor,
  });

  const loadUsers = async (search = '') => {
    setLoading(true);
    setError('');
    try {
      const users = await getAllUsers({ search });
      setUserList(users);
    } catch {
      setError(
        'Erro ao carregar usuários. Verifique a conexão e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    getAllUsers()
      .then((users) => {
        if (!cancelled) setUserList(users);
      })
      .catch(() => {
        if (!cancelled)
          setError(
            'Erro ao carregar usuários. Verifique a conexão e tente novamente.',
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const getRoleConfig = (role: string) =>
    ROLES.find((r) => r.value === role) || ROLES[0];

  const showSnackbar = (message: string, severity: AlertColor) =>
    setSnackbar({ message, severity, open: true });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleSearch = (term: string) => {
    const trimmed = term.toLowerCase().trim();
    if (!trimmed) {
      setSearchResult(null);
      loadUsers();
      return;
    }
    loadUsers(trimmed);
  };

  const openRoleDialog = (user: IUser) => {
    setEditedUser(user);
    setNewRole(user.role);
    setRoleDialogOpen(true);
  };

  const saveRoleChange = async () => {
    if (!editedUser) return;
    setSaving(true);
    try {
      await updateUserRole(editedUser.id, newRole);
      await loadUsers();
      if (searchResult?.id === editedUser.id) {
        setSearchResult((prev) => (prev ? { ...prev, role: newRole } : null));
      }
      showSnackbar('Função atualizada com sucesso!', 'success');
      setRoleDialogOpen(false);
    } catch {
      showSnackbar('Erro ao atualizar função.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const openEditDialog = (user: IUser) => {
    setEditedUser(user);
    setNewName(user.name);
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!editedUser || !newName.trim()) return;
    setSaving(true);
    try {
      await updateUserName(editedUser.id, newName);
      await loadUsers();
      if (searchResult?.id === editedUser.id) {
        setSearchResult((prev) => (prev ? { ...prev, name: newName } : null));
      }
      showSnackbar('Dados atualizados com sucesso!', 'success');
      setEditDialogOpen(false);
    } catch {
      showSnackbar('Erro ao atualizar dados do usuário.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const openDeleteDialog = (user: IUser) => {
    setEditedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!editedUser) return;
    setSaving(true);
    try {
      await deleteUser(editedUser.id);
      await loadUsers();
      if (searchResult?.id === editedUser.id) setSearchResult(null);
      showSnackbar('Usuário removido.', 'success');
      setDeleteDialogOpen(false);
    } catch {
      showSnackbar('Erro ao remover usuário.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const renderUserItem = (user: IUser) => {
    const roleConfig = getRoleConfig(user.role);
    return (
      <Fade in timeout={500} key={user.id}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2.5,
            mb: 2,
            borderRadius: 4,
            bgcolor: '#ffffff',
            border: '1px solid #f1f5f9',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
              borderColor: '#e2e8f0',
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: roleConfig.bg,
                color: roleConfig.color,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="700" color="#1e293b">
                {user.name}
              </Typography>
              <Typography variant="body2" color="#64748b">
                Matrícula: {user.registration}
              </Typography>
            </Box>
            <Chip
              icon={roleConfig.icon}
              label={user.role}
              size="small"
              sx={{
                bgcolor: roleConfig.bg,
                color: roleConfig.color,
                fontWeight: 'bold',
                borderRadius: 2,
                ml: 2,
                '& .MuiChip-icon': { color: roleConfig.color },
              }}
            />
          </Box>
          <Box display="flex" gap={1}>
            <Tooltip title="Alterar Função" arrow>
              <IconButton
                onClick={() => openRoleDialog(user)}
                sx={{
                  color: '#03017D',
                  bgcolor: 'rgba(3,1,125,0.05)',
                  '&:hover': { bgcolor: 'rgba(3,1,125,0.1)' },
                }}
              >
                <ManageAccountsOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Nome" arrow>
              <IconButton
                onClick={() => openEditDialog(user)}
                sx={{
                  color: '#64748b',
                  bgcolor: '#f8fafc',
                  '&:hover': { color: '#0ea5e9', bgcolor: '#f0f9ff' },
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remover" arrow>
              <IconButton
                onClick={() => openDeleteDialog(user)}
                sx={{
                  color: '#64748b',
                  bgcolor: '#f8fafc',
                  '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' },
                }}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Fade>
    );
  };

  const coordinators = userList.filter((u) => u.role === 'Coordinator');
  const teachers = userList.filter((u) => u.role === 'Teacher');
  const cradt = userList.filter((u) => u.role === 'CRADT');

  return (
    <Box
      sx={{
        '& > .MuiCard-root': {
          bgcolor: '#ffffff !important',
          borderRadius: '24px !important',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04) !important',
          border: 'none !important',
        },
        '& .MuiCardContent-root': {
          p: { xs: 4, md: 6 },
          '&:last-child': { pb: { xs: 4, md: 6 } },
        },
        '& .MuiTypography-h5': {
          display: 'none !important',
        },
      }}
    >
      <ContentLayoutComponent title="">
        {/* HEADER */}
        <Box
          mb={6}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: -2 }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                bgcolor: '#03017D',
                width: 56,
                height: 56,
                boxShadow: '0 8px 16px rgba(3,1,125,0.2)',
              }}
            >
              <AdminPanelSettings fontSize="large" />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                fontWeight="800"
                sx={{ color: '#03017D', letterSpacing: '-0.02em' }}
              >
                Gestão de Usuários
              </Typography>
              <Typography variant="body1" color="#64748b" mt={0.5}>
                Encontre usuários e gerencie seus cargos e permissões no
                sistema.
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            onClick={() => setAddDialogOpen(true)}
            startIcon={<PersonAddOutlined />}
            sx={{
              borderColor: '#03017D',
              color: '#03017D',
              borderWidth: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: '700',
              px: 3,
              py: 1.5,
              '&:hover': {
                borderColor: '#02005A',
                bgcolor: 'rgba(3,1,125,0.05)',
                borderWidth: 2,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s',
            }}
          >
            Novo Usuário
          </Button>
        </Box>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError('')}
            sx={{ mb: 4, borderRadius: 3 }}
          >
            {error}
          </Alert>
        )}

        {/* SEARCH BAR */}
        <Box mb={6}>
          <SearchBarComponent
            placeholder="Pesquisar por nome ou matrícula..."
            delay={500}
            onSearch={handleSearch}
          />
        </Box>

        {/* SEARCH RESULT */}
        <Collapse in={!!searchResult}>
          {searchResult && (
            <Box mb={6}>
              <Typography
                variant="overline"
                fontWeight="700"
                color="#94a3b8"
                sx={{ ml: 1, letterSpacing: '0.1em' }}
              >
                RESULTADO DA BUSCA
              </Typography>
              {renderUserItem(searchResult)}
            </Box>
          )}
        </Collapse>

        {/* TABS AND LISTS */}
        <Box>
          <Tabs
            value={selectedTab}
            onChange={(_, val) => setSelectedTab(val)}
            sx={{
              minHeight: '48px',
              '& .MuiTabs-indicator': {
                backgroundColor: '#03017D',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1.05rem',
                fontWeight: '600',
                color: '#64748b',
                minWidth: 120,
              },
              '& .Mui-selected': { color: '#03017D !important' },
              mb: 4,
              borderBottom: '2px solid #f1f5f9',
            }}
          >
            <Tab label="Coordenadores" />
            <Tab label="Professores" />
            <Tab label="CRADT" />
          </Tabs>

          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              py={10}
              gap={2}
            >
              <CircularProgress size={36} sx={{ color: '#03017D' }} />
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.7rem',
                }}
              >
                Carregando usuários...
              </Typography>
            </Box>
          ) : (
            <>
              <Box role="tabpanel" hidden={selectedTab !== 0}>
                {selectedTab === 0 && (
                  <Box>
                    {coordinators.length > 0 ? (
                      coordinators.map(renderUserItem)
                    ) : (
                      <Typography color="#94a3b8" py={4} textAlign="center">
                        Nenhum coordenador registrado.
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
              <Box role="tabpanel" hidden={selectedTab !== 1}>
                {selectedTab === 1 && (
                  <Box>
                    {teachers.length > 0 ? (
                      teachers.map(renderUserItem)
                    ) : (
                      <Typography color="#94a3b8" py={4} textAlign="center">
                        Nenhum professor registrado.
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
              <Box role="tabpanel" hidden={selectedTab !== 2}>
                {selectedTab === 2 && (
                  <Box>
                    {cradt.length > 0 ? (
                      cradt.map(renderUserItem)
                    ) : (
                      <Typography color="#94a3b8" py={4} textAlign="center">
                        Nenhum usuário CRADT registrado.
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>

        {/* Dialog: Change Role */}
        <Dialog
          open={roleDialogOpen}
          onClose={() => setRoleDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
        >
          <DialogTitle
            sx={{
              fontWeight: '800',
              pt: 3,
              pb: 1,
              color: '#0f172a',
              textAlign: 'center',
            }}
          >
            Definir Nova Função
          </DialogTitle>
          <DialogContent sx={{ pb: 1 }}>
            <Typography mb={3} color="#64748b" textAlign="center">
              Selecione a atribuição para <strong>{editedUser?.name}</strong>
            </Typography>
            <Grid container spacing={2}>
              {ROLES.map((role) => (
                <Grid size={{ xs: 12, sm: 4 }} key={role.value}>
                  <Box
                    onClick={() => setNewRole(role.value)}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: '2px solid',
                      borderColor:
                        newRole === role.value ? role.color : '#e2e8f0',
                      bgcolor: newRole === role.value ? role.bg : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: role.color,
                        bgcolor: role.bg,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: role.bg,
                        color: role.color,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {role.icon}
                    </Avatar>
                    <Typography
                      fontWeight="700"
                      color={newRole === role.value ? role.color : '#475569'}
                    >
                      {role.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
            <Button
              onClick={() => setRoleDialogOpen(false)}
              disabled={saving}
              sx={{
                color: '#64748b',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3,
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={saveRoleChange}
              variant="contained"
              disabled={saving}
              sx={{
                bgcolor: '#03017D',
                textTransform: 'none',
                borderRadius: 3,
                fontWeight: 'bold',
                px: 4,
                '&:hover': { bgcolor: '#02005A' },
              }}
            >
              {saving ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Confirmar Alteração'
              )}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Edit Name */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
        >
          <DialogTitle
            sx={{ fontWeight: '800', pt: 3, pb: 1, color: '#0f172a' }}
          >
            Editar Usuário
          </DialogTitle>
          <DialogContent>
            <Typography mb={3} color="#64748b">
              Atualize o nome de exibição de <strong>{editedUser?.name}</strong>
              .
            </Typography>
            <TextField
              fullWidth
              label="Nome Completo"
              variant="outlined"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setEditDialogOpen(false)}
              disabled={saving}
              sx={{
                color: '#64748b',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={saveEdit}
              variant="contained"
              disabled={saving}
              sx={{
                bgcolor: '#03017D',
                textTransform: 'none',
                borderRadius: 3,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#02005A' },
              }}
            >
              {saving ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Salvar Dados'
              )}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Delete User */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{ sx: { borderRadius: 4 } }}
        >
          <DialogTitle
            sx={{
              textAlign: 'center',
              fontWeight: '800',
              pt: 4,
              color: '#ef4444',
            }}
          >
            Remover Usuário
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            <Typography color="#64748b">
              Você está prestes a remover <strong>{editedUser?.name}</strong> do
              sistema. Esta ação não poderá ser desfeita.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={saving}
              sx={{
                color: '#64748b',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              variant="contained"
              disabled={saving}
              sx={{
                bgcolor: '#ef4444',
                textTransform: 'none',
                borderRadius: 3,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#dc2626' },
              }}
            >
              {saving ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Sim, remover'
              )}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ borderRadius: 3, fontWeight: 'bold' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Dialog: Add User */}
        {addDialogOpen && (
          <RegisterForm
            open={addDialogOpen}
            onClose={() => setAddDialogOpen(false)}
            onSubmitAction={async (data) => {
              await createUser(data);
            }}
            onSuccess={() => {
              setAddDialogOpen(false);
              showSnackbar('Usuário criado com sucesso!', 'success');
              loadUsers();
            }}
          />
        )}
      </ContentLayoutComponent>
    </Box>
  );
}
