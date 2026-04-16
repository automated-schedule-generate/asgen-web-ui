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
  MenuBook as MenuBookIcon,
  Groups as GroupsIcon,
  Shield as ShieldIcon,
  Visibility as VisibilityIcon,
  AutoFixHigh as AutoFixHighIcon,
} from '@mui/icons-material';

const dashboardCards = [
  { title: 'Cursos', icon: <SchoolIcon sx={{ fontSize: 30 }} /> },
  { title: 'Disciplinas', icon: <MenuBookIcon sx={{ fontSize: 30 }} /> },
  { title: 'Turmas', icon: <GroupsIcon sx={{ fontSize: 30 }} /> },
  { title: 'Gestão', icon: <ShieldIcon sx={{ fontSize: 30 }} /> },
  { title: 'Gerar grades', icon: <AutoFixHighIcon sx={{ fontSize: 30 }} /> },
  {
    title: 'Visualização das grades',
    icon: <VisibilityIcon sx={{ fontSize: 30 }} />,
  },
];

export default function DashboardPage() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        minHeight: '100vh',
        bgcolor: '#e8edf5',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 700, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
          Seja bem-vindo
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          bgcolor: '#fff',
          borderRadius: 8,
          p: { xs: 3, md: 5 },
          maxWidth: '700px !important',
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
                boxShadow: 'none',
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
    </Box>
  );
}
