'use client';

import { Box, Button } from '@mui/material';

import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';

import { SearchBarComponent } from '@/components/utilities/search-bar.component';

import { Add } from '@mui/icons-material';

import { Subject } from '../_schemas/subject.schema';

import { useState, useEffect, useCallback } from 'react';

import { getAllSubjects } from '../_services/subjects.service';

import SubjectsList from '../_components/subjects-list.component';

import { useRouter } from 'next/navigation';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  async function loadSubjects(currentPage = 1) {
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
  }
  useEffect(() => {
    loadSubjects(page);
  }, [page, search]);

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

      <SubjectsList subjects={subjects} isLoading={isLoading} />
    </ContentLayoutComponent>
  );
}
