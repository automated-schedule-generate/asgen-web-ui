'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Container,
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
  InputAdornment,
  Tooltip,
  Chip,
  Fade,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  DeleteOutline,
  Search,
  EditOutlined,
  ManageAccountsOutlined,
  AdminPanelSettings,
  School,
  SupportAgent,
} from '@mui/icons-material';

import type { IUser } from '@/interfaces/user.interface';
import {
  getAllUsers,
  updateUserRole,
  updateUserName,
  deleteUser,
} from '../_services/functions-manager.service';

const ROLES = [
  { value: 'Professor', icon: <School />, color: '#10b981', bg: '#ecfdf5' },
  {
    value: 'Coordenador',
    icon: <AdminPanelSettings />,
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  { value: 'CRADT', icon: <SupportAgent />, color: '#f59e0b', bg: '#fffbeb' },
];

export function FunctionsManager() {
  const [pesquisa, setPesquisa] = useState('');
  const [listaUsuarios, setListaUsuarios] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [utilizadorEncontrado, setUtilizadorEncontrado] =
    useState<IUser | null>(null);

  const [abaSelecionada, setAbaSelecionada] = useState(0);

  const [dialogFuncaoAberto, setDialogFuncaoAberto] = useState(false);
  const [dialogExclusaoAberto, setDialogExclusaoAberto] = useState(false);
  const [dialogEditarAberto, setDialogEditarAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [usuarioEditado, setUsuarioEditado] = useState<IUser | null>(null);
  const [novaFuncao, setNovaFuncao] = useState('');
  const [novoNome, setNovoNome] = useState('');

  const [snackbar, setSnackbar] = useState({
    visivel: false,
    texto: '',
    cor: 'info' as AlertColor,
  });

  const carregarUsuarios = useCallback(async () => {
    setLoading(true);
    setErro('');
    try {
      const usuarios = await getAllUsers();
      setListaUsuarios(usuarios);
    } catch {
      setErro(
        'Erro ao carregar usuários. Verifique a conexão e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregarUsuarios();
  }, [carregarUsuarios]);

  const getRoleConfig = (funcao: string) => {
    return ROLES.find((r) => r.value === funcao) || ROLES[0];
  };

  const coordenadores = useMemo(
    () => listaUsuarios.filter((u) => u.funcao === 'Coordenador'),
    [listaUsuarios],
  );
  const professores = useMemo(
    () => listaUsuarios.filter((u) => u.funcao === 'Professor'),
    [listaUsuarios],
  );
  const cradt = useMemo(
    () => listaUsuarios.filter((u) => u.funcao === 'CRADT'),
    [listaUsuarios],
  );

  const mostrarSnackbar = (texto: string, cor: AlertColor) =>
    setSnackbar({ texto, cor, visivel: true });
  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, visivel: false }));

  const buscarUtilizador = () => {
    const termo = pesquisa.toLowerCase().trim();
    if (!termo) {
      mostrarSnackbar('Digite um nome ou matrícula para pesquisar.', 'warning');
      return;
    }
    const encontrado = listaUsuarios.find(
      (u) =>
        u.nome.toLowerCase().includes(termo) || u.matricula.includes(termo),
    );
    if (encontrado) setUtilizadorEncontrado(encontrado);
    else {
      setUtilizadorEncontrado(null);
      mostrarSnackbar('Nenhum utilizador encontrado.', 'warning');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') buscarUtilizador();
  };

  const abrirDialogFuncao = (usuario: IUser) => {
    setUsuarioEditado(usuario);
    setNovaFuncao(usuario.funcao);
    setDialogFuncaoAberto(true);
  };

  const salvarAlteracaoFuncao = async () => {
    if (!usuarioEditado) return;
    setSalvando(true);
    try {
      await updateUserRole(usuarioEditado.id, novaFuncao);
      await carregarUsuarios();
      if (utilizadorEncontrado?.id === usuarioEditado.id) {
        setUtilizadorEncontrado((prev) =>
          prev ? { ...prev, funcao: novaFuncao } : null,
        );
      }
      mostrarSnackbar('Função atualizada com sucesso!', 'success');
      setDialogFuncaoAberto(false);
    } catch {
      mostrarSnackbar('Erro ao atualizar função.', 'error');
    } finally {
      setSalvando(false);
    }
  };

  const abrirDialogEditar = (usuario: IUser) => {
    setUsuarioEditado(usuario);
    setNovoNome(usuario.nome);
    setDialogEditarAberto(true);
  };

  const salvarEdicao = async () => {
    if (!usuarioEditado || !novoNome.trim()) return;
    setSalvando(true);
    try {
      await updateUserName(usuarioEditado.id, novoNome);
      await carregarUsuarios();
      if (utilizadorEncontrado?.id === usuarioEditado.id) {
        setUtilizadorEncontrado((prev) =>
          prev ? { ...prev, nome: novoNome } : null,
        );
      }
      mostrarSnackbar('Dados atualizados com sucesso!', 'success');
      setDialogEditarAberto(false);
    } catch {
      mostrarSnackbar('Erro ao atualizar dados do usuário.', 'error');
    } finally {
      setSalvando(false);
    }
  };

  const abrirDialogExclusao = (usuario: IUser) => {
    setUsuarioEditado(usuario);
    setDialogExclusaoAberto(true);
  };

  const confirmarExclusao = async () => {
    if (!usuarioEditado) return;
    setSalvando(true);
    try {
      await deleteUser(usuarioEditado.id);
      await carregarUsuarios();
      if (utilizadorEncontrado?.id === usuarioEditado.id)
        setUtilizadorEncontrado(null);
      mostrarSnackbar('Utilizador apagado.', 'error');
      setDialogExclusaoAberto(false);
    } catch {
      mostrarSnackbar('Erro ao apagar utilizador.', 'error');
    } finally {
      setSalvando(false);
    }
  };

  const renderUserItem = (usuario: IUser) => {
    const roleConfig = getRoleConfig(usuario.funcao);
    return (
      <Fade in timeout={500} key={usuario.id}>
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
              {usuario.nome.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="700" color="#1e293b">
                {usuario.nome}
              </Typography>
              <Typography variant="body2" color="#64748b">
                Matrícula: {usuario.matricula}
              </Typography>
            </Box>
            <Chip
              icon={roleConfig.icon}
              label={usuario.funcao}
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
                onClick={() => abrirDialogFuncao(usuario)}
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
                onClick={() => abrirDialogEditar(usuario)}
                sx={{
                  color: '#64748b',
                  bgcolor: '#f8fafc',
                  '&:hover': { color: '#0ea5e9', bgcolor: '#f0f9ff' },
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Apagar" arrow>
              <IconButton
                onClick={() => abrirDialogExclusao(usuario)}
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

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 6,
        p: { xs: 4, md: 6 },
        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
      }}
    >
      <Box mb={6} display="flex" alignItems="center" gap={2}>
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
            Gestão de Delegação de Funções
          </Typography>
          <Typography variant="body1" color="#64748b" mt={0.5}>
            Encontre usuários e gerencie seus cargos e permissões no sistema.
          </Typography>
        </Box>
      </Box>

      {erro && (
        <Alert
          severity="error"
          onClose={() => setErro('')}
          sx={{ mb: 4, borderRadius: 3 }}
        >
          {erro}
        </Alert>
      )}

      {/* Search Box */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 6,
          p: 1,
          bgcolor: '#f8fafc',
          borderRadius: 4,
          border: '1px solid #e2e8f0',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Pesquisar por nome ou matrícula..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 2, pr: 1 }}>
                <Search sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
          sx={{ '& input': { p: 2, fontSize: '1.05rem', color: '#334155' } }}
        />
        <Button
          variant="contained"
          onClick={buscarUtilizador}
          sx={{
            bgcolor: '#03017D',
            minWidth: '140px',
            height: '50px',
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            boxShadow: '0 4px 14px rgba(3,1,125,0.3)',
            mr: 1,
            '&:hover': {
              bgcolor: '#02005A',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(3,1,125,0.4)',
            },
            transition: 'all 0.2s',
          }}
        >
          Pesquisar
        </Button>
      </Box>

      {/* Search Result */}
      <Collapse in={!!utilizadorEncontrado}>
        {utilizadorEncontrado && (
          <Box mb={6}>
            <Typography
              variant="overline"
              fontWeight="700"
              color="#94a3b8"
              sx={{ ml: 1, letterSpacing: '0.1em' }}
            >
              RESULTADO DA BUSCA
            </Typography>
            {renderUserItem(utilizadorEncontrado)}
          </Box>
        )}
      </Collapse>

      {/* Lists Section */}
      <Box>
        <Tabs
          value={abaSelecionada}
          onChange={(_, val) => setAbaSelecionada(val)}
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
            <Box role="tabpanel" hidden={abaSelecionada !== 0}>
              {abaSelecionada === 0 && (
                <Box>
                  {coordenadores.length > 0 ? (
                    coordenadores.map(renderUserItem)
                  ) : (
                    <Typography color="#94a3b8" py={4} textAlign="center">
                      Nenhum coordenador registrado.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
            <Box role="tabpanel" hidden={abaSelecionada !== 1}>
              {abaSelecionada === 1 && (
                <Box>
                  {professores.length > 0 ? (
                    professores.map(renderUserItem)
                  ) : (
                    <Typography color="#94a3b8" py={4} textAlign="center">
                      Nenhum professor registrado.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
            <Box role="tabpanel" hidden={abaSelecionada !== 2}>
              {abaSelecionada === 2 && (
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

      {/* Change Role Dialog */}
      <Dialog
        open={dialogFuncaoAberto}
        onClose={() => setDialogFuncaoAberto(false)}
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
            Selecione a atribuição para <strong>{usuarioEditado?.nome}</strong>
          </Typography>
          <Grid container spacing={2}>
            {ROLES.map((role) => (
              <Grid item xs={12} sm={4} key={role.value}>
                <Box
                  onClick={() => setNovaFuncao(role.value)}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor:
                      novaFuncao === role.value ? role.color : '#e2e8f0',
                    bgcolor: novaFuncao === role.value ? role.bg : '#ffffff',
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
                    color={novaFuncao === role.value ? role.color : '#475569'}
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
            onClick={() => setDialogFuncaoAberto(false)}
            disabled={salvando}
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
            onClick={salvarAlteracaoFuncao}
            variant="contained"
            disabled={salvando}
            sx={{
              bgcolor: '#03017D',
              textTransform: 'none',
              borderRadius: 3,
              fontWeight: 'bold',
              px: 4,
              '&:hover': { bgcolor: '#02005A' },
            }}
          >
            {salvando ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Confirmar Alteração'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={dialogEditarAberto}
        onClose={() => setDialogEditarAberto(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: '800', pt: 3, pb: 1, color: '#0f172a' }}>
          Editar Usuário
        </DialogTitle>
        <DialogContent>
          <Typography mb={3} color="#64748b">
            Atualize o nome de exibição de{' '}
            <strong>{usuarioEditado?.nome}</strong>.
          </Typography>
          <TextField
            fullWidth
            label="Nome Completo"
            variant="outlined"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDialogEditarAberto(false)}
            disabled={salvando}
            sx={{ color: '#64748b', textTransform: 'none', fontWeight: 'bold' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={salvarEdicao}
            variant="contained"
            disabled={salvando}
            sx={{
              bgcolor: '#03017D',
              textTransform: 'none',
              borderRadius: 3,
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#02005A' },
            }}
          >
            {salvando ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Salvar Dados'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog
        open={dialogExclusaoAberto}
        onClose={() => setDialogExclusaoAberto(false)}
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
            Você está prestes a apagar <strong>{usuarioEditado?.nome}</strong>{' '}
            do sistema. Esta ação não poderá ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={() => setDialogExclusaoAberto(false)}
            disabled={salvando}
            sx={{ color: '#64748b', textTransform: 'none', fontWeight: 'bold' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmarExclusao}
            variant="contained"
            disabled={salvando}
            sx={{
              bgcolor: '#ef4444',
              textTransform: 'none',
              borderRadius: 3,
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#dc2626' },
            }}
          >
            {salvando ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Sim, apagar'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.visivel}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.cor}
          variant="filled"
          sx={{ borderRadius: 3, fontWeight: 'bold' }}
        >
          {snackbar.texto}
        </Alert>
      </Snackbar>
    </Container>
  );
}
