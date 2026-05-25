'use client';

import React, { useState } from 'react';
import {
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'João Silva', email: 'joao.silva@email.com', cpf: '123.456.789-00', role: 'Professor' },
  { id: '2', name: 'Maria Santos', email: 'maria.santos@email.com', cpf: '987.654.321-00', role: 'Coordenador' },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', cpf: '456.789.123-00', role: 'Administrador' },
  { id: '4', name: 'Ana Costa', email: 'ana.costa@email.com', cpf: '321.654.987-00', role: 'Professor' },
  { id: '5', name: 'Carlos Lima', email: 'carlos.lima@email.com', cpf: '789.123.456-00', role: 'Coordenador de Curso' },
];

const roleColors: Record<string, string> = {
  'Professor': '#1976d2',
  'Coordenador': '#388e3c',
  'Administrador': '#d32f2f',
  'Coordenador de Curso': '#7b1fa2',
  'CRADT': '#f57c00',
  'DEN': '#0097a7',
};

export function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState(0);
  const [users] = useState<User[]>(mockUsers);

  const tabs = ['Todos', 'Professor', 'Coordenador de Curso', 'CRADT', 'DEN'];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cpf.includes(searchTerm);

    const matchesFilter =
      filterTab === 0 || user.role === tabs[filterTab];

    return matchesSearch && matchesFilter;
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setFilterTab(newValue);
  };

  return (
    <ContentLayoutComponent title="Gestão de Usuários">
      <SearchBarComponent
        placeholder="Buscar usuário por nome, e-mail ou CPF..."
        onSearch={setSearchTerm}
      />

      <Tabs value={filterTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Função</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    Nenhum usuário encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.cpf}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      sx={{
                        backgroundColor: roleColors[user.role] || '#757575',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" size="small">
                      <Edit />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ContentLayoutComponent>
  );
}

