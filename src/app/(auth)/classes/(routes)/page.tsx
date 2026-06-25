'use client';

import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { useCallback, useEffect, useState } from 'react';
import { getAllClasses } from '../_services/classes.service';
import { getAllCourses } from '@/app/(auth)/courses/_services/courses.service';
import { getAllSemesters } from '@/app/(auth)/semesters/_services/semesters.service';
import { Box, Button } from '@mui/material';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';
import { Add } from '@mui/icons-material';
import ClassesList from '../_components/classes-list.component';
import { Class } from '../_interfaces/class.interface';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';
import { Semester } from '@/app/(auth)/semesters/_interfaces/semester.interface';
import ClassesCreateFormComponent from '../_components/classes-create-form';

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const loadClasses = useCallback(
    async (currentPage = 1) => {
      setIsLoading(true);

      try {
        const response = await getAllClasses({
          page: currentPage,
          limit: 10,
          search: search,
        });

        setClasses(response.data.items);

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
    loadClasses(page);
  }, [page, loadClasses]);

  useEffect(() => {
    getAllCourses({ limit: 100 }).then((res) =>
      setCourses(res?.data?.items ?? []),
    );
    getAllSemesters({ limit: 100 }).then((res) =>
      setSemesters(res?.data?.items ?? []),
    );
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearch(term);
    setPage(1);
  }, []);

  return (
    <ContentLayoutComponent
      title="Turmas"
      description="Gerencie as turmas da plataforma."
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
          onClick={() => setIsOpen(true)}
        >
          Nova turma
        </Button>
      </Box>
      <ClassesList
        classes={classes}
        isLoading={isLoading}
        onDelete={() => loadClasses(page)}
      />
      <ClassesCreateFormComponent
        open={isOpen}
        courses={courses}
        semesters={semesters}
        onClose={() => setIsOpen(false)}
        onSuccess={() => loadClasses(page)}
      />
    </ContentLayoutComponent>
  );
}
