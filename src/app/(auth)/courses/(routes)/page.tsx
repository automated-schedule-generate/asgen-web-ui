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

// Importando as funções do seu service
import {
  getAllCourses,
  createCourse,
  deleteCourse,
  getCourseById,
} from '../_services/courses.service';

type RawCourse = Record<string, unknown>;

// --- Funções de Normalização ---
function normalizeCourse(item: RawCourse): CourseData {
  const record = item as Record<string, unknown>;
  const subjectsRaw = record.subjects ?? record.disciplinas;

  return {
    id: String(record.id ?? record._id ?? record.uuid ?? Math.random()),
    name: String(record.name ?? record.nome ?? record.titulo ?? 'Sem Nome'),
    total_semesters: Number(record.total_semesters ?? record.semestres ?? 0),
    class_time: String(record.class_time ?? record.tempo_aula ?? '45'),
    type: (record.type ?? record.modalidade ?? 'OUTRO') as CourseData['type'],
    subjects: Array.isArray(subjectsRaw) ? (subjectsRaw as Subject[]) : [],
  };
}

// --- Componente de Item da Lista ---
interface CourseItemProps {
  course: CourseData;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  subjects: Subject[];
  subjectsLoading: boolean;
}

function CourseItem({
  course,
  isExpanded,
  onToggle,
  onDelete,
  subjects,
  subjectsLoading,
}: CourseItemProps) {
  const typeColor =
    { INTEGRADO: '#2E7D32', SUBSEQUENTE: '#ED6C02', SUPERIOR: '#1976D2' }[
      course.type as string
    ] || '#757575';

  return (
    <>
      <ListItem
        onClick={onToggle}
        sx={{
          py: 1,
          px: 2,
          cursor: 'pointer',
          bgcolor: isExpanded ? '#0B0A7A' : 'inherit',
          color: isExpanded ? '#fff' : '#0B0A7A',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}
        >
          <SchoolIcon sx={{ fontSize: 18, opacity: 0.8 }} />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: '0.85rem' }}
            >
              {course.name}
            </Typography>
            <Chip
              label={course.type}
              size="small"
              variant="outlined"
              sx={{
                height: 14,
                fontSize: '0.55rem',
                mt: 0.2,
                color: isExpanded ? '#fff' : typeColor,
                borderColor: isExpanded ? '#fff' : typeColor,
              }}
            />
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(course.id);
          }}
          sx={{ color: 'inherit' }}
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <KeyboardArrowRight
          sx={{
            transform: isExpanded ? 'rotate(90deg)' : '0',
            transition: '0.2s',
            ml: 1,
          }}
        />
      </ListItem>
      <Collapse in={isExpanded} unmountOnExit>
        <Box sx={{ p: 1, bgcolor: '#fcfcfd' }}>
          <TableContainer
            sx={{ border: '1px solid #eee' }}
            component={Paper}
            elevation={0}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: '#f1f3f7' }}>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 700, py: 0.3, fontSize: '0.75rem' }}
                  >
                    Disciplina
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ py: 0.3, fontSize: '0.75rem' }}
                  >
                    Ação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjectsLoading ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 2 }}>
                      <CircularProgress size={20} />
                    </TableCell>
                  </TableRow>
                ) : subjects && subjects.length > 0 ? (
                  subjects.map((sub, index) => (
                    <TableRow
                      key={
                        sub.id ||
                        `${sub.name ?? sub.nome ?? sub.titulo ?? 'disciplina'}-${index}`
                      }
                      hover
                    >
                      <TableCell sx={{ py: 0.3, fontSize: '0.75rem' }}>
                        {sub.name || sub.nome || sub.titulo}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 0.3 }}>
                        <IconButton size="small">
                          <DeleteIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{ py: 1, fontSize: '0.75rem' }}
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
    </>
  );
}

