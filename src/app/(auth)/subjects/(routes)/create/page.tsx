'use client';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import SubjectsCreateFormComponent from '../../_components/subjects-create-form.component';
import { Box } from '@mui/material';
import { getAllSubjects } from '../../_services/subjects.service';
import { useEffect, useState } from 'react';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';
import { Subject } from '../../_interfaces/subject.interface';
import { getAllCourses } from '@/app/(auth)/courses/_services/courses.service';

export default function CreateSubjectPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const { data: subjectsData } = await getAllSubjects();
        const { data: coursesData } = await getAllCourses();
        setSubjects(subjectsData.items);
        setCourses(coursesData.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <ContentLayoutComponent
      title="Criar disciplina"
      description="Crie uma nova disciplina"
    >
      <Box className="flex flex-col gap-2">
        <SubjectsCreateFormComponent subjects={subjects} courses={courses} />
      </Box>
    </ContentLayoutComponent>
  );
}
