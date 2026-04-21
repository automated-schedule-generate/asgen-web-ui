import { Card, CardContent, Typography } from '@mui/material';
import { getTeachers } from '../_services/teacher.service';
import { TeachersListComponent } from '../_components/list/teachers-list.component';
import type { TeacherListType } from '../_types/teacher-list.type';

export default async function TeachersPage() {
  const { data } = await getTeachers();
  const teachers = data.items as TeacherListType;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">Docentes Ativos</Typography>
          <TeachersListComponent teachers={teachers || []} />
        </CardContent>
      </Card>
    </div>
  );
}
