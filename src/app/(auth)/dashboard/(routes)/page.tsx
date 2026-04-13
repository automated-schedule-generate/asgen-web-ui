'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Groups as GroupsIcon,
  Shield as ShieldIcon,
  Visibility as VisibilityIcon,
  Home as HomeIcon,
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

const sidebarItems = [
  { label: 'Home', icon: <HomeIcon sx={{ fontSize: 22 }} /> },
  { label: 'Cursos', icon: <SchoolIcon sx={{ fontSize: 22 }} /> },
  { label: 'Disciplinas', icon: <MenuBookIcon sx={{ fontSize: 22 }} /> },
  { label: 'Turmas', icon: <GroupsIcon sx={{ fontSize: 22 }} /> },
  { label: 'Gestão', icon: <ShieldIcon sx={{ fontSize: 22 }} /> },
  { label: 'Gerar grades', icon: <AutoFixHighIcon sx={{ fontSize: 22 }} /> },
  {
    label: 'Visualização das grades',
    icon: <VisibilityIcon sx={{ fontSize: 22 }} />,
  },
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
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = window.localStorage.getItem('userName');
      const email = window.localStorage.getItem('userEmail') || '';
      const rawName = storedName || (email ? email.split('@')[0] : 'Usuário');
      const formatted = formatName(rawName);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserName(formatted);
    }
  }, []); // Array vazio para rodar apenas uma vez

  const initials = userName.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#e8edf5',
        width: '100vw',
        overflowX: 'hidden',
      }}
    >
      <Box
        component="header"
        sx={{
          bgcolor: '#03017D',
          color: '#fff',
          px: 3,
          py: 1.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1100,
          width: '100%',
        }}
      >
        <Image
          src="/images/asgen-horizontal-light.svg"
          alt="ASgen"
          width={120}
          height={30}
          style={{ width: 'auto', height: '30px' }}
          priority
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: 'rgba(255,255,255,0.1)',
            px: 2,
            py: 0.5,
            borderRadius: 10,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {userName.toUpperCase()}
          </Typography>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#fff',
              color: '#03017D',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            {initials}
          </Avatar>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
        <Box
          component="nav"
          sx={{
            width: 70,
            bgcolor: '#03017D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
            gap: 2,
            flexShrink: 0,
          }}
        >
          {sidebarItems.map(({ label, icon }) => (
            <IconButton
              key={label}
              onClick={() => setActiveTab(label)}
              sx={{
                color: '#fff',
                bgcolor: activeTab === label ? '#020159' : 'transparent',
                borderRadius: 2,
                p: 1,
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 700, mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
              Seja bem-vindo, {userName}
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
              sx={{
                mb: 4,
                fontWeight: 700,
                color: '#444',
                textAlign: 'center',
              }}
            >
              Painel de controle
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: 'repeat(3, 1fr)',
                justifyItems: 'center',
              }}
            >
              {dashboardCards.map(({ title, icon }) => (
                <Card
                  key={title}
                  sx={{
                    borderRadius: 5,
                    border: '1px solid #f0f0f0',
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
                      sx={{
                        bgcolor: '#03017D',
                        width: 55,
                        height: 55,
                        mb: 1.5,
                      }}
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
      </Box>
    </Box>
  );
}
