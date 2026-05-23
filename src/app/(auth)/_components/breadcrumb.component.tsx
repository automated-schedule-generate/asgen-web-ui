'use client';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const routeTranslations: Record<string, string> = {
  home: 'Início',
  dashboard: 'Painel',
  subjects: 'Disciplinas',
  create: 'Adicionar',
  classes: 'Turmas',
  courses: 'Cursos',
  semesters: 'Semestres',
  teachers: 'Professores',
};

export default function AutoBreadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();

  const pathnames = pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const formatLabel = (value: string, index: number, array: string[]) => {
    const isId = /^[0-9a-fA-F-]{36}$/.test(value) || !isNaN(Number(value));

    const nextSegment = array[index + 1];

    if (isId) {
      if (nextSegment === 'edit') {
        return 'Editar';
      }
      return 'Detalhes';
    }
    if (value === 'edit') {
      return '';
    }
    return (
      routeTranslations[value] || value.charAt(0).toUpperCase() + value.slice(1)
    );
  };
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ marginBottom: 2, fontWidth: 400 }}
    >
      <Link
        component="button"
        variant="body1"
        underline="hover"
        color="inherit"
        onClick={() => router.push('/')}
      >
        {routeTranslations['home']}
      </Link>

      {pathnames.map((value, index) => {
        const label = formatLabel(value, index, pathnames);

        if (!label) return null;

        const isLast =
          index === pathnames.length - 1 || pathnames[index + 1] === 'edit';

        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        return isLast ? (
          <Typography
            key={routeTo}
            variant="body1"
            color="text.primary"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={routeTo}
            component="button"
            variant="body1"
            underline="hover"
            color="inherit"
            sx={{
              fontWeight: 'bold',
            }}
            onClick={() => router.push(routeTo)}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
