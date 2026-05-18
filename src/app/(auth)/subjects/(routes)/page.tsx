'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';
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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllCourses({ page, limit, search: searchTerm });
      const items = res?.data?.items || [];

      const totalItems = res?.data?.meta?.totalItems || 0;
      const calculatedTotalPages = Math.ceil(totalItems / limit) || 1;

      setCourses(items);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error('Erro ao buscar listagem de cursos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <ContentLayoutComponent
      title="Cursos"
      description="Gerencie os cursos e suas respectivas disciplinas."
      hasPagination={true}
      count={totalPages}
      page={page}
      onChange={(_, value) => setPage(value)}
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
            onSearch={(term) => {
              setSearchTerm(term);
              setPage(1);
            }}
          />

          <CreateCourseModal onRefresh={fetchCourses} />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={40} sx={{ color: '#0B0A7A' }} />
          </Box>
        ) : courses.length > 0 ? (
          <Stack gap={2} sx={{ width: '100%' }}>
            {courses.map((course, index) => (
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
              {searchTerm === ''
                ? 'Nenhum curso cadastrado no sistema.'
                : 'Nenhum curso corresponde à sua pesquisa.'}
            </Typography>
          </Box>
        )}
      </Box>
    </ContentLayoutComponent>
  );
}
