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
  initialMorning?: boolean[];
  initialAfternoon?: boolean[];
  onChangeMorning?: (morning: boolean[]) => void;
  onChangeAfternoon?: (afternoon: boolean[]) => void;
}

export function PreferenceDaysTable({
  disabled,
  initialMorning,
  initialAfternoon,
  onChangeMorning,
  onChangeAfternoon,
}: PreferenceDaysTableProps) {
  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const [preferenceMorning, setPreferenceMorning] = useState(
    initialMorning ?? new Array(5).fill(false),
  );
  const [preferenceAfternoon, setPreferenceAfternoon] = useState(
    initialAfternoon ?? new Array(5).fill(false),
  );

  // Sync prop changes to state during render (React's getDerivedStateFromProps pattern)
  const [prevInitialMorning, setPrevInitialMorning] = useState(initialMorning);
  if (prevInitialMorning !== initialMorning) {
    setPrevInitialMorning(initialMorning);
    if (initialMorning) setPreferenceMorning(initialMorning);
  }

  const [prevInitialAfternoon, setPrevInitialAfternoon] =
    useState(initialAfternoon);
  if (prevInitialAfternoon !== initialAfternoon) {
    setPrevInitialAfternoon(initialAfternoon);
    if (initialAfternoon) setPreferenceAfternoon(initialAfternoon);
  }

  const toggleMorning = (index: number) => {
    const newPreferences = [...preferenceMorning];
    newPreferences[index] = !newPreferences[index];
    setPreferenceMorning(newPreferences);
    if (onChangeMorning) {
      onChangeMorning(newPreferences);
    }
  };

  const toggleAfternoon = (index: number) => {
    const newPreferences = [...preferenceAfternoon];
    newPreferences[index] = !newPreferences[index];
    setPreferenceAfternoon(newPreferences);
    if (onChangeAfternoon) {
      onChangeAfternoon(newPreferences);
    }
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
                  width: '10rem',
                }}
              >
                Manhã
              </TableCell>
              {weekDays.map((_day, index) => (
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
              {weekDays.map((_day, index) => (
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
