'use client';
import { getTeachers } from '../_services/teacher.service';
import { TeachersListComponent } from '../_components/list/teachers-list.component';
import type { TeacherListType } from '../_types/teacher-list.type';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';
import { useEffect, useState } from 'react';

export default function TeachersPage() {
  const [allTeachers, setAllTeachers] = useState<TeacherListType>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherListType>([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await getTeachers();
      setAllTeachers(data.items);
      setFilteredTeachers(data.items);
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
      <ContentLayoutComponent title="Docentes Ativos">
        <SearchBarComponent
          placeholder="Buscar docente..."
          delay={500}
          onSearch={handleSearch}
        />
        <TeachersListComponent teachers={filteredTeachers} />
      </ContentLayoutComponent>
    </div>
  );
}
