'use client';
import { getAllCourses } from '@/app/(auth)/courses/_services/courses.service';
import { useEffect, useState } from 'react';
import { CourseType } from '@/app/(auth)/courses/_schemas/course.schema';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { getAllSemesters } from '@/app/(auth)/semesters/_services/semesters.service';
import { Semester } from '@/app/(auth)/semesters/_interfaces/semester.interface';
import ClassesCreateFormComponent from '../../_components/classes-create-form.component';
export default function CreatePage() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      try {
        const { data: coursesData } = await getAllCourses();
        setCourses(coursesData.items);
        const { data: semestersData } = await getAllSemesters();
        setSemesters(semestersData.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);
  return (
    <ContentLayoutComponent
      title="Adicionar turma"
      description="Adicione uma nova turma no sistema."
    >
      <ClassesCreateFormComponent courses={courses} semesters={semesters} />
    </ContentLayoutComponent>
  );
}
