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
  Pagination,
} from '@mui/material';
import {
  Search,
  Add as AddIcon,
  FilterList as FilterIcon,
  InboxOutlined,
} from '@mui/icons-material';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, type CourseType } from '../_schemas/course.schema';
import { CourseData, Subject } from '../_types/course.types';
import { CourseDialogComponent } from '../_components/course-dialog.component';
import { CourseItemComponent } from '../_components/course-item.component';
import {
  getAllCoursesClient,
  createCourseClient,
  deleteCourseClient,
} from '../_services/courses.client.service';

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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [subjectPageMap, setSubjectPageMap] = useState<Record<string, number>>(
    {},
  );
  const [typeFilter, setTypeFilter] = useState('TODOS');
  const [loading, setLoading] = useState(true);

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
      const res = await getAllCoursesClient();
      const raw = Array.isArray(res)
        ? res
        : res?.data || res?.data?.items || [];
      setCourses(
        raw.map((item: Record<string, unknown>) => ({
          id: String(item.id || item._id || item.uuid || Math.random()),
          name: String(item.name || item.nome || item.titulo || 'Sem Nome'),
          total_semesters: Number(item.total_semesters || item.semestres || 0),
          class_time: String(item.class_time || item.tempo_aula || '45'),
          type: (item.type || item.modalidade || 'OUTRO') as CourseData['type'],
          subjects: (item.subjects ||
            item.assuntos ||
            item.disciplinas ||
            []) as Subject[],
        })),
      );
    } catch (e) {
      console.error(e);
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
          (c.name || '').toLowerCase().includes(activeSearch.toLowerCase()) &&
          (typeFilter === 'TODOS' || c.type === typeFilter),
      ),
    [activeSearch, typeFilter, courses],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginatedCourses = useMemo(() => {
    const offset = (page - 1) * rowsPerPage;
    return filtered.slice(offset, offset + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const loadCourseSubjects = async (courseId: string) => {
    if (courseSubjects[courseId] || courseSubjectsLoading[courseId]) {
      return;
    }

    setCourseSubjectsLoading((prev) => ({ ...prev, [courseId]: true }));
    try {
      const response = await fetch(
        `/api/subject/course/${encodeURIComponent(courseId)}`,
        { cache: 'no-store' },
      );
      if (!response.ok) {
        throw new Error(`Erro ao buscar disciplinas: ${response.status}`);
      }
      const responseData = await response.json();
      const rawSubjects = Array.isArray(responseData)
        ? responseData
        : responseData?.data || responseData?.items || [];
      setCourseSubjects((prev) => ({
        ...prev,
        [courseId]: rawSubjects.map((item: Record<string, unknown>) => ({
          id: String(item.id || item._id || item.uuid || Math.random()),
          name: String(item.name || item.nome || item.titulo || 'Sem Nome'),
        })),
      }));
    } catch (error) {
      console.error('Erro ao carregar disciplinas do curso:', error);
      setCourseSubjects((prev) => ({ ...prev, [courseId]: [] }));
    } finally {
      setCourseSubjectsLoading((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourseClient(id);
      await loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpand = async (courseId: string) => {
    const nextId = expandedCourse === courseId ? null : courseId;
    setExpandedCourse(nextId);
    if (nextId) {
      await loadCourseSubjects(nextId);
    }
  };

  const onSubmit: SubmitHandler<CourseType> = async (data) => {
    if (await createCourseClient(data)) {
      await loadData();
      setSearchTerm('');
      setActiveSearch('');
    }
    setOpenModalCourse(false);
    reset();
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress size={30} />
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!e.target.value) {
                setActiveSearch('');
                setPage(1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActiveSearch(searchTerm);
                setPage(1);
              }
            }}
            sx={{
              bgcolor: '#E2E8F0',
              borderRadius: 1,
              flexGrow: 1,
              maxWidth: 220,
              '& fieldset': { border: 'none' },
              '& input': { py: 0.8, fontSize: '0.8rem' },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setActiveSearch(searchTerm);
                    setPage(1);
                  }}
                  size="small"
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
            {' '}
            Novo{' '}
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            mb: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Mostrar
            </Typography>
            <Select
              size="small"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              sx={{
                bgcolor: '#E2E8F0',
                borderRadius: 1,
                minWidth: 90,
                '& fieldset': { border: 'none' },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
            <Typography variant="body2" sx={{ color: '#666' }}>
              por página
            </Typography>
          </Box>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="small"
          />
        </Box>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 1.5,
            overflow: 'hidden',
            border: '1px solid #eceef2',
          }}
        >
          {filtered.length > 0 ? (
            <List disablePadding>
              {paginatedCourses.map((course) => (
                <CourseItemComponent
                  key={course.id}
                  course={course}
                  isExpanded={expandedCourse === course.id}
                  onToggle={() => handleExpand(course.id)}
                  onDelete={handleDeleteCourse}
                  subjects={courseSubjects[course.id] ?? course.subjects ?? []}
                  subjectsLoading={!!courseSubjectsLoading[course.id]}
                  subjectPage={subjectPageMap[course.id] ?? 1}
                  onSubjectPageChange={(value) =>
                    setSubjectPageMap((prev) => ({
                      ...prev,
                      [course.id]: value,
                    }))
                  }
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
              <InboxOutlined sx={{ fontSize: 40, color: '#cbd5e1' }} />
              <Typography
                variant="body2"
                sx={{ color: '#64748b', fontWeight: 500 }}
              >
                Nenhum curso cadastrado ou encontrado.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      <CourseDialogComponent
        open={openModalCourse}
        onClose={() => setOpenModalCourse(false)}
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
      />
    </ContentLayoutComponent>
  );
}
