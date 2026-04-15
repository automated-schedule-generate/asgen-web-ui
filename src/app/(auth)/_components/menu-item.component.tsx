'use client';
import { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/navigation';
export function MenuItem({
  open,
  text,
  icon,
  selected,
  path,
}: {
  open: boolean;
  text: string;
  icon: React.ReactNode;
  selected: boolean;
  path: string;
}) {
  const router = useRouter();

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        selected={selected}
        onClick={() => router.push(path)}
        sx={[
          {
            maxHeight: 48,
            px: 2,
            '&.Mui-selected': {
              borderRight: '4px solid',
              borderColor: 'primary.contrastText',
            },
          },
          open
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              color: 'inherit',
              minWidth: 0,
              justifyContent: 'center',
            },
            open
              ? {
                  mr: 2,
                }
              : {
                  mr: 'auto',
                },
          ]}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={[
            open
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  );
}
