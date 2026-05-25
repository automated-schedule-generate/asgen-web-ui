'use client';

import React, { useState } from 'react';
import { Drawer, Divider, List } from '@mui/material';
import {
  Home,
  Attribution,
  AutoMode,
  AdminPanelSettings,
  SquareFoot,
  School,
  Groups,
  Visibility,
  People,
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
    { text: 'Dashboard', icon: <Home />, path: '/dashboard' },
    { text: 'Professores', icon: <Attribution />, path: '/teachers' },
    { text: 'Turmas', icon: <Groups />, path: '/classes' },
    { text: 'Cursos', icon: <School />, path: '/courses' },
    { text: 'Disciplinas', icon: <SquareFoot />, path: '/subjects' },
    {
      text: 'Gestão de funções',
      icon: <AdminPanelSettings />,
      path: '/functions',
    },
    {
      text: 'Gestão de Usuários',
      icon: <People />,
      path: '/users',
    },
    { text: 'Gerador de grades', icon: <AutoMode />, path: '#' },
    { text: 'Visualizar grades', icon: <Visibility />, path: '#' },
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
          <Divider />;
        })}
      </List>
    </Drawer>
  );
}
