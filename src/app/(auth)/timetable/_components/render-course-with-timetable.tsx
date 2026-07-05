'use client';

import { Box, Divider, Typography } from '@mui/material';
import { CourseData } from '../../courses/_types/course.types';
import { RenderTimetableEntry } from './render-timetable-entry';

export type RenderCourseWithTimetableProps = {
  readonly course: CourseData;
};

export function RenderCourseWithTimetable({
  course,
}: RenderCourseWithTimetableProps) {
  return (
    <Box component="section" sx={{ mb: 6 }}>
      <Typography
        id={course.name}
        variant="h5"
        sx={{ fontWeight: 700, color: '#333', scrollMarginTop: '96px' }}
      >
        {course.name}
      </Typography>
      {course.timetable_generated_at && (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Gerado em{' '}
          {new Date(course.timetable_generated_at).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </Typography>
      )}
      <Divider sx={{ mt: 1, mb: 3 }} />
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: '#444', mb: 1 }}
        >
          Disciplinas que não foram alocadas
        </Typography>
        {course.unassigned?.map((entry, index) => (
          <>
            <Typography key={`unassigned-${entry.id}-${index}`}>
              {entry.subject_name}
            </Typography>
            <Divider key={`divider-${entry.id}-${index}`} sx={{ mt: 1 }} />
          </>
        ))}
      </Box>
      {course.timetable_entries?.map((entry, index) => (
        <Box
          key={'render-timetable-entry-' + course.name + '-' + index}
          sx={{ mt: 4 }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: '#444', mb: 1 }}
          >
            Período: {index + 1}
          </Typography>
          <RenderTimetableEntry entry={entry} />
        </Box>
      ))}
    </Box>
  );
}
