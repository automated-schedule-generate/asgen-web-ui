'use client';

import { useState } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';

const routeTranslations: Record<string, string> = {
  home: 'Início',
  dashboard: 'Painel',
  subjects: 'Disciplinas',
  create: 'Adicionar',
  classes: 'Turmas',
  courses: 'Cursos',
  semesters: 'Semestres',
  teachers: 'Professores',
  preferences: 'Preferências',
  functions: 'Gestão de funções',
};

export default function AutoBreadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const isEditPage = pathname.endsWith('/edit') || pathname.endsWith('/create');

  const pathnames = pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const formatLabel = (value: string, index: number, array: string[]) => {
    const isId = /^[0-9a-fA-F-]{36}$/.test(value) || !isNaN(Number(value));
    const nextSegment = array[index + 1];
    const prevSegment = array[index - 1];
    const prevIsId =
      prevSegment &&
      (/^[0-9a-fA-F-]{36}$/.test(prevSegment) || !isNaN(Number(prevSegment)));

    if (isId) {
      return nextSegment === 'edit' ? 'Editar' : 'Detalhes';
    }
    if (value === 'edit') {
      return prevIsId ? '' : 'Editar';
    }
    if (value === 'teachers' && nextSegment === 'preferences') {
      return '';
    }
    return (
      routeTranslations[value] || value.charAt(0).toUpperCase() + value.slice(1)
    );
  };

  const handleNavigate = (route: string) => {
    if (isEditPage) {
      setPendingRoute(route);
    } else {
      router.push(route);
    }
  };

  return (
    <>
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
          onClick={() => handleNavigate('/')}
        >
          {routeTranslations['home']}
        </Link>

        {pathnames.map((value, index) => {
          const label = formatLabel(value, index, pathnames);

          if (!label) return null;

          const isId =
            /^[0-9a-fA-F-]{36}$/.test(value) || !isNaN(Number(value));
          const isLast =
            index === pathnames.length - 1 ||
            (pathnames[index + 1] === 'edit' && isId);

          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

          return isLast ? (
            <Typography
              key={routeTo}
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 'bold' }}
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
              sx={{ fontWeight: 'bold' }}
              onClick={() => handleNavigate(routeTo)}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>

      <ConfirmDialog
        open={!!pendingRoute}
        title="Sair sem salvar?"
        content="As alterações não salvas serão perdidas. Deseja continuar?"
        onConfirm={() => {
          if (pendingRoute) router.push(pendingRoute);
          setPendingRoute(null);
        }}
        onCancel={() => setPendingRoute(null)}
      />
    </>
  );
}
