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
  updateCourse,
} from '../_services/courses.service';

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [activeSearch, setActiveSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const createFormMethods = useFormWithZod(courseSchema, {
    defaultValues: { class_time: '45', total_semesters: 1 },
  });

  const editFormMethods = useFormWithZod(courseSchema, {
    defaultValues: { class_time: '45', total_semesters: 1 },
  });

  useEffect(() => {
    if (openCreateModal) {
      console.log('--- LOGS DO FORMULÁRIO DE CRIAÇÃO ---');
      console.log('Valores atuais do Create:', createFormMethods.getValues());
      console.log(
        'Erros ativos do Create:',
        createFormMethods.formState.errors,
      );
    }
  }, [openCreateModal, createFormMethods]);

  useEffect(() => {
    if (openEditModal) {
      console.log('--- LOGS DO FORMULÁRIO DE EDIÇÃO ---');
      console.log('ID do curso a ser editado:', editingCourseId);
      console.log('Valores carregados no Edit:', editFormMethods.getValues());
      console.log('Erros ativos do Edit:', editFormMethods.formState.errors);
    }
  }, [openEditModal, editingCourseId, editFormMethods]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllCourses({ page, limit, search: activeSearch });
      setCourses(res?.data?.items || []);
      setTotalPages(res?.data?.page?.total || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, activeSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onCreateSubmit = async (data: CourseType) => {
    try {
      await createCourse(data);
      await loadData();
      setOpenCreateModal(false);
      createFormMethods.reset({ class_time: '45', total_semesters: 1 });
    } catch (e) {
      console.error(e);
    }
  };

  const onEditSubmit = async (data: CourseType) => {
    if (!editingCourseId) return;
    try {
      await updateCourse(editingCourseId, data);
      await loadData();
      setOpenEditModal(false);
      setEditingCourseId(null);
      editFormMethods.reset({ class_time: '45', total_semesters: 1 });
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClick = (course: CourseData) => {
    setEditingCourseId(course.id);
    editFormMethods.reset({
      name: course.name,
      class_time: course.class_time as '45' | '60',
      total_semesters: Number(course.total_semesters),
    });
    setOpenEditModal(true);
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
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            mb: 3,
          }}
        >
          <SearchBarComponent
            delay={500}
            onSearch={(v) => {
              setActiveSearch(v);
              setPage(1);
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateModal(true)}
            color="secondary"
            sx={{
              borderRadius: '50px',
              px: 3,
              fontWeight: 700,
              height: 40,
              textTransform: 'none',
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
                  onToggle={() =>
                    setExpandedCourse((prev) =>
                      prev === course.id ? null : course.id,
                    )
                  }
                  onEditClick={handleEditClick}
                  onRefresh={loadData}
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
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#0B0A7A' }}>
          Novo Curso
        </DialogTitle>
        <CourseForm
          formMethods={createFormMethods}
          onSubmit={onCreateSubmit}
          onCancel={() => setOpenCreateModal(false)}
          isEdit={false}
        />
      </Dialog>

      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#0B0A7A' }}>
          Editar Curso
        </DialogTitle>
        <CourseForm
          formMethods={editFormMethods}
          onSubmit={onEditSubmit}
          onCancel={() => setOpenEditModal(false)}
          isEdit={true}
        />
      </Dialog>
    </ContentLayoutComponent>
  );
}
