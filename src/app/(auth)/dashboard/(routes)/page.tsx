'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  Avatar,
} from '@mui/material';
import {
  School as SchoolIcon,
  Groups as GroupsIcon,
  Shield as ShieldIcon,
  Visibility as VisibilityIcon,
  AutoFixHigh as AutoFixHighIcon,
  SquareFoot as SquareFootIcon,
  Attribution as AttributionIcon,
  AutoMode as AutoModeIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';

const dashboardCards = [
  { title: 'Cursos', icon: <SchoolIcon sx={{ fontSize: 30 }} /> },
  { title: 'Disciplinas', icon: <SquareFootIcon sx={{ fontSize: 30 }} /> },
  { title: 'Turmas', icon: <GroupsIcon sx={{ fontSize: 30 }} /> },
  { title: 'Gestão de cargos', icon: <AdminPanelSettingsIcon sx={{ fontSize: 30 }} /> },
  { title: 'Gerar grades', icon: <AutoModeIcon sx={{ fontSize: 30 }} /> },
  { title: 'Visualização das grades',icon: <VisibilityIcon sx={{ fontSize: 30 }} />,},
  { title: 'Preferencias', icon: <AutoFixHighIcon sx={{ fontSize: 30 }} /> },
  { title: 'Professores', icon: <AttributionIcon sx={{ fontSize: 30 }} /> },
];

export default function DashboardPage() {
  const hora = new Date().getHours();
  let saudacao = 'boa noite';

  if (hora >= 5 && hora < 12) saudacao = 'bom dia';
  else if (hora >= 12 && hora < 18) saudacao = 'boa tarde';
  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 700, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
          Olá, {saudacao}
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          bgcolor: '#fff',
          borderRadius: 8,
          p: { xs: 3, md: 5 },
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 4, fontWeight: 700, color: '#444', textAlign: 'center' }}
        >
          Painel de controle
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            justifyItems: 'center',
          }}
        >
          {dashboardCards.map(({ title, icon }) => (
            <Card
              key={title}
              sx={{
                borderRadius: 5,
                border: '1px solid #eceef2',
                boxShadow: '0 4px 12px rgba(3,1,125,0.3)',
                width: '100%',
                maxWidth: '180px',
                aspectRatio: '1 / 1',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: '#03017D',
                  boxShadow: '0 4px 12px rgba(3,1,125,0.1)',
                },
              }}
            >
              <CardActionArea
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <Avatar
                  sx={{ bgcolor: '#03017D', width: 55, height: 55, mb: 1.5 }}
                >
                  {icon}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: '#333',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                  }}
                >
                  {title}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}
