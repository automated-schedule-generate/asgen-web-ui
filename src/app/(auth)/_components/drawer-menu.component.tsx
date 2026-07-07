'use client';

import React, { useState } from 'react';
import { Drawer, List } from '@mui/material';
import {
  Home,
  Attribution,
  SquareFoot,
  School,
  Groups,
  Visibility,
  People,
  Tune,
} from '@mui/icons-material';
import { MenuItem } from './menu-item.component';
import { usePathname } from 'next/navigation';

export function DrawerMenu() {
  const [open, setOpen] = useState(false);
  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  const drawerWidth = open ? 240 : 60;
  const pathname = usePathname();
  const menuItems = [
    { text: 'Início', icon: <Home />, path: '/dashboard' },
    { text: 'Cursos', icon: <School />, path: '/courses' },
    { text: 'Disciplinas', icon: <SquareFoot />, path: '/subjects' },
    { text: 'Turmas', icon: <Groups />, path: '/classes' },
    { text: 'Professores', icon: <Attribution />, path: '/teachers' },
    {
      text: 'Gestão de Usuários',
      icon: <People />,
      path: '/users',
    },
    { text: 'Preferências', icon: <Tune />, path: '/teachers/preferences' },
    { text: 'Visualizar grades', icon: <Visibility />, path: '/timetable' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          top: 55,
          paddingY: 5,
          width: drawerWidth,
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <MenuItem
              key={item.text}
              open={open}
              text={item.text}
              icon={item.icon}
              path={item.path}
              selected={isActive}
            />
          );
        })}
      </List>
    </Drawer>
  );
}