// --- Página Principal ---
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
      const raw = (() => {
        if (Array.isArray(res)) return res;
        if (!res || typeof res !== 'object') return [];
        if (Array.isArray(res.items)) return res.items;
        if (Array.isArray(res.data)) return res.data;
        if (Array.isArray(res.data?.items)) return res.data.items;
        if (Array.isArray(res.courses)) return res.courses;
        return [];
      })();
      setCourses(raw.map((item: RawCourse) => normalizeCourse(item)));
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const handleExpand = async (courseId: string) => {
    const isOpening = expandedCourse !== courseId;
    setExpandedCourse(isOpening ? courseId : null);

    if (isOpening && !courseSubjects[courseId]) {
      setCourseSubjectsLoading((prev) => ({ ...prev, [courseId]: true }));
      try {
        const details = await getCourseById(courseId);
        const rawSubs =
          details?.subjects ||
          details?.disciplinas ||
          details?.data?.subjects ||
          [];
        setCourseSubjects((prev) => ({ ...prev, [courseId]: rawSubs }));
      } catch (e) {
        console.error('Erro ao carregar disciplinas:', e);
      } finally {
        setCourseSubjectsLoading((prev) => ({ ...prev, [courseId]: false }));
      }
    }
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress sx={{ color: '#0B0A7A' }} />
      </Box>
    );

  return (
    <ContentLayoutComponent title="Cursos">
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Select
            size="small"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            startAdornment={
              <FilterIcon sx={{ fontSize: 16, mr: 0.5, color: '#0B0A7A' }} />
            }
            sx={{
              bgcolor: '#E2E8F0',
              borderRadius: 1,
              '& fieldset': { border: 'none' },
              fontSize: '0.75rem',
              height: 32,
              minWidth: 140,
              color: '#0B0A7A',
            }}
          >
            <MenuItem value="TODOS">Todas Modalidades</MenuItem>
            <MenuItem value="INTEGRADO">Integrado</MenuItem>
            <MenuItem value="SUBSEQUENTE">Subsequente</MenuItem>
            <MenuItem value="SUPERIOR">Superior</MenuItem>
          </Select>

          <TextField
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setActiveSearch(searchTerm)}
            sx={{
              bgcolor: '#E2E8F0',
              borderRadius: 1,
              flexGrow: 1,
              maxWidth: 220,
              '& fieldset': { border: 'none' },
              '& input': { py: 0.8, fontSize: '0.8rem', color: '#0B0A7A' },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setActiveSearch(searchTerm)}
                  size="small"
                  sx={{ color: '#0B0A7A' }}
                >
                  <Search sx={{ fontSize: 16 }} />
                </IconButton>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModalCourse(true)}
            sx={{
              background: '#0B0A7A',
              borderRadius: 1,
              fontWeight: 700,
              ml: 'auto',
              height: 32,
              fontSize: '0.75rem',
              textTransform: 'none',
            }}
          >
            Novo
          </Button>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 1.5,
            overflow: 'hidden',
            border: '1px solid #0B0A7A',
          }}
        >
          {filtered.length > 0 ? (
            <List disablePadding>
              {paginatedCourses.map((course) => (
                <CourseItem
                  key={course.id}
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
            <Box
              sx={{
                p: 5,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <InboxOutlined
                sx={{ fontSize: 40, color: '#0B0A7A', opacity: 0.5 }}
              />
              <Typography
                variant="body2"
                sx={{ color: '#0B0A7A', fontWeight: 500 }}
              >
                Nenhum curso encontrado.
              </Typography>
            </Box>
          )}
        </Paper>

        {totalPages > 1 && (
          <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              sx={{
                '& .MuiPaginationItem-root': { color: '#0B0A7A' },
                '& .Mui-selected': {
                  bgcolor: '#0B0A7A !important',
                  color: '#fff',
                },
              }}
            />
          </Stack>
        )}
      </Box>

      <Dialog
        open={openModalCourse}
        onClose={() => setOpenModalCourse(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{ fontWeight: 700, fontSize: '1rem', color: '#0B0A7A' }}
        >
          Novo Curso
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1 }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  size="small"
                  fullWidth
                  error={!!errors.name}
                />
              )}
            />
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Tempo</InputLabel>
                <Controller
                  name="class_time"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Tempo">
                      <MenuItem value="45">45m</MenuItem>
                      <MenuItem value="60">60m</MenuItem>
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
        <DialogActions sx={{ p: 1.5 }}>
          <Button size="small" onClick={() => setOpenModalCourse(false)}>
            Sair
          </Button>
          <Button
            size="small"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{ bgcolor: '#0B0A7A' }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </ContentLayoutComponent>
  );
}
