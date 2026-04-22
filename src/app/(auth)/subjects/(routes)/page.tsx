'use server';
import { Card, CardContent, Typography } from '@mui/material';
import { getAllCourses } from '../../courses/_services/courses.service';
import type { CourseSchema } from '../../courses/_schemas/course.schema';

export default async function SubjectsPage() {
  const { data } = await getAllCourses();
  const courses = data.items as CourseSchema[];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Disciplinas</Typography>
      </CardContent>
    </Card>
  );
}
