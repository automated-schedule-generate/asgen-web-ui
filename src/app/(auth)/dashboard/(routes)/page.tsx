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
  AccountCircle as AccountCircleIcon,
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

export default function DashboardPage() {
  const [userName, setUserName] = useState(() => {
    if (typeof window === 'undefined') {
      return 'Usuário';
    }

    const storedName = window.localStorage.getItem('userName');
    if (storedName) {
      return storedName;
    }

    const defaultName = window.localStorage.getItem('userEmail')
      ? (window.localStorage.getItem('userEmail')?.split('@')[0] ?? '')
      : '';
    return defaultName || 'Usuário';
  });

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
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AccountCircleIcon />
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
            Seja bem-vinda, {userName || 'Usuário'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Painel de controle
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              justifyContent: 'center',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 240px))',
                md: 'repeat(3, minmax(0, 240px))',
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
                }}
              >
                <CardActionArea
                  sx={{
                    py: 4,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 56,
                      height: 56,
                      mb: 2,
                    }}
                  >
                    <Icon fontSize="large" />
                  </Avatar>
                  <CardContent sx={{ px: 2, py: 0 }}>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      sx={{ fontWeight: 600 }}
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
