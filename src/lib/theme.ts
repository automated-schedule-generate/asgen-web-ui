import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
      light: '#424242',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#03017d',
      light: '#60a5fa',
    },
    background: {
      default: '#e8edf5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
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
  },
});

export default theme;
