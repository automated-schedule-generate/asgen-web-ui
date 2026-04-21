'use client';
import { Box } from '@mui/material';
import { TeachersListItemComponent } from './teachers-list-item.component';
import type { TeacherListType } from '../../_types/teacher-list.type';

export function TeachersListComponent({
  teachers,
}: {
  teachers: TeacherListType;
}) {
  return (
    <Box>
      {teachers.map((teacher) => (
        <TeachersListItemComponent
          key={teacher.user_id}
          name={teacher.user_id}
          id={teacher.user_id}
        />
      ))}
    </Box>
  );
}
