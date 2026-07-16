'use client';

import React, { useState } from 'react';
import { Drawer, List } from '@mui/material';
import { MenuItem } from './menu-item.component';
import { usePathname } from 'next/navigation';
import { navigationMenuItems as menuItems } from '../_constants/navigation-menu.constant';

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
