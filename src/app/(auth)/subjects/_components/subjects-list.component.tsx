'use client';

import { Box, Skeleton } from '@mui/material';
import SubjectsItems from './subjects-items.component';
import type { Subject } from '../_interfaces/subject.interface';

export default function SubjectsList({
  subjects,
  isLoading,
  onRefresh,
}: {
  subjects: Subject[];
  isLoading: boolean;
  onRefresh: () => void;
}) {
  return (
    <Box className="flex flex-col gap-2">
      {isLoading && <Skeleton variant="rectangular" width={210} height={118} />}
      {subjects.map((subject) => (
        <SubjectsItems
          key={subject.id}
          id={subject.id}
          name={subject.name}
          workload={subject.workload}
          is_optional={subject.is_optional ? 'Não' : 'Sim'}
          prerequisite={subject.prerequisite?.name || 'Não possui'}
          course={subject.course?.name || ''}
          teacher={subject.teachers?.at(0)?.user?.name || 'Não alocado'}
          onRefresh={onRefresh}
        />
      ))}
    </Box>
  );
}
