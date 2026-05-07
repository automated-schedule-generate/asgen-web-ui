'use client';
import { getTeachers } from '../_services/teacher.service';
import { TeachersListComponent } from '../_components/list/teachers-list.component';
import type { TeacherListType } from '../_types/teacher-list.type';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function TeachersPage() {
  const [allTeachers, setAllTeachers] = useState<TeacherListType>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherListType>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const { data } = await getTeachers();
        setAllTeachers(data.items);
        setFilteredTeachers(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearch = (term: string) => {
    const filtered = allTeachers.filter((teacher) =>
      teacher.user?.name?.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredTeachers(filtered);
  };

  return (
    <div>
      <ContentLayoutComponent
        title="Docentes Ativos"
        description="Lista de docentes ativos no sistema"
      >
        <Box className="flex flex-col gap-4">
          <SearchBarComponent
            placeholder="Buscar docente..."
            delay={500}
            onSearch={handleSearch}
          />
          <TeachersListComponent
            teachers={filteredTeachers}
            isLoading={isLoading}
          />
        </Box>
      </ContentLayoutComponent>
    </div>
  );
}
