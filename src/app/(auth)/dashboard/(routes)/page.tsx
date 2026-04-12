'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Groups as GroupsIcon,
  Shield as ShieldIcon,
  AutoStories as AutoStoriesIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

const dashboardCards = [
  { title: 'Cursos', icon: SchoolIcon },
  { title: 'Disciplinas', icon: MenuBookIcon },
  { title: 'Turmas', icon: GroupsIcon },
  { title: 'Gestão', icon: ShieldIcon },
  { title: 'Gerar grades', icon: AutoStoriesIcon },
  { title: 'Visualização das grades', icon: VisibilityIcon },
];

export default function DashboardPage() {
  const userName = 'Vera';

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          bgcolor: '#f4f6fa',
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Seja bem-vinda, {userName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Painel de controle
        </Typography>

        <Grid container spacing={3}>
          {dashboardCards.map(({ title, icon: Icon }) => (
            <Grid xs={12} sm={6} md={4} key={title}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, overflow: 'hidden' }}>
                <CardActionArea
                  sx={{
                    py: 5,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 64,
                      height: 64,
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
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
