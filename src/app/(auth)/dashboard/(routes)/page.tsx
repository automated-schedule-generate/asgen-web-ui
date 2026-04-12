'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Divider,
  Card,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface SchoolClass {
  id: string | number;
  course_semester: number;
  course_id: string;
  turn: string;
}

interface Subject {
  id: string | number;
  name: string;
}

interface Course {
  id: string | number;
  name: string;
}

export default function DashboardPage() {
  const [tabValue, setTabValue] = useState(0);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const uppercaseFirstLetter = (text: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Olá, {uppercaseFirstLetter('usuario')}!
      </Typography>

      <Box
        sx={{
          width: '100%',
          mt: 3,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Turmas" />
          <Tab label="Disciplinas" />
          <Tab label="Cursos" />
        </Tabs>
        <Divider />

        <Box sx={{ p: 1, minHeight: '30vh' }}>
          {/* ABA 0: TURMAS */}
          {tabValue === 0 &&
            classes.map((item) => (
              <Box key={item.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    boxShadow: 0,
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}>
                    {item.course_semester}º período - {item.course_id} -{' '}
                    {item.turn}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
                <Divider />
              </Box>
            ))}

          {/* ABA 1: DISCIPLINAS */}
          {tabValue === 1 &&
            subjects.map((item) => (
              <Box key={item.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    boxShadow: 0,
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}>{item.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
                <Divider />
              </Box>
            ))}

          {/* ABA 2: CURSOS */}
          {tabValue === 2 &&
            courses.map((item) => (
              <Box key={item.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    boxShadow: 0,
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}>{item.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
                <Divider />
              </Box>
            ))}
        </Box>
      </Box>
    </Container>
  );
}
