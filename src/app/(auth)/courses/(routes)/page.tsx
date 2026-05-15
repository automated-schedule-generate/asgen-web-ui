'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  List,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  Collapse,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
} from '@mui/material';
import {
  Search,
  Add as AddIcon,
  FilterList as FilterIcon,
  InboxOutlined,
  DeleteOutline as DeleteIcon,
  KeyboardArrowRight,
  School as SchoolIcon,
} from '@mui/icons-material';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { Controller } from 'react-hook-form';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { courseSchema, type CourseType } from '../_schemas/course.schema';
import { CourseData, Subject } from '../_types/course.types';

import {
  getAllCourses,
  createCourse,
  deleteCourse,
  getSubjectsByCourse,
} from '../_services/courses.service';

type RawCourse = Record<string, unknown>;

function normalizeCourse(item: RawCourse): CourseData {
  const record = item as Record<string, unknown>;
  return {
    id: String(record.id ?? record._id ?? record.uuid ?? Math.random()),
    name: String(record.name ?? record.nome ?? record.titulo ?? 'Sem Nome'),
    total_semesters: Number(record.total_semesters ?? record.semestres ?? 0),
    class_time: String(record.class_time ?? record.tempo_aula ?? '45'),
    type: (record.type ?? record.modalidade ?? 'OUTRO') as CourseData['type'],
    subjects: [],
  };
}

interface CourseItemProps {
  course: CourseData;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  subjects: Subject[];
  subjectsLoading: boolean;
  index: number;
}

