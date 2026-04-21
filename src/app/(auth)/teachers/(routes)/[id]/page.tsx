'use server';
import { Card, CardContent, Typography } from '@mui/material';
import { TeacherDetailsComponent } from '../../_components/teacher/teacher-details.component';

export default async function TeacherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Dados do Professor</Typography>
        <TeacherDetailsComponent />
      </CardContent>
    </Card>
  );
}
