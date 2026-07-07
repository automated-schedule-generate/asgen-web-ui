'use server';

import { Box, Chip, Paper, Stack } from '@mui/material';
import { getCourseWithTimetable } from '../../courses/_services/courses.service';
import { RenderCourseWithTimetable } from '../_components/render-course-with-timetable';
import { GenerateTimetable } from '../_components/generate-timetable';

export default async function TimetablePage() {
  const courses = await getCourseWithTimetable();

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 3 }}>
        <GenerateTimetable />
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {courses.map((course) => (
            <Chip
              key={'anchor-' + course.id}
              component="a"
              href={`#${course.name}`}
              label={course.name}
              clickable
              sx={{
                bgcolor: '#03017D',
                color: '#fff',
                '&:hover': { bgcolor: '#03017D', opacity: 0.85 },
              }}
            />
          ))}
        </Stack>
      </Paper>
      {courses.map((course) => (
        <RenderCourseWithTimetable
          key={'course-timetable-render-' + course.id}
          course={course}
        />
      ))}
    </Box>
  );
}
