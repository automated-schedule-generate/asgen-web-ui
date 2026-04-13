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
          flexWrap: 'wrap',
          gap: 2,
          boxShadow: 2,
        }}
      >
        <Image
          src="/images/asgen-horizontal-light.svg"
          alt="ASgen"
          width={160}
          height={40}
          style={{ width: 'auto', height: '40px', maxWidth: '160px' }}
        />
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
            flexShrink: 0,
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
            py: 2.5,
            gap: 1.25,
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
                p: 1.25,
                minWidth: 0,
              }}
              aria-label={label}
            >
              <Icon sx={{ fontSize: 26 }} />
            </IconButton>
          ))}
        </Box>

        <Container
          maxWidth="lg"
          sx={{
            flex: 1, // Faz ocupar o espaço restante
            my: 4, // Margem em cima e embaixo para não colar nas bordas
            mx: 'auto',
            bgcolor: '#fff', // Fundo branco do painel
            borderRadius: 4, // Bordas arredondadas
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Sombra suave
            p: { xs: 2, md: 4 }, // Espaçamento interno responsivo
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 1, fontWeight: 700, color: '#333', textAlign: 'center' }}
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

          {/* O Grid de cards agora fica direto aqui dentro */}
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              width: '100%',
              justifyContent: 'center',
              gridTemplateColumns: {
                xs: 'repeat(1, minmax(200px, 1fr))',
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
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 2 },
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
                  <Avatar sx={{ bgcolor: '#03017D', width: 56, height: 56 }}>
                    <Icon fontSize="large" />
                  </Avatar>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
