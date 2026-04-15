import React from 'react';
import { Logo } from '@/components/layout/logo.component';
import { Toolbar, AppBar, Box } from '@mui/material';
import { UserOptions } from './user-options.component';

export function DefaultAppBar() {
  return (
    <AppBar position="static" color="secondary" elevation={0}>
      <Toolbar>
        <Logo orientation="horizontal" theme="light" width={200} />
        <Box className="ml-auto">
          <UserOptions />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