function CourseItem({
  course,
  isExpanded,
  onToggle,
  onDelete,
  subjects,
  subjectsLoading,
  index,
}: CourseItemProps) {
  const typeColor =
    { INTEGRADO: '#2E7D32', SUBSEQUENTE: '#ED6C02', SUPERIOR: '#1976D2' }[
      course.type as string
    ] || '#757575';
  const isEven = index % 2 === 0;

  return (
    <Box sx={{ borderBottom: '2px solid #cbd5e1' }}>
      <ListItem
        onClick={onToggle}
        sx={{
          py: 1.8,
          px: 2,
          cursor: 'pointer',
          bgcolor: isExpanded ? '#0B0A7A' : isEven ? '#ffffff' : '#f8fafc',
          color: isExpanded ? '#fff' : '#0B0A7A',
          transition: 'all 0.2s ease',
          borderLeft: isExpanded
            ? '6px solid #3b82f6'
            : '6px solid transparent',
          '&:hover': { bgcolor: isExpanded ? '#0B0A7A' : '#f1f5f9' },
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}
        >
          <SchoolIcon sx={{ fontSize: 20, opacity: 0.8 }} />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: '0.9rem' }}
            >
              {course.name}
            </Typography>
            <Chip
              label={course.type}
              size="small"
              sx={{
                height: 16,
                fontSize: '0.6rem',
                fontWeight: 700,
                mt: 0.5,
                bgcolor: isExpanded ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: isExpanded ? '#fff' : typeColor,
                borderColor: isExpanded ? '#fff' : typeColor,
              }}
              variant="outlined"
            />
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(course.id);
          }}
          sx={{ color: 'inherit', mr: 1 }}
        >
          <DeleteIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <KeyboardArrowRight
          sx={{
            transform: isExpanded ? 'rotate(90deg)' : '0',
            transition: '0.3s',
          }}
        />
      </ListItem>

      <Collapse in={isExpanded} unmountOnExit>
        <Box sx={{ p: 2, bgcolor: '#f1f5f9' }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: '1px solid #cbd5e1', borderRadius: 1.5 }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: '#e2e8f0' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, py: 1, color: '#0B0A7A' }}>
                    Disciplina
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 800, py: 1, color: '#0B0A7A' }}
                  >
                    Ação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjectsLoading ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                      <CircularProgress
                        size={24}
                        thickness={5}
                        sx={{ color: '#0B0A7A' }}
                      />
                    </TableCell>
                  </TableRow>
                ) : subjects && subjects.length > 0 ? (
                  subjects.map((sub, idx) => (
                    <TableRow key={sub.id || idx} hover>
                      <TableCell sx={{ py: 1, fontWeight: 500 }}>
                        {sub.name || sub.nome || sub.titulo}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="error">
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
                      sx={{ py: 2, color: '#64748b' }}
                    >
                      Nenhuma disciplina vinculada encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Collapse>
    </Box>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [courseSubjects, setCourseSubjects] = useState<
    Record<string, Subject[]>
  >({});
  const [courseSubjectsLoading, setCourseSubjectsLoading] = useState<
    Record<string, boolean>
  >({});
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('TODOS');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormWithZod(courseSchema, {
    defaultValues: { name: '', class_time: '45', total_semesters: 1 },
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getAllCourses();
      const raw =
        res?.data?.items || res?.items || (Array.isArray(res) ? res : []);
      setCourses(raw.map((item: RawCourse) => normalizeCourse(item)));
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExpand = async (courseId: string) => {
    const isOpening = expandedCourse !== courseId;
    setExpandedCourse(isOpening ? courseId : null);

    if (isOpening && !courseSubjects[courseId]) {
      setCourseSubjectsLoading((prev) => ({ ...prev, [courseId]: true }));
      try {
        const res = await getSubjectsByCourse(courseId);

        const list = res?.data?.items || res?.items || res || [];

        setCourseSubjects((prev) => ({ ...prev, [courseId]: list }));
      } catch (e) {
        console.error('Erro ao carregar disciplinas:', e);
        setCourseSubjects((prev) => ({ ...prev, [courseId]: [] }));
      } finally {
        setCourseSubjectsLoading((prev) => ({ ...prev, [courseId]: false }));
      }
    }
  };

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          c.name.toLowerCase().includes(activeSearch.toLowerCase()) &&
          (typeFilter === 'TODOS' || c.type === typeFilter),
      ),
    [activeSearch, typeFilter, courses],
  );

  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const onSubmit = async (data: CourseType) => {
    try {
      await createCourse(data);
      await loadData();
      setOpenModalCourse(false);
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este curso?')) {
      try {
        await deleteCourse(id);
        await loadData();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={50} sx={{ color: '#0B0A7A' }} />
      </Box>
    );

  return (
    <ContentLayoutComponent title="Cursos">
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Select
            size="small"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            startAdornment={
              <FilterIcon sx={{ fontSize: 18, mr: 0.5, color: '#0B0A7A' }} />
            }
            sx={{
              bgcolor: '#f1f5f9',
              borderRadius: 2,
              minWidth: 160,
              height: 38,
              color: '#0B0A7A',
              fontWeight: 600,
            }}
          >
            <MenuItem value="TODOS">Todas Modalidades</MenuItem>
            <MenuItem value="INTEGRADO">Integrado</MenuItem>
            <MenuItem value="SUBSEQUENTE">Subsequente</MenuItem>
            <MenuItem value="SUPERIOR">Superior</MenuItem>
          </Select>

          <TextField
            size="small"
            placeholder="Buscar curso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setActiveSearch(searchTerm)}
            sx={{
              bgcolor: '#f1f5f9',
              borderRadius: 2,
              flexGrow: 1,
              maxWidth: 300,
              '& fieldset': { border: '1px solid #cbd5e1' },
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModalCourse(true)}
            sx={{
              background: '#0B0A7A',
              borderRadius: 2,
              px: 3,
              fontWeight: 700,
              ml: 'auto',
              height: 38,
              fontSize: '0.85rem',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              boxShadow: '0 4px 6px -1px rgba(11, 10, 122, 0.3)',
              '&:hover': { background: '#08075a' },
              '& .MuiButton-startIcon': {
                display: 'flex',
                alignItems: 'center',
              },
            }}
          >
            Novo Curso
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '2px solid #0B0A7A',
            bgcolor: '#fff',
          }}
        >
          {filtered.length > 0 ? (
            <List disablePadding>
              {paginatedCourses.map((course, idx) => (
                <CourseItem
                  key={course.id}
                  index={idx}
                  course={course}
                  isExpanded={expandedCourse === course.id}
                  onToggle={() => handleExpand(course.id)}
                  onDelete={handleDelete}
                  subjects={courseSubjects[course.id] ?? []}
                  subjectsLoading={!!courseSubjectsLoading[course.id]}
                />
              ))}
            </List>
          ) : (
            <Box sx={{ p: 8, textAlign: 'center' }}>
              <InboxOutlined sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#64748b' }}>
                Nenhum curso encontrado.
              </Typography>
            </Box>
          )}
        </Paper>

        {totalPages > 1 && (
          <Stack sx={{ mt: 4, alignItems: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              size="large"
            />
          </Stack>
        )}
      </Box>

      {/* Modal - Novo Curso */}
      <Dialog
        open={openModalCourse}
        onClose={() => setOpenModalCourse(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#0B0A7A' }}>
          Novo Curso
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}
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
                />
              )}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" fullWidth>
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
                  />
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenModalCourse(false)}
            sx={{ fontWeight: 700 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{ bgcolor: '#0B0A7A', fontWeight: 700 }}
          >
            Criar Curso
          </Button>
        </DialogActions>
      </Dialog>
    </ContentLayoutComponent>
  );
}
