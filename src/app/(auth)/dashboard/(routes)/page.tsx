'use client';
import React, { useState } from 'react';
import Image from 'next/image';
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
    if (typeof window === 'undefined') return 'Usuário';
    const storedName = window.localStorage.getItem('userName');
    if (storedName) return formatName(storedName);
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#e8edf5',
      }}
    >
      {/* HEADER SUPERIOR */}
      <Box
        component="header"
        sx={{
          bgcolor: '#03017D',
          color: '#fff',
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1100,
          boxShadow: 3,
        }}
      >
        <Image
          src="/images/asgen-horizontal-light.svg"
          alt="ASgen"
          width={140}
          height={35}
          style={{ width: 'auto', height: '35px' }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: 'rgba(255,255,255,0.1)',
            px: 2,
            py: 0.5,
            borderRadius: 10,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, textTransform: 'uppercase' }}
          >
            {userName}
          </Typography>
          <Avatar
            sx={{
              width: 35,
              height: 35,
              bgcolor: '#fff',
              color: '#03017D',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            {initials}
          </Avatar>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR LATERAL */}
        <Box
          component="nav"
          sx={{
            width: 80,
            bgcolor: '#03017D',
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
                color: '#fff',
                bgcolor: activeTab === label ? '#020159' : 'transparent',
                borderRadius: 2,
                border: activeTab === label ? '1px solid #fff' : 'none',
                '&:hover': { bgcolor: '#020159' },
                p: 1.5,
              }}
              aria-label={label}
            >
              <Icon sx={{ fontSize: 24 }} />
            </IconButton>
          ))}
        </Box>

        {/* CONTEÚDO PRINCIPAL */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* TÍTULO FORA DO CARD (ALINHADO À ESQUERDA) */}
          <Box sx={{ maxWidth: 1100, width: '100%', mx: 'auto', mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#333',
                fontSize: { xs: '1.5rem', md: '1.8rem' },
              }}
            >
              Seja bem-vindo, {userName}
            </Typography>
          </Box>

          {/* LAYOUT BRANCO (CONTAINER DOS CARDS) */}
          <Container
            maxWidth="lg"
            sx={{
              bgcolor: '#fff',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              p: { xs: 3, md: 5 },
              mx: 'auto',
              flex: 1,
              maxWidth: '1100px !important',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 4,
                fontWeight: 600,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
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
              }}
            >
              {dashboardCards.map(({ title, icon: Icon }) => (
                <Card
                  key={title}
                  sx={{
                    borderRadius: 3,
                    border: '1px solid #eee',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      borderColor: '#03017D',
                    },
                  }}
                >
                  <CardActionArea
                    sx={{
                      py: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#03017D',
                        width: 60,
                        height: 60,
                        boxShadow: '0 4px 10px rgba(3, 1, 125, 0.2)',
                      }}
                    >
                      <Icon fontSize="large" />
                    </Avatar>
                    <CardContent sx={{ p: 0 }}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, color: '#333' }}
                      >
                        {title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
