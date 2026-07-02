'use client';
import { getTeachers } from '../_services/teacher.service';
import { TeachersListComponent } from '../_components/list/teachers-list.component';
import type { TeacherListType } from '../_types/teacher-list.type';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';
import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<TeacherListType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const loadTeachers = useCallback(
    async (currentPage = 1) => {
      setIsLoading(true);
      try {
        const { data } = await getTeachers({
          page: currentPage,
          limit: 10,
          search,
        });
        setTeachers(data.items);
        setTotalPages(data.page.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [search],
  );

  useEffect(() => {
    loadTeachers(page);
  }, [page, loadTeachers]);

  const handleSearch = useCallback((term: string) => {
    setSearch(term);
    setPage(1);
  }, []);

  return (
    <ContentLayoutComponent
      title="Docentes Ativos"
      description="Lista de docentes ativos no sistema"
      hasPagination
      count={totalPages}
      page={page}
      onChange={(_, value) => setPage(value)}
    >
      <Box className="flex flex-col gap-4">
        <SearchBarComponent
          placeholder="Buscar docente..."
          delay={500}
          onSearch={handleSearch}
        />
        <TeachersListComponent teachers={teachers} isLoading={isLoading} />
      </Box>
    </ContentLayoutComponent>
  );
}
