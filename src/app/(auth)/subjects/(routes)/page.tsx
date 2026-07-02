'use client';

import { Box, Button } from '@mui/material';

import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';

import { SearchBarComponent } from '@/components/utilities/search-bar.component';

import { Add } from '@mui/icons-material';

import { useState, useEffect, useCallback } from 'react';

import { getAllSubjects } from '../_services/subjects.service';

import { useRouter } from 'next/navigation';
import { Subject } from '../_interfaces/subject.interface';
import SubjectsList from '../_components/subjects-list.component';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const loadSubjects = useCallback(
    async (currentPage = 1) => {
      setIsLoading(true);

      try {
        const response = await getAllSubjects({
          page: currentPage,
          limit: 10,
          search: search,
        });

        setSubjects(response.data.items);

        setTotalPages(response.data.page.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [search],
  );

  useEffect(() => {
    loadSubjects(page);
  }, [page, loadSubjects]);

  const handleSearch = useCallback((term: string) => {
    setSearch(term);
    setPage(1);
  }, []);

  const router = useRouter();

  return (
    <ContentLayoutComponent
      title="Disciplinas"
      description="Gerencie as disciplinas do sistema."
      hasPagination
      count={totalPages}
      page={page}
      onChange={(_, value) => setPage(value)}
    >
      <Box className="flex flex-row items-center justify-between">
        <SearchBarComponent delay={500} onSearch={handleSearch} />

        <Button
          variant="contained"
          startIcon={<Add />}
          color="secondary"
          onClick={() => router.push('/subjects/create')}
        >
          Nova disciplina
        </Button>
      </Box>

      <SubjectsList
        subjects={subjects}
        isLoading={isLoading}
        onRefresh={() => loadSubjects(page)}
      />
    </ContentLayoutComponent>
  );
}
