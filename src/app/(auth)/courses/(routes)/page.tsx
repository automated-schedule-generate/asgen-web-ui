'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
import { useForm, Controller, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, type CourseType } from '../_schemas/course.schema';
import {
  getAllCoursesClient,
  createCourseClient,
  deleteCourseClient,
} from '../_services/courses.client.service';

interface Subject {
  id: string;
  name?: string;
  titulo?: string;
  nome?: string;
}

interface CourseData {
  id: string;
  name: string;
  total_semesters: number;
  class_time: string;
  subjects?: Subject[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [loadingInitial, setLoadingInitial] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseType>({
    resolver: zodResolver(courseSchema) as unknown as Resolver<CourseType>,
    defaultValues: {
      name: '',
      class_time: '45',
      total_semesters: 1,
    } as CourseType,
  });

  const loadData = async () => {
    try {
      const response = await getAllCoursesClient();
      const rawData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.items)
            ? response.data.items
            : [];

      const normalizedData: CourseData[] = rawData.map(
        (item: Record<string, unknown>) => ({
          id: String(item.id || item._id || item.uuid || Math.random()),
          name: String(item.name || item.nome || item.titulo || 'Sem Nome'),
          total_semesters: Number(item.total_semesters || item.semestres || 0),
          class_time: String(item.class_time || item.tempo_aula || '45'),
          subjects: (item.subjects ||
            item.assuntos ||
            item.disciplinas ||
            []) as Subject[],
        }),
      );

      setCourses(normalizedData);
    } catch (err) {
      console.error(err);
      setCourses([]);
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      (course.name || '').toLowerCase().includes(activeSearch.toLowerCase()),
    );
  }, [activeSearch, courses]);

  const handleSearchClick = () => {
    setActiveSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleExpand = (courseId: string) => {
    const isOpening = expandedCourse !== courseId;
    setExpandedCourse(isOpening ? courseId : null);
  };

  const onSubmitCourse: SubmitHandler<CourseType> = async (data) => {
    try {
      const response = await createCourseClient(data);
      if (response) {
        await loadData();
        setSearchTerm('');
        setActiveSearch('');
      }
      setOpenModalCourse(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const executeDelete = async () => {
    if (!confirmDelete.id) return;
    try {
      await deleteCourseClient(confirmDelete.id);
      setCourses((prev) => prev.filter((c) => c.id !== confirmDelete.id));
    } catch (err) {
      console.error(err);
    } finally {
      setConfirmDelete({ open: false, id: null });
    }
  };

  if (loadingInitial) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#0B0A7A' }} />
      </Box>
    );
  }

  return (
    <ContentLayoutComponent title="Cursos">
      <Box sx={{ width: '100%', mt: 2 }}>
        <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
          Gerencie os cursos e suas respectivas disciplinas.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TextField
            size="small"
            placeholder="Pesquisar curso..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === '') setActiveSearch('');
            }}
            onKeyDown={handleKeyPress}
            sx={{
              bgcolor: '#E2E8F0',
              borderRadius: 1.5,
              flexGrow: 1,
              maxWidth: 300,
              '& fieldset': { border: 'none' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearchClick}
                    size="small"
                    sx={{ color: '#0B0A7A' }}
                  >
                    <Search sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModalCourse(true)}
            sx={{
              background: '#0B0A7A',
              textTransform: 'none',
              borderRadius: 1.5,
              ml: 'auto',
              fontWeight: 700,
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
            bgcolor: '#fff',
          }}
        >
          <List disablePadding>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => {
                const isExpanded = expandedCourse === course.id;
                return (
                  <React.Fragment key={course.id}>
                    <ListItem
                      sx={{
                        px: 2,
                        py: 1.5,
                        cursor: 'pointer',
                        bgcolor: isExpanded ? '#0B0A7A' : 'transparent',
                        color: isExpanded ? '#fff' : '#0B0A7A',
                        transition: '0.3s ease',
                        borderBottom: isExpanded ? 'none' : '1px solid #eceef2',
                        '&:hover': {
                          background: isExpanded ? '#0B0A7A' : '#f8f9fa',
                        },
                      }}
                      onClick={() => handleExpand(course.id)}
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
                          sx={{ fontWeight: 700, color: 'inherit' }}
                        >
                          {course.name}
                        </Typography>
                      </Box>

                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete({ open: true, id: course.id });
                        }}
                        sx={{ color: 'inherit', mr: 1 }}
                      >
                        <DeleteIcon sx={{ fontSize: 19 }} />
                      </IconButton>

                      <KeyboardArrowRight
                        sx={{
                          transform: isExpanded
                            ? 'rotate(90deg)'
                            : 'rotate(0deg)',
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
                        <TableContainer
                          component={Paper}
                          elevation={0}
                          sx={{ border: '1px solid #eee' }}
                        >
                          <Table size="small">
                            <TableHead sx={{ background: '#f1f3f7' }}>
                              <TableRow>
                                <TableCell
                                  sx={{ fontWeight: 700, color: '#0B0A7A' }}
                                >
                                  Disciplina
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ fontWeight: 700, color: '#0B0A7A' }}
                                >
                                  Ação
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {course.subjects && course.subjects.length > 0 ? (
                                course.subjects.map((sub) => (
                                  <TableRow
                                    key={sub.id || Math.random().toString()}
                                    hover
                                  >
                                    <TableCell>
                                      {sub.name || sub.titulo || sub.nome}
                                    </TableCell>
                                    <TableCell align="right">
                                      <IconButton
                                        size="small"
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
                                    sx={{ py: 2, color: '#999' }}
                                  >
                                    Nenhuma disciplina vinculada.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Collapse>
                  </React.Fragment>
                );
              })
            ) : (
              <Box sx={{ p: 4, textAlign: 'center', color: '#999' }}>
                Nenhum curso encontrado.
              </Box>
            )}
          </List>
        </Box>
      </Box>

      <Dialog
        open={openModalCourse}
        onClose={() => setOpenModalCourse(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
          Novo Curso
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
                      <MenuItem value="45">45 min</MenuItem>
                      <MenuItem value="60">60 min</MenuItem>
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
                    error={!!errors.total_semesters}
                    helperText={errors.total_semesters?.message}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10) || 0)
                    }
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
            sx={{ background: '#0B0A7A', textTransform: 'none' }}
          >
            Salvar Curso
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, id: null })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Deseja realmente excluir este curso?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setConfirmDelete({ open: false, id: null })}
            sx={{ color: '#666', textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={executeDelete}
            variant="contained"
            sx={{ background: '#0B0A7A', textTransform: 'none' }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </ContentLayoutComponent>
  );
}
