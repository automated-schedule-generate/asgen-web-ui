import { Card, CardContent, Typography } from '@mui/material';
import { TeacherDetailsComponent } from '../../_components/teacher/teacher-details.component';
import { getTeacherById } from '../../_services/teacher.service';
import { getAllSubjects } from '@/app/(auth)/subjects/_services/subjects.service';
import { Subject } from '@/app/(auth)/subjects/_interfaces/subject.interface';

export default async function EditTeacherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const teacherData = await getTeacherById(id);
  const subjects = await getAllSubjects({
    with_course: true,
    with_pagination: false,
    with_prerequisite: false,
  });
  const teacherSubjects = (subjects?.data?.items as Subject[])?.filter(
    (subject) => subject.teachers?.some((t) => t.user_id === id),
  );
  const teacher = teacherData?.data
    ? {
        ...teacherData.data,
        subjects: teacherSubjects,
      }
    : null;

  console.log('teacherData returned from service:', teacherSubjects);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Dados do Professor</Typography>
        <TeacherDetailsComponent teacher={teacher} />
      </CardContent>
    </Card>
  );
}
