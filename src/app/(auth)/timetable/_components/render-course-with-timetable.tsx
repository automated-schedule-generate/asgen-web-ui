'use client';

import { Box, Divider, Typography } from '@mui/material';
import { CourseData } from '../../courses/_types/course.types';
import { RenderTimetableEntry } from './render-timetable-entry';

export type RenderCourseWithTimetableProps = {
  readonly course: CourseData;
  readonly show_info?: boolean;
};

export function RenderCourseWithTimetable({
  course,
  show_info = true,
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
      {show_info && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: '#444', mb: 1 }}
          >
            Disciplinas que não foram alocadas
          </Typography>
          {course.unassigned?.map((entry, index) => (
            <div key={`unassigned-${entry.id}-${index}`}>
              <Typography>{entry.subject_name}</Typography>
              <Divider sx={{ mt: 1 }} />
            </div>
          ))}
        </Box>
      )}
      {course.timetable_entries?.map((entry, index) => (
        <Box
          key={'render-timetable-entry-' + course.name + '-' + index}
          sx={{ mt: 4 }}
        >
          {show_info && (
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: '#444', mb: 1 }}
            >
              {index + 1}º Período
            </Typography>
          )}
          <RenderTimetableEntry entry={entry} />
        </Box>
      ))}
    </Box>
  );
}
