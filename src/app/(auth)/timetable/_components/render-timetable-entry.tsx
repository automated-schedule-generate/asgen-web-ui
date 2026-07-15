'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { TimetableEntry } from '../types/timetable-entry.type';
import { updateTimetableEntry } from '../../courses/_services/courses.service';
import { getErrorMessageUtil } from '@/utils/get-error-message.util';

export type RenderTimetableEntryProps = {
  readonly entry: (TimetableEntry | null)[][];
};

const weekDays = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
];

type SelectedCell = {
  slotIndex: number;
  dayIndex: number;
  entry: TimetableEntry;
};

export function RenderTimetableEntry({ entry }: RenderTimetableEntryProps) {
  const [grid, setGrid] = useState(entry);
  const [previousEntry, setPreviousEntry] = useState(entry);
  const [selected, setSelected] = useState<SelectedCell | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  if (previousEntry !== entry) {
    setPreviousEntry(entry);
    setGrid(entry);
    setSelected(null);
  }

  async function moveSelected(
    selectedCell: SelectedCell,
    targetSlotIndex: number,
    targetDayIndex: number,
  ) {
    setIsMoving(true);
    const toastLoading = toast.loading('Movendo disciplina...');
    const response = await updateTimetableEntry(selectedCell.entry.id, {
      day: String(targetDayIndex),
      slot_index: targetSlotIndex,
      teacher_id: selectedCell.entry.teacher_id ?? '',
    });

    if (response.success) {
      setGrid((previous) => {
        const next = previous.map((slots) => [...slots]);
        next[selectedCell.slotIndex][selectedCell.dayIndex] = null;
        next[targetSlotIndex][targetDayIndex] = {
          ...selectedCell.entry,
          day: String(targetDayIndex),
          slot_index: targetSlotIndex,
        };
        return next;
      });

      toast.update(toastLoading, {
        type: 'success',
        render: 'Disciplina movida com sucesso!',
        isLoading: false,
        autoClose: 1500,
      });
    } else {
      toast.update(toastLoading, {
        type: 'error',
        render: getErrorMessageUtil(
          response?.error,
          'Não foi possivel atualizar a grade horaria',
        ),
        isLoading: false,
        autoClose: 3000,
      });
    }
    setSelected(null);
    setIsMoving(false);
  }

  function handleCellClick(
    slotIndex: number,
    dayIndex: number,
    cell: TimetableEntry | null,
  ) {
    if (isMoving) return;

    if (cell) {
      setSelected((previous) =>
        previous?.entry.id === cell.id
          ? null
          : { slotIndex, dayIndex, entry: cell },
      );
      return;
    }

    if (selected) {
      moveSelected(selected, slotIndex, dayIndex);
    }
  }

  return (
    <>
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
            {grid.map((slots, slotIndex) => (
              <TableRow key={'slot-' + slotIndex} sx={{ height: 64 }}>
                {slots.map((cell, dayIndex) => {
                  const isSelected = !!cell && selected?.entry.id === cell.id;
                  const isTarget = !cell && !!selected;
                  const isClickable = !isMoving && (!!cell || isTarget);

                  return (
                    <TableCell
                      key={'entry-' + slotIndex + '-' + dayIndex}
                      align="center"
                      onClick={() => handleCellClick(slotIndex, dayIndex, cell)}
                      sx={{
                        width: '20%',
                        color: cell ? 'text.primary' : 'text.disabled',
                        cursor: isClickable ? 'pointer' : 'default',
                        ...(isSelected && {
                          bgcolor: 'secondary.main',
                          color: 'common.white',
                          fontWeight: 700,
                        }),
                        ...(isClickable && {
                          '&:hover': {
                            bgcolor: isSelected
                              ? 'secondary.main'
                              : 'action.hover',
                          },
                        }),
                      }}
                    >
                      {cell?.subject_name ?? 'Livre'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selected && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
          Movendo <strong>{selected.entry.subject_name}</strong> — clique em um
          horário livre para mover, ou clique na disciplina novamente para
          cancelar.
        </Typography>
      )}
    </>
  );
}
