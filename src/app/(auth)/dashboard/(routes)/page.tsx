'use client';

import {
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  Avatar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user.context';
import { navigationMenuItems } from '../../_constants/navigation-menu.constant';

const dashboardCards = navigationMenuItems.filter(
  (v) => v.path !== '/dashboard',
);

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUser();
  const hora = new Date().getHours();
  let saudacao = 'Boa noite';
  const userName = user?.name?.split(' ')[0] ?? 'Usuário';

  if (hora >= 5 && hora < 12) saudacao = 'Bom dia';
  else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 700, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
          Olá, {saudacao} {userName}
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
          {dashboardCards.map(({ text, icon, path }) => (
            <Card
              key={text}
              onClick={() => router.push(path)}
              sx={{
                borderRadius: 5,
                border: '1px solid #eceef2',
                boxShadow: '0 3px 12px rgba(3,1,125,0.3)',
                width: '100%',
                maxWidth: '180px',
                aspectRatio: '1 / 1',
                transition: 'all 0.2s',
                cursor: 'pointer',
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
                  {text}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}
