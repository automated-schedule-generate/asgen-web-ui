'use client';

import { Box, Skeleton } from '@mui/material';

import ClassesItems from './classes-items.component';
import { Class } from '../_interfaces/class.interface';

export default function ClassesList({
  classes,
  isLoading,
  onDelete,
}: {
  classes: Class[];
  isLoading: boolean;
  onDelete: () => void;
}) {
  return (
    <Box className="flex flex-col gap-2">
      {isLoading && <Skeleton variant="rectangular" width={210} height={118} />}
      {classes.map((classe) => (
        <ClassesItems
          key={classe.id}
          id={classe.id}
          identify={classe.identify}
          shift={classe.shift}
          course={classe.course?.name}
          course_semester={classe.course_semester}
          semester={`${classe.semester?.year} "." ${classe.semester?.semester}`}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}
