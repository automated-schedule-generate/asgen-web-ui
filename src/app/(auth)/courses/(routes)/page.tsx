'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  List,
  ListItem,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ArrowBack,
  Search,
  KeyboardArrowRight,
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
  BusinessCenter as AdminIcon,
  SettingsSuggest as QualityIcon,
  Language as WebIcon,
  Terminal as InfoIcon,
  LocalShipping as LogIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const router = useRouter();
  
  // Estado para controlar qual curso está expandido
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const handleExpand = (courseName: string) => {
    setExpandedCourse(expandedCourse === courseName ? null : courseName);
  };

  // Dados mockados para exibição
  const courses = [
    { name: "Bacharelado em Administração (ADM)", icon: <AdminIcon sx={{ fontSize: 20 }} />, subjects: ["Gestão Financeira", "Marketing", "RH"] },
    { name: "Tecnologia em Gestão da Qualidade (TGQ)", icon: <QualityIcon sx={{ fontSize: 20 }} />, subjects: ["Normas ISO", "Estatística", "Auditoria"] },
    { name: "Tecnologia em Sistemas para Internet (TSI)", icon: <WebIcon sx={{ fontSize: 20 }} />, subjects: ["Desenvolvimento Web", "UX/UI", "Banco de Dados"] },
    { name: "Técnico em Informática para Internet (IPI)", icon: <InfoIcon sx={{ fontSize: 20 }} />, subjects: ["Redes", "Hardware", "Lógica"] },
    { name: "Técnico em Logística (LOG)", icon: <LogIcon sx={{ fontSize: 20 }} />, subjects: ["Armazenagem", "Transportes", "Suprimentos"] },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      
      {/* 🔙 BOTÃO VOLTAR (AZUL SÓLIDO) */}
      <Box sx={{ mb: 1.5 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBack sx={{ fontSize: '14px !important' }} />}
          onClick={() => router.back()}
          sx={{
            background: '#0B0A7A',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.7rem',
            textTransform: 'none',
            borderRadius: 1,
            px: 1.5,
            py: 0.2,
            minWidth: 'auto',
            boxShadow: 'none',
            '&:hover': { background: '#1413A3', boxShadow: 'none' },
          }}
        >
          Voltar
        </Button>
      </Box>

      {/* CARD PRINCIPAL */}
      <Box
        sx={{
          background: '#FFFFFF',
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          border: '1px solid #eceef2',
          boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
        }}
      >
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0B0A7A', mb: 0.2 }}>
            Cursos
          </Typography>
          <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
            Gerencie as disciplinas de cada curso
          </Typography>
        </Box>

        {/* CONTROLES SUPERIORES */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
          <Select
            size="small"
            defaultValue="Subsequente"
            sx={{
              bgcolor: '#FFFFFF',
              color: '#0B0A7A',
              borderRadius: 1.5,
              border: '1px solid #0B0A7A',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 32,
              '& .MuiSvgIcon-root': { color: '#0B0A7A', fontSize: 18 }
            }}
          >
            <MenuItem value="Subsequente">Subsequente</MenuItem>
            <MenuItem value="Integrado">Integrado</MenuItem>
            <MenuItem value="Superior">Superior</MenuItem>
          </Select>

          <TextField
            size="small"
            placeholder="Pesquisar..."
            sx={{ 
              bgcolor: '#E2E8F0', 
              borderRadius: 1.5, 
              flexGrow: 1, 
              maxWidth: { md: 220 },
              '& .MuiOutlinedInput-root': { 
                height: 32,
                fontSize: '0.75rem',
                '& fieldset': { border: 'none' } 
              } 
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ color: '#0B0A7A', fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            sx={{ 
              ml: { md: 'auto' }, 
              background: '#0B0A7A', 
              color: 'white', 
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'none',
              borderRadius: 1.5, 
              height: 32,
              boxShadow: 'none',
              '&:hover': { background: '#1413A3', boxShadow: 'none' } 
            }}
          >
            Novo curso
          </Button>
        </Box>

        {/* LISTA ACORDEÃO */}
        <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #eceef2' }}>
          <List disablePadding>
            {courses.map((course, index) => (
              <React.Fragment key={course.name}>
                <ListItem
                  sx={{
                    px: 2,
                    py: 1.2,
                    color: '#0B0A7A',
                    cursor: 'pointer',
                    borderBottom: expandedCourse === course.name ? 'none' : '1px solid #eceef2',
                    transition: 'all 0.2s',
                    '&:hover': { background: '#f8f9fa' },
                  }}
                  onClick={() => handleExpand(course.name)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(11, 10, 122, 0.08)',
                        color: '#0B0A7A'
                      }}
                    >
                      {course.icon}
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                      {course.name}
                    </Typography>
                  </Box>
                  
                  {/* LIXEIRA AZUL (FORA) */}
                  <Box sx={{ mr: 1 }} onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="Excluir Curso">
                      <IconButton size="small" sx={{ color: '#0B0A7A', p: 0.5 }}>
                        <DeleteIcon sx={{ fontSize: 19 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* SETA AZUL */}
                  <KeyboardArrowRight sx={{ 
                    color: '#0B0A7A',
                    fontSize: 20, 
                    transform: expandedCourse === course.name ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: '0.3s' 
                  }} />
                </ListItem>

                {/* CONTEÚDO EXPANSÍVEL (TABELA) */}
                <Collapse in={expandedCourse === course.name} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 2, background: '#fcfcfd', borderBottom: '1px solid #eceef2' }}>
                    
                    {/* BOTÃO NOVA DISCIPLINA (DENTRO) */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
                      <Button 
                        variant="contained"
                        size="small" 
                        startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                        sx={{ 
                          fontSize: '0.65rem', 
                          background: '#0B0A7A', 
                          color: 'white', 
                          textTransform: 'none', 
                          fontWeight: 600,
                          borderRadius: 1,
                          boxShadow: 'none',
                          '&:hover': { background: '#1413A3', boxShadow: 'none' }
                        }}
                      >
                        Nova Disciplina
                      </Button>
                    </Box>

                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 1 }}>
                      <Table size="small">
                        <TableHead sx={{ background: '#f1f3f7' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#0B0A7A' }}>Disciplina / Cadeira</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#0B0A7A' }}>Remover</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {course.subjects.map((subject) => (
                            <TableRow key={subject} hover>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>{subject}</TableCell>
                              <TableCell align="right" sx={{ py: 0.5 }}>
                                {/* LIXEIRA AZUL SUTIL NA TABELA */}
                                <IconButton size="small" sx={{ color: 'rgba(11, 10, 122, 0.6)', p: 0.3 }}>
                                  <DeleteIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}