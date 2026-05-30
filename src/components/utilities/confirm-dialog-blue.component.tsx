'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmDialogBlueProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialogBlue({
  open,
  title,
  content,
  onConfirm,
  onCancel,
}: ConfirmDialogBlueProps) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            bgcolor: '#0B0A7A',
            '&:hover': { bgcolor: '#060554' },
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
