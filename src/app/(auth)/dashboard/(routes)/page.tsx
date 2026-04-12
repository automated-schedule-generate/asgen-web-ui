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
          bgcolor: '#03017D',
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
            gap: 2,
            px: 2.5,
            py: 1,
            bgcolor: '#03017D',
            borderRadius: 999,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: 0.5,
              color: '#fff',
            }}
          >
            {userName || 'Usuário'}
          </Typography>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#fff',
              color: '#03017D',
              fontWeight: 700,
              fontSize: '0.95rem',
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
            bgcolor: '#03017D',
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
                bgcolor: activeTab === label ? '#020159' : '#03017D',
                borderRadius: 2,
                border: activeTab === label ? '2px solid #fff' : 'none',
                '&:hover': { bgcolor: '#020159' },
              }}
              aria-label={label}
            >
              <Icon />
            </IconButton>
          ))}
        </Box>

        <Container
          maxWidth="lg"
          sx={{
            py: 2,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 700, color: '#333' }}
          >
            Seja bem-vindo, {userName || 'Usuário'}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Painel de controle
          </Typography>

          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: 4,
              boxShadow: 2,
              p: 4,
              width: 'fit-content',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                justifyContent: 'center',
                gridAutoRows: '1fr',
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
            >
              {dashboardCards.map(({ title, icon: Icon }) => (
                <Card
                  key={title}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 'none',
                    border: '1px solid #e0e0e0',
                    overflow: 'hidden',
                    width: 200,
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardActionArea
                    sx={{
                      py: 3,
                      px: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      height: '100%',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#03017D',
                        width: 64,
                        height: 64,
                        color: '#fff',
                      }}
                    >
                      <Icon fontSize="large" />
                    </Avatar>
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'center' }}>
                      <Typography
                        variant="body2"
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
