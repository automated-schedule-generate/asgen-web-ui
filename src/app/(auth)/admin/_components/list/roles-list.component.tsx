'use client';
import { Box, Typography } from '@mui/material';
import { RolesListItemComponent } from './roles-list-item.component';
import type { RoleType } from '../../_schemas/role.schema';

interface RolesListComponentProps {
  roles: RoleType[];
  onDelete: (id: string) => void;
  onUpdated: () => void;
}

export function RolesListComponent({
  roles,
  onDelete,
  onUpdated,
}: RolesListComponentProps) {
  if (roles.length === 0) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        className="text-center py-4"
      >
        Nenhum cargo cadastrado ainda.
      </Typography>
    );
  }

  return (
    <Box className="flex flex-col border border-slate-100/80 rounded-3xl overflow-hidden bg-white">
      {/* Table Header */}
      <Box className="hidden md:flex items-center justify-between bg-sky-50/60 border-b border-sky-100 py-3 px-8 text-[10px] font-bold text-[#03017D] uppercase tracking-widest">
        <Box className="flex-1 pl-[68px]">Cargo e Detalhes</Box>
        <Box className="flex items-center gap-6">
          <Box className="hidden lg:block w-[60px] text-center">Código</Box>
          <Box className="w-[68px] text-center">Ações</Box>
        </Box>
      </Box>

      {/* List Items */}
      {roles.map((role) => (
        <RolesListItemComponent
          key={role.id}
          role={role}
          onDelete={onDelete}
          onUpdated={onUpdated}
        />
      ))}
    </Box>
  );
}
