'use client';

import React, { useState, useMemo } from 'react';
import {
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  KeyboardArrowRight,
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, type CourseType } from '../_schemas/course.schema';

interface CourseData {
  id: number;
  name: string;
  subjects: string[];
}

export default function CoursesPage() {
  // Inicializando diretamente no useState para evitar cascading renders no useEffect
  const [courses, setCourses] = useState<CourseData[]>([
    { id: 1, name: 'Bacharelado em Administração (ADM)', subjects: [] },
    { id: 2, name: 'Tecnologia em Gestão da Qualidade (TGQ)', subjects: [] },
    { id: 3, name: 'Tecnologia em Sistemas para Internet (TSI)', subjects: [] },
    { id: 4, name: 'Técnico em Informática para Internet (IPI)', subjects: [] },
    { id: 5, name: 'Técnico em Logística (LOG)', subjects: [] },
  ]);

  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [openModalSubject, setOpenModalSubject] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: number | null;
    type: 'course' | 'subject';
    subjectName?: string;
  }>({
    open: false,
    id: null,
    type: 'course',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingSubjects, setLoadingSubjects] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [newSubjectName, setNewSubjectName] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      class_time: '60',
      total_semesters: 1,
    },
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, courses]);

  const handleExpand = async (courseId: number, courseName: string) => {
    const isOpening = expandedCourse !== courseName;
    setExpandedCourse(isOpening ? courseName : null);

    if (isOpening) {
      const course = courses.find((c) => c.id === courseId);
      if (course && course.subjects.length === 0) {
        setLoadingSubjects(courseId);

        // Simulação de delay de rede
        setTimeout(() => {
          let specificSubjects: string[] = [];
          if (courseId === 1)
            specificSubjects = ['Gestão Financeira', 'Marketing', 'RH'];
          else if (courseId === 2)
            specificSubjects = ['Normas ISO', 'Estatística', 'Auditoria'];
          else if (courseId === 3)
            specificSubjects = [
              'Desenvolvimento Web',
              'UX/UI',
              'Banco de Dados',
            ];
          else if (courseId === 4)
            specificSubjects = ['Redes', 'Hardware', 'Lógica'];
          else specificSubjects = ['Armazenagem', 'Transportes', 'Suprimentos'];

          setCourses((prev) =>
            prev.map((c) =>
              c.id === courseId ? { ...c, subjects: specificSubjects } : c,
            ),
          );
          setLoadingSubjects(null);
        }, 800);
      }
    }
  };

  const onSubmitCourse = (data: CourseType) => {
    setCourses((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
        name: data.name,
        subjects: [],
      },
    ]);
    setOpenModalCourse(false);
    reset();
  };

  const executeDelete = () => {
    if (confirmDelete.type === 'course' && confirmDelete.id) {
      setCourses((prev) => prev.filter((c) => c.id !== confirmDelete.id));
    } else if (
      confirmDelete.type === 'subject' &&
      confirmDelete.id &&
      confirmDelete.subjectName
    ) {
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id === confirmDelete.id) {
            return {
              ...course,
              subjects: course.subjects.filter(
                (s) => s !== confirmDelete.subjectName,
              ),
            };
          }
          return course;
        }),
      );
    }
    setConfirmDelete({ open: false, id: null, type: 'course' });
  };

  const handleAddSubject = () => {
    if (!newSubjectName.trim()) return;
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === selectedCourseId) {
          return { ...course, subjects: [...course.subjects, newSubjectName] };
        }
        return course;
      }),
    );
    setNewSubjectName('');
    setOpenModalSubject(false);
  };

  return (
    <ContentLayoutComponent title="Cursos">
      <Typography
        variant="body2"
        sx={{ color: '#666', fontWeight: 500, mb: 3, display: 'block' }}
      >
        Gerencie as disciplinas de cada curso
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Select
          size="small"
          defaultValue="Subsequente"
          sx={{
            bgcolor: '#FFFFFF',
            color: '#0B0A7A',
            borderRadius: 1.5,
            border: '1px solid #0B0A7A',
            fontWeight: 700,
            fontSize: '0.75rem',
            height: 32,
            '& .MuiSvgIcon-root': { color: '#0B0A7A', fontSize: 18 },
          }}
        >
          <MenuItem value="Subsequente">Subsequente</MenuItem>
          <MenuItem value="Integrado">Integrado</MenuItem>
          <MenuItem value="Superior">Superior</MenuItem>
        </Select>

        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: '#E2E8F0',
            borderRadius: 1.5,
            flexGrow: 1,
            maxWidth: 220,
            '& .MuiOutlinedInput-root': {
              height: 32,
              fontSize: '0.75rem',
              fontWeight: 500,
              '& fieldset': { border: 'none' },
            },
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
          onClick={() => setOpenModalCourse(true)}
          sx={{
            background: '#0B0A7A',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'none',
            borderRadius: 1.5,
            height: 32,
            ml: 'auto',
            boxShadow: 'none',
            '&:hover': { background: '#1413A3' },
          }}
        >
          Novo curso
        </Button>
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #eceef2',
        }}
      >
        <List disablePadding>
          {filteredCourses.map((course) => {
            const isExpanded = expandedCourse === course.name;
            return (
              <React.Fragment key={course.id}>
                <ListItem
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    bgcolor: isExpanded ? '#0B0A7A' : 'transparent',
                    color: isExpanded ? '#fff' : '#0B0A7A',
                    borderBottom: isExpanded ? 'none' : '1px solid #eceef2',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: isExpanded ? '#0B0A7A' : '#f8f9fa',
                    },
                  }}
                  onClick={() => handleExpand(course.id, course.name)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isExpanded
                          ? 'rgba(255, 255, 255, 0.2)'
                          : 'rgba(11, 10, 122, 0.08)',
                        color: isExpanded ? '#fff' : '#0B0A7A',
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: 'inherit',
                        fontSize: '0.85rem',
                      }}
                    >
                      {course.name}
                    </Typography>
                  </Box>

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete({
                        open: true,
                        id: course.id,
                        type: 'course',
                      });
                    }}
                    sx={{ color: 'inherit', mr: 1 }}
                  >
                    <DeleteIcon sx={{ fontSize: 19 }} />
                  </IconButton>

                  <KeyboardArrowRight
                    sx={{
                      color: 'inherit',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: '0.3s',
                    }}
                  />
                </ListItem>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      p: 2,
                      background: '#fcfcfd',
                      borderBottom: '1px solid #eceef2',
                    }}
                  >
                    {loadingSubjects === course.id ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          py: 2,
                        }}
                      >
                        <CircularProgress size={24} sx={{ color: '#0B0A7A' }} />
                      </Box>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mb: 1.5,
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                            onClick={() => {
                              setSelectedCourseId(course.id);
                              setOpenModalSubject(true);
                            }}
                            sx={{
                              fontSize: '0.65rem',
                              background: '#0B0A7A',
                              textTransform: 'none',
                              fontWeight: 700,
                              borderRadius: 1,
                            }}
                          >
                            Nova Disciplina
                          </Button>
                        </Box>

                        <TableContainer
                          component={Paper}
                          elevation={0}
                          sx={{ border: '1px solid #eee', borderRadius: 1 }}
                        >
                          <Table size="small">
                            <TableHead sx={{ background: '#f1f3f7' }}>
                              <TableRow>
                                <TableCell
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#0B0A7A',
                                  }}
                                >
                                  Disciplina
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#0B0A7A',
                                  }}
                                >
                                  Remover
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {course.subjects.length > 0 ? (
                                course.subjects.map((subject: string) => (
                                  <TableRow key={subject} hover>
                                    <TableCell
                                      sx={{
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        color: '#444',
                                      }}
                                    >
                                      {subject}
                                    </TableCell>
                                    <TableCell align="right">
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          setConfirmDelete({
                                            open: true,
                                            id: course.id,
                                            type: 'subject',
                                            subjectName: subject,
                                          })
                                        }
                                        sx={{ color: '#0B0A7A' }}
                                      >
                                        <DeleteIcon sx={{ fontSize: 16 }} />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={2}
                                    align="center"
                                    sx={{
                                      py: 2,
                                      fontSize: '0.75rem',
                                      color: '#999',
                                    }}
                                  >
                                    Nenhuma disciplina encontrada.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    )}
                  </Box>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      {/* Modais permanecem iguais */}
      <Dialog
        open={openModalCourse}
        onClose={() => setOpenModalCourse(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
          Cadastrar Novo Curso
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome do Curso"
                  size="small"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" fullWidth error={!!errors.class_time}>
                <InputLabel>Tempo de Aula</InputLabel>
                <Controller
                  name="class_time"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Tempo de Aula">
                      <MenuItem value="45">45 minutos</MenuItem>
                      <MenuItem value="60">60 minutos</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.class_time?.message}</FormHelperText>
              </FormControl>
              <Controller
                name="total_semesters"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Semestres"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={!!errors.total_semesters}
                    helperText={errors.total_semesters?.message}
                  />
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenModalCourse(false)}
            sx={{ color: '#666', textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(onSubmitCourse)}
            variant="contained"
            sx={{
              background: '#0B0A7A',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Salvar Curso
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openModalSubject}
        onClose={() => setOpenModalSubject(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
          Nova Disciplina
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            label="Nome da Disciplina"
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenModalSubject(false)}
            sx={{ color: '#666', textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddSubject}
            variant="contained"
            sx={{
              background: '#0B0A7A',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ ...confirmDelete, open: false })}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#444' }}>
            Tem certeza que deseja excluir este{' '}
            {confirmDelete.type === 'course' ? 'curso' : 'item'}? Esta ação não
            pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setConfirmDelete({ ...confirmDelete, open: false })}
            sx={{ color: '#666', textTransform: 'none', fontWeight: 600 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={executeDelete}
            variant="contained"
            sx={{
              background: '#0B0A7A',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </ContentLayoutComponent>
  );
}
