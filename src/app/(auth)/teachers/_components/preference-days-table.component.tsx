'use client';
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { TableCellComponent } from './table/table-cell.component';

interface PreferenceDaysTableProps {
  disabled?: boolean;
}

export function PreferenceDaysTable({ disabled }: PreferenceDaysTableProps) {
  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const [preferenceMorning, setPreferenceMorning] = useState(
    new Array(5).fill(false),
  );
  const [preferenceAfternoon, setPreferenceAfternoon] = useState(
    new Array(5).fill(false),
  );

  const toggleMorning = (index: number) => {
    const newPreferences = [...preferenceMorning];
    newPreferences[index] = !newPreferences[index];
    setPreferenceMorning(newPreferences);
  };

  const toggleAfternoon = (index: number) => {
    const newPreferences = [...preferenceAfternoon];
    newPreferences[index] = !newPreferences[index];
    setPreferenceAfternoon(newPreferences);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ backgroundColor: 'background.default' }}
      >
        <Table
          sx={{
            '& .MuiTableCell-root': {
              borderLeft: '1px solid rgba(224, 224, 224, 1)',
              '&:last-child': {
                borderRight: '1px solid rgba(224, 224, 224, 1)',
              },
            },
          }}
        >
          <TableHead sx={{ backgroundColor: 'secondary.main' }}>
            <TableRow>
              <TableCell />
              {weekDays.map((day) => (
                <TableCell
                  key={day}
                  sx={{
                    textAlign: 'center',
                    width: '10rem',
                    padding: '0.5rem',
                    color: 'primary.contrastText',
                  }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'primary.contrastText',
                }}
              >
                Manhã
              </TableCell>
              {weekDays.map((day, index) => (
                <TableCellComponent
                  key={`morning-${index}`}
                  index={index}
                  togglePreference={toggleMorning}
                  preference={preferenceMorning}
                  disabled={disabled}
                />
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'primary.contrastText',
                }}
              >
                Tarde
              </TableCell>
              {weekDays.map((day, index) => (
                <TableCellComponent
                  key={`afternoon-${index}`}
                  index={index}
                  togglePreference={toggleAfternoon}
                  preference={preferenceAfternoon}
                  disabled={disabled}
                />
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
