import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#1a1a1a',
      light: '#424242',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'rgba(3, 1, 125, 1)',
      light: 'rgb(96, 165, 250)',
    },
    background: {
      default: '#e8edf5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(3, 1, 125, 1)',
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#cbd5e1', // Inativo
          '&.Mui-active': {
            color: '#03017d', // Cor principal (ex: preto para o ASGEN)
          },
          '&.Mui-completed': {
            color: '#22c55e', // Verde para sucesso
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          width: 'auto',
        },
      },
    },
  },
});

export default theme;
