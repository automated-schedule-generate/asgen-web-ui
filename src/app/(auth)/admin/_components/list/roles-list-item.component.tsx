'use client';
import React, { useState } from 'react';
import { Edit2, Trash2, FileText } from 'lucide-react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import type { RoleType } from '../../_schemas/role.schema';
import { EditRoleDialog } from '../edit-role-dialog.component';

interface RolesListItemComponentProps {
  role: RoleType;
  onDelete: (id: string) => void;
  onUpdated: () => void;
}

export function RolesListItemComponent({
  role,
  onDelete,
  onUpdated,
}: RolesListItemComponentProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Box className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 px-8 border-b border-slate-100 hover:bg-slate-50/50 transition-colors last:border-b-0">
        <Box className="flex items-start gap-5 flex-1">
          {/* Deep blue icon container */}
          <Box className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#03017D] text-white flex-shrink-0">
            <FileText size={22} strokeWidth={2} />
            {/* Status dot */}
            <Box className="absolute -bottom-1 -right-1 bg-white rounded-full p-[3px]">
              <Box className="w-2.5 h-2.5 bg-[#03017D] rounded-full" />
            </Box>
          </Box>

          <Box className="flex-1 mt-0.5">
            <Typography
              variant="h6"
              className="font-bold text-[#03017D] leading-tight mb-1"
              sx={{ fontSize: '1.1rem' }}
            >
              {role.name}
            </Typography>
            {role.description ? (
              <Typography
                variant="body2"
                className="text-slate-400 leading-relaxed line-clamp-2 max-w-3xl"
              >
                {role.description}
              </Typography>
            ) : (
              <Typography variant="body2" className="text-slate-300 italic">
                Sem descrição fornecida.
              </Typography>
            )}
          </Box>
        </Box>

        <Box className="flex items-center gap-6">
          <Box className="hidden lg:flex flex-col items-center">
            <Typography className="text-[9px] uppercase tracking-widest font-bold text-sky-300 mb-1">
              Registro
            </Typography>
            <Typography className="text-xs font-bold text-slate-500 border border-slate-200 bg-white px-3 py-1 rounded-full min-w-[60px] text-center">
              {role.id.split('-').pop()?.substring(0, 3) || '000'}
            </Typography>
          </Box>

          <Box className="flex items-center gap-1">
            <Tooltip title="Editar Cargo" placement="top">
              <IconButton
                onClick={() => setIsEditOpen(true)}
                className="text-slate-300 hover:text-[#03017D] transition-colors"
                size="small"
              >
                <Edit2 size={18} strokeWidth={2.5} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir Cargo" placement="top">
              <IconButton
                onClick={() => onDelete(role.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors"
                size="small"
              >
                <Trash2 size={18} strokeWidth={2.5} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <EditRoleDialog
        role={role}
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdated={onUpdated}
      />
    </>
  );
}
