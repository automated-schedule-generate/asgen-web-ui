'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { TimetableEntry } from '../types/timetable-entry.type';

export type RenderTimetableEntryProps = {
  readonly entry: TimetableEntry[][];
};

const weekDays = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
];

export function RenderTimetableEntry({ entry }: RenderTimetableEntryProps) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 3 }}
    >
      <Table sx={{ tableLayout: 'fixed' }} size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#03017D' }}>
            {weekDays.map((day) => (
              <TableCell
                key={day}
                align="center"
                sx={{
                  width: '20%',
                  color: '#fff',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {entry.map((day, dayIndex) => (
            <TableRow key={'day-' + dayIndex} sx={{ height: 64 }}>
              {day.map((entry, entryIndex) => (
                <TableCell
                  key={'entry-' + dayIndex + '-' + entryIndex}
                  align="center"
                  sx={{
                    width: '20%',
                    color: entry ? 'text.primary' : 'text.disabled',
                  }}
                >
                  {entry?.subject_name ?? 'Livre'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
