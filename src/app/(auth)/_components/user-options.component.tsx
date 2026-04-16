'use client';
import React from 'react';
import { Button, Avatar, Menu, MenuItem } from '@mui/material';
import { useUser } from '@/contexts/user.context';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Logout,
} from '@mui/icons-material';
import { logout } from '../auth/_services/auth.service';
import { useRouter } from 'next/navigation';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';

export function UserOptions() {
  const { user, loading } = useUser();

  if (loading) {
    return <span>Carregando...</span>;
  }

  function stringAvatar(name: string) {
    const nameParts = name.trim().split(' ');

    const firstInitial = nameParts[0]?.[0] || '';
    const secondInitial = nameParts.length > 1 ? nameParts[1][0] : '';

    return {
      children: `${firstInitial}${secondInitial}`.toUpperCase(),
    };
  }
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  async function handleLogout() {
    handleClose();
    await logout();
    router.push('/');
  }
  return (
    <>
      <Button
        startIcon={<Avatar {...stringAvatar(user?.name || 'User')} />}
        endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        variant="outlined"
        color="inherit"
        size="small"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user?.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem
          className="text-red-500 w-full"
          onClick={() => setConfirmOpen(true)}
        >
          <Logout fontSize="small" className="mr-1" />
          Sair da conta
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={confirmOpen}
        title="Sair da conta"
        content="Tem certeza que deseja sair da conta?"
        onConfirm={() => {
          handleLogout();
        }}
        onCancel={() => {
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
