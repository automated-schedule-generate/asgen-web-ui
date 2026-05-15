'use client';

import { TableCell } from '@mui/material';
import { Check } from '@mui/icons-material';

interface TableCellComponentProps {
  index: number;
  togglePreference: (index: number) => void;
  preference: boolean[];
  disabled?: boolean;
}

export function TableCellComponent({
  index,
  togglePreference,
  preference,
  disabled,
}: TableCellComponentProps) {
  return (
    <TableCell
      onClick={() => {
        if (!disabled) togglePreference(index);
      }}
      sx={{
        textAlign: 'center',
        width: '10rem',
        cursor: disabled ? 'default' : 'pointer',
        padding: '0.5rem',
        '&:hover .hover-icon': {
          opacity: disabled ? undefined : 1,
        },
      }}
      className={preference[index] ? 'selected' : ''}
    >
      <Check
        className="hover-icon"
        sx={{
          color: 'secondary.main',
          opacity: preference[index] ? 1 : 0.1,
          transition: 'opacity 0.1s ease-in-out',
        }}
      />
    </TableCell>
  );
}
