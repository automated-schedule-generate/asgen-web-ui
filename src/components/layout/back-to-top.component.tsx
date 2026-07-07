'use client';

import { useEffect, useState } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab, Tooltip, Zoom } from '@mui/material';

const SCROLL_THRESHOLD = 300;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Tooltip title="Voltar ao topo">
        <Fab
          onClick={handleClick}
          color="primary"
          size="medium"
          aria-label="Voltar ao topo"
          sx={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            zIndex: 'tooltip',
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
