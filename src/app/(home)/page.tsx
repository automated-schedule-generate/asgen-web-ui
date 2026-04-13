'use client';

import React from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Grid,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircleOutline as CheckIcon,
  Timer as TimerIcon,
  Devices as DevicesIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Storage as StorageIcon,
  AutoFixHigh as AutoFixHighIcon,
  CloudDownload as DownloadIcon,
} from '@mui/icons-material';

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      {/* 1. SEÇÃO HERO (BANNER AZUL) */}
      <Box
        sx={{
          background:
            'radial-gradient(circle at 75% 50%, #1A2980 0%, #03017D 100%)',
          color: '#fff',
          pt: { xs: 12, md: 20 },
          pb: { xs: 12, md: 20 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.8rem' },
                }}
              >
                Sistema Inteligente para Geração de Horários Acadêmicos
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 5,
                  opacity: 0.8,
                  maxWidth: '550px',
                  fontSize: '1.1rem',
                }}
              >
                Automatiza a criação de horários considerando restrições
                institucionais, disponibilidade docente e recursos físicos,
                utilizando algoritmos genéticos.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    textTransform: 'none',
                  }}
                >
                  Conhecer o ASGEN
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: '#1976d2',
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Acesso Antecipado
                </Button>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Box
                sx={{ filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.2))' }}
              >
                <Image
                  src="/images/asgen-logo-white.svg"
                  alt="ASgen Logo"
                  width={400}
                  height={400}
                  priority
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. SEÇÃO: O QUE É O ASGEN? */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                  position: 'relative',
                  height: '400px',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=800"
                  alt="Planejamento"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Paper
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  p: 2,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  zIndex: 2,
                }}
              >
                <Avatar sx={{ bgcolor: '#03017D' }}>
                  <TrendingUpIcon />
                </Avatar>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  +90% de Eficiência
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 800, letterSpacing: 2 }}
            >
              SOBRE NÓS
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: '#03017D', mb: 3 }}
            >
              O que é o ASGEN?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#555', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              O ASgen é um projeto desenvolvido no IFPE Campus Igarassu para
              solucionar a complexidade da alocação de horários. Utilizamos
              inteligência artificial para cruzar disponibilidades e
              infraestrutura.
            </Typography>
            <Box
              sx={{
                p: 3,
                bgcolor: '#FFF4E5',
                borderRadius: 4,
                borderLeft: '6px solid #FF9800',
                mb: 4,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: '#663C00', mb: 1 }}
              >
                ⚠️ O Problema Manual
              </Typography>
              <Typography variant="body2" color="#663C00">
                A criação de grades horárias consome semanas de trabalho e é
                propensa a erros humanos e conflitos de salas.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 3. SEÇÃO: COMO FUNCIONA */}
      <Box sx={{ bgcolor: '#F8FAFF', py: 15 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 800, mb: 8, color: '#03017D' }}
          >
            Como funciona o ASGEN?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <StorageIcon />,
                title: 'Configuração de Dados',
                step: '01',
              },
              {
                icon: <AutoFixHighIcon />,
                title: 'Execução do Algoritmo',
                step: '02',
              },
              { icon: <CheckIcon />, title: 'Análise e Ajustes', step: '03' },
              { icon: <DownloadIcon />, title: 'Exportação', step: '04' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 5,
                    height: '100%',
                    textAlign: 'center',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-10px)' },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#E8EDFF',
                      color: '#03017D',
                      mx: 'auto',
                      mb: 3,
                      width: 60,
                      height: 60,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 900,
                      color: '#03017D',
                      opacity: 0.2,
                      fontSize: '1.5rem',
                    }}
                  >
                    {item.step}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. SEÇÃO: POR QUE USAR? */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: 800, mb: 8, color: '#03017D' }}
        >
          Por que usar o ASGEN?
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              icon: <TimerIcon />,
              title: 'Economia de Tempo',
              desc: 'Reduz semanas de planejamento para poucos minutos.',
            },
            {
              icon: <DevicesIcon />,
              title: 'Multi-plataforma',
              desc: 'Acesse de qualquer lugar, seja desktop ou mobile.',
            },
            {
              icon: <TrendingUpIcon />,
              title: 'Otimização de Salas',
              desc: 'Garanta que nenhum recurso físico seja desperdiçado.',
            },
            {
              icon: <SchoolIcon />,
              title: 'Foco no Ensino',
              desc: 'Deixe a burocracia com a IA e foque na educação.',
            },
          ].map((feature, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid #eee',
                  borderRadius: 4,
                  height: '100%',
                }}
              >
                <Box sx={{ color: '#03017D', mb: 2 }}>{feature.icon}</Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 5. RODAPÉ */}
      <Box sx={{ bgcolor: '#010130', color: '#fff', pt: 10, pb: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={10}>
            <Grid item xs={12} md={4}>
              <Image
                src="/images/asgen-horizontal-light.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Typography sx={{ mt: 3, opacity: 0.6, fontSize: '0.9rem' }}>
                Desenvolvido como projeto acadêmico para o curso de Tecnologia
                em Sistemas para Internet do IFPE Campus Igarassu.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={6} sm={4}>
                  <Typography sx={{ fontWeight: 700, mb: 2 }}>Links</Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.6, mb: 1, cursor: 'pointer' }}
                  >
                    Sobre
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.6, mb: 1, cursor: 'pointer' }}
                  >
                    Documentação
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography sx={{ fontWeight: 700, mb: 2 }}>Legal</Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.6, mb: 1, cursor: 'pointer' }}
                  >
                    Privacidade
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.6, mb: 1, cursor: 'pointer' }}
                  >
                    Termos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography
            textAlign="center"
            variant="caption"
            sx={{ display: 'block', opacity: 0.4 }}
          >
            © 2026 ASgen - IFPE Igarassu. Desenvolvido por Pedro Vinícius.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
