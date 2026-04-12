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
  { label: 'Gestão', icon: ShieldIcon },
  { label: 'Gerar grades', icon: AutoStoriesIcon },
  { label: 'Visualização das grades', icon: VisibilityIcon },
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
  const [activeTab, setActiveTab] = useState('Home');
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component="header"
        sx={{
          bgcolor: '#2c5aa0',
          color: '#f7fafc',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: 0.5 }}
        >
          ASgen
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1,
            border: '2px solid rgba(247, 250, 252, 0.5)',
            borderRadius: 4,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              letterSpacing: 0.5,
            }}
          >
            {userName || 'Usuário'}
          </Typography>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#7db3e6',
              color: '#2c5aa0',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            {initials || 'U'}
          </Avatar>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, bgcolor: '#e8edf5' }}>
        <Box
          component="nav"
          sx={{
            width: 88,
            bgcolor: '#2c5aa0',
            color: '#f7fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
            gap: 2,
          }}
        >
          {sidebarItems.map(({ label, icon: Icon }) => (
            <IconButton
              key={label}
              onClick={() => setActiveTab(label)}
              sx={{
                color: '#f7fafc',
                bgcolor: activeTab === label ? '#1e3a7a' : '#2c5aa0',
                borderRadius: 2,
                border: activeTab === label ? '2px solid #fff' : 'none',
                '&:hover': { bgcolor: '#1e3a7a' },
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
              bgcolor: '#fff',
              borderRadius: 4,
              boxShadow: 2,
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
              Seja bem-vindo, {userName || 'Usuário'}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Painel de controle
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gap: 2,
                justifyContent: 'center',
                gridAutoRows: '1fr',
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 140px))',
                  sm: 'repeat(3, minmax(0, 140px))',
                  md: 'repeat(3, minmax(0, 160px))',
                },
              }}
            >
              {dashboardCards.map(({ title, icon: Icon }) => (
                <Card
                  key={title}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 1,
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: 160,
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardActionArea
                    sx={{
                      py: 2,
                      px: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: 1.5,
                      minHeight: 160,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#2c5aa0',
                        width: 48,
                        height: 48,
                        color: '#fff',
                      }}
                    >
                      <Icon fontSize="small" />
                    </Avatar>
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'center' }}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, color: '#333' }}
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
    </Box>
  );
}
