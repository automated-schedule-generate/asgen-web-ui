'use client';
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Groups as GroupsIcon,
  Shield as ShieldIcon,
  AutoStories as AutoStoriesIcon,
  Visibility as VisibilityIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const dashboardCards = [
  { title: 'Cursos', icon: SchoolIcon },
  { title: 'Disciplinas', icon: MenuBookIcon },
  { title: 'Turmas', icon: GroupsIcon },
  { title: 'Gestão', icon: ShieldIcon },
  { title: 'Gerar grades', icon: AutoStoriesIcon },
  { title: 'Visualização das grades', icon: VisibilityIcon },
];

const sidebarItems = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Cursos', icon: SchoolIcon },
  { label: 'Disciplinas', icon: MenuBookIcon },
  { label: 'Turmas', icon: GroupsIcon },
];

const formatName = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map(
      (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`,
    )
    .join(' ');

export default function DashboardPage() {
  const [userName] = useState(() => {
    if (typeof window === 'undefined') {
      return 'Usuário';
    }

    const storedName = window.localStorage.getItem('userName');
    if (storedName) {
      return formatName(storedName);
    }

    const email = window.localStorage.getItem('userEmail') || '';
    const defaultName = email ? email.split('@')[0] : '';
    return defaultName ? formatName(defaultName) : 'Usuário';
  });

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#e8edf5' }}>
      <Box
        component="nav"
        sx={{
          width: 88,
          bgcolor: '#1f3650',
          color: '#f7fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
          gap: 2,
        }}
      >
        <Avatar
          sx={{ bgcolor: '#fff', color: '#1f3650', width: 48, height: 48 }}
        >
          AS
        </Avatar>
        {sidebarItems.map(({ label, icon: Icon }) => (
          <IconButton
            key={label}
            sx={{
              color: '#f7fafc',
              bgcolor: '#1f3650',
              borderRadius: 2,
              '&:hover': { bgcolor: '#2c4a6b' },
            }}
            aria-label={label}
          >
            <Icon />
          </IconButton>
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ py: 3, px: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ASgen
          </Typography>
          <Box
            sx={{
              bgcolor: 'background.paper',
              px: 2,
              py: 1,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              boxShadow: 1,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                color: '#fff',
              }}
            >
              {initials || 'U'}
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {userName || 'Usuário'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 4,
            boxShadow: 2,
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
            Seja bem-vindo, {userName || 'Usuário'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Painel de controle
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              justifyContent: 'center',
              gridAutoRows: '1fr',
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 180px))',
                sm: 'repeat(3, minmax(0, 180px))',
                md: 'repeat(3, minmax(0, 220px))',
              },
            }}
          >
            {dashboardCards.map(({ title, icon: Icon }) => (
              <Card
                key={title}
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  overflow: 'hidden',
                  width: '100%',
                  maxWidth: 220,
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea
                  sx={{
                    py: 4,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 3,
                    minHeight: 220,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#000',
                      width: 56,
                      height: 56,
                      color: '#fff',
                    }}
                  >
                    <Icon fontSize="medium" />
                  </Avatar>
                  <CardContent sx={{ px: 2, py: 0, textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: '#333' }}
                    >
                      {title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
