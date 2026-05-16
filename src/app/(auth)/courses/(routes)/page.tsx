'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Box,
  Button,
  List,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { Add as AddIcon, InboxOutlined } from '@mui/icons-material';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { courseSchema, type CourseType } from '../_schemas/course.schema';
import { CourseData } from '../_types/course.types';
import { CourseItem } from '../_components/course-item.component';
import { CourseForm } from '../_components/course-form.component';

import {
  getAllCourses,
  createCourse,
  deleteCourse,
} from '../_services/courses.service';
import { deleteSubject } from '../../subjects/_services/subjects.service';

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [activeSearch, setActiveSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const formMethods = useFormWithZod(courseSchema, {
    defaultValues: { class_time: '45', total_semesters: 1 },
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllCourses({ page, limit, search: activeSearch });
      const items = res?.data?.items || [];
      const total = res?.data?.page?.total || 1;

      setCourses(items);
      setTotalPages(total);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, activeSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = (value: string) => {
    setActiveSearch(value);
    setPage(1);
  };

  const handleToggle = (courseId: string) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const onSubmit = async (data: CourseType) => {
    try {
      await createCourse(data);
      await loadData();
      setOpenModalCourse(false);
      formMethods.reset();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Deseja realmente excluir este curso?')) {
      try {
        await deleteCourse(id);
        await loadData();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (window.confirm('Deseja realmente excluir esta disciplina?')) {
      try {
        await deleteSubject(subjectId);
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
    <ContentLayoutComponent
      title="Cursos"
      description="Gerencie os cursos do sistema."
      hasPagination={true}
      count={totalPages}
      page={page}
      onChange={(_, value) => setPage(value)}
    >
      <Box
        sx={{
          width: '100%',
          mt: 1,
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#0B0A7A !important',
            color: '#ffffff !important',
          },
          '& .MuiPaginationItem-root': { color: '#0B0A7A', fontWeight: 600 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            mb: 3,
          }}
        >
          <SearchBarComponent delay={500} onSearch={handleSearch} />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModalCourse(true)}
            color="secondary"
            sx={{
              borderRadius: '50px',
              px: 3,
              fontWeight: 700,
              height: 40,
              textTransform: 'none',
              whiteSpace: 'nowrap',
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
          {courses.length > 0 ? (
            <List disablePadding>
              {courses.map((course, idx) => (
                <CourseItem
                  key={course.id}
                  index={idx}
                  course={course}
                  isExpanded={expandedCourse === course.id}
                  onToggle={() => handleToggle(course.id)}
                  onDelete={handleDeleteCourse}
                  onDeleteSubject={handleDeleteSubject}
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
      </Box>

      <Dialog
        open={openModalCourse}
        onClose={() => setOpenModalCourse(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#0B0A7A' }}>
          Novo Curso
        </DialogTitle>
        <CourseForm
          formMethods={formMethods}
          onSubmit={onSubmit}
          onCancel={() => setOpenModalCourse(false)}
        />
      </Dialog>
    </ContentLayoutComponent>
  );
}
