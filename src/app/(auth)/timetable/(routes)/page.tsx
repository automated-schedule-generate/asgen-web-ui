'use server';
import { getAllCourses } from '../../courses/_services/courses.service';
import { CourseData } from '../../courses/_types/course.types';
import { RenderPageTimetable } from '../_components/render-page-timetable';

export default async function TimetablePage() {
  const courses: CourseData[] = [
    {
      id: '0',
      name: 'Todos os cursos',
      class_time: '45',
      total_semesters: 0,
    },
  ];
  const { data } = await getAllCourses({ limit: 1000 });

  courses.push(...data.items);

  return <RenderPageTimetable courses={courses} />;
}
