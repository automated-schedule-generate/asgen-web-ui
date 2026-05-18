'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';

import { CourseItem } from '@/app/(auth)/courses/_components/course-item.component';
import { CreateCourseModal } from '@/app/(auth)/courses/_components/create-course-modal.component';
import { getAllCourses } from '@/app/(auth)/courses/_services/courses.service';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllCourses({ page: 1, limit: 100 });
      const items = res?.data?.items || res?.items || res?.data || res || [];
      setCourses(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error('Erro ao buscar listagem de cursos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filteredCourses = courses.filter((course) =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ContentLayoutComponent
      title="Cursos"
      description="Gerencie os cursos e suas respectivas disciplinas."
      hasPagination={false}
    >
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <SearchBarComponent
            placeholder="Buscar..."
            onSearch={setSearchTerm}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateModalOpen(true)}
            sx={{
              bgcolor: '#0B0A7A',
              '&:hover': { bgcolor: '#060554' },
              borderRadius: '4px',
              px: 3,
              fontWeight: 700,
              textTransform: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Novo Curso
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={40} sx={{ color: '#0B0A7A' }} />
          </Box>
        ) : filteredCourses.length > 0 ? (
          <Stack gap={2} sx={{ width: '100%' }}>
            {filteredCourses.map((course, index) => (
              <CourseItem
                key={course.id || index}
                course={course}
                index={index}
                onRefresh={fetchCourses}
              />
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 8,
              border: '1px dashed #cbd5e1',
              borderRadius: '4px',
              bgcolor: '#f8fafc',
            }}
          >
            <Typography sx={{ color: '#64748b', fontWeight: 500 }}>
              {courses.length === 0
                ? 'Nenhum curso cadastrado no sistema.'
                : 'Nenhum curso corresponde à sua pesquisa.'}
            </Typography>
          </Box>
        )}
      </Box>

      <CreateCourseModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onRefresh={fetchCourses}
      />
    </ContentLayoutComponent>
  );
}
