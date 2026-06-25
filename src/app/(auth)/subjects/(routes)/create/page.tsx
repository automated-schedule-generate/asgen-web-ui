'use client';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import SubjectsCreateFormComponent from '../../_components/subjects-create-form.component';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';
import { Subject } from '../../_interfaces/subject.interface';
import { getAllCourses } from '@/app/(auth)/courses/_services/courses.service';
import { getAllSubjects } from '../../_services/subjects.service';

export default function CreateSubjectPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    Promise.all([getAllCourses(), getAllSubjects({ with_pagination: false })])
      .then(([coursesRes, subjectsRes]) => {
        setCourses(coursesRes?.data?.items ?? []);
        const items = subjectsRes?.data?.items;
        setSubjects(Array.isArray(items) ? items : []);
      })
      .catch(console.error);
  }, []);

  return (
    <ContentLayoutComponent
      title="Criar disciplina"
      description="Crie uma nova disciplina"
    >
      <Box className="flex flex-col gap-2">
        <SubjectsCreateFormComponent courses={courses} subjects={subjects} />
      </Box>
    </ContentLayoutComponent>
  );
}
