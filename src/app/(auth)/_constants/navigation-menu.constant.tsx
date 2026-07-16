import {
  Tune,
  People,
  CalendarViewMonth,
  SquareFoot,
  Groups,
  Attribution,
  Home,
  School,
} from '@mui/icons-material';

export const navigationMenuItems = [
  {
    name: 'home',
    text: 'Início',
    icon: <Home sx={{ fontSize: 30 }} />,
    path: '/dashboard',
  },
  {
    name: 'courses',
    text: 'Cursos',
    icon: <School sx={{ fontSize: 30 }} />,
    path: '/courses',
  },
  {
    name: 'subjects',
    text: 'Disciplinas',
    icon: <SquareFoot sx={{ fontSize: 30 }} />,
    path: '/subjects',
  },
  {
    name: 'classes',
    text: 'Turmas',
    icon: <Groups sx={{ fontSize: 30 }} />,
    path: '/classes',
  },
  {
    name: 'teachers',
    text: 'Professores',
    icon: <Attribution sx={{ fontSize: 30 }} />,
    path: '/teachers',
  },
  {
    name: 'users',
    text: 'Gestão de Usuários',
    icon: <People sx={{ fontSize: 30 }} />,
    path: '/users',
  },
  {
    name: 'preferences',
    text: 'Preferências',
    icon: <Tune sx={{ fontSize: 30 }} />,
    path: '/teachers/preferences',
  },
  {
    name: 'timetable',
    text: 'Grade de horários',
    icon: <CalendarViewMonth sx={{ fontSize: 30 }} />,
    path: '/timetable',
  },
];
