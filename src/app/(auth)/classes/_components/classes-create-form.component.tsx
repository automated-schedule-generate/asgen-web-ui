'use client';

import { useRouter } from 'next/navigation';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  TextField,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseData } from '../../courses/_types/course.types';
import { Cancel, Save } from '@mui/icons-material';
import { classSchema, ClassType } from '../_schemas/class.schema';
import { createClass } from '../_services/classes.service';
import { Controller } from 'react-hook-form';
import { Semester } from '../../semesters/_interfaces/semester.interface';
import { toast } from 'react-toastify';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { useState } from 'react';

export function ClassesCreateFormComponent({
  courses,
  semesters,
  open,
  onClose,
  onSuccess,
}: {
  courses: CourseData[];
  semesters: Semester[];
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithZod(classSchema);

  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const router = useRouter();

  const handleConfirmCancel = () => {
    reset();
    onClose();
    setCancelConfirmOpen(false);
    router.push('/classes');
  };

  async function submit(data: ClassType) {
    const toastId = toast.loading('Criando turma...');
    try {
      await createClass(data);
      reset();
      onSuccess();
      onClose();
      toast.update(toastId, {
        type: 'success',
        render: 'Turma criada com sucesso!',
        isLoading: false,
        autoClose: 1500,
      });
    } catch {
      toast.update(toastId, {
        type: 'error',
        render: 'Erro ao criar turma!',
        isLoading: false,
        autoClose: 1000,
      });
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { height: '100vh' } } }}
    >
      <DialogTitle>Nova Turma</DialogTitle>
      <form
        onSubmit={handleSubmit(submit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <DialogContent dividers sx={{ flex: 1, overflowY: 'auto' }}>
          <Box className="flex flex-col gap-4">
            <FormInput
              name="identify"
              label="Nome"
              id="identify"
              placeholder="Digite o nome da turma"
              type="text"
              control={control}
              required
            />
            <Controller
              name="course_id"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormLabel>
                    Curso
                    <Typography component="span" color="error" aria-hidden>
                      {' *'}
                    </Typography>
                  </FormLabel>
                  <Autocomplete
                    disablePortal
                    options={courses.map((course: CourseData) => ({
                      label: course.name,
                      value: course.id,
                    }))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Selecione um curso"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    onChange={(_event, value) => field.onChange(value?.value)}
                  />
                </>
              )}
            />
            <Box className="flex gap-3">
              <Box className="flex flex-col flex-1">
                <FormInput
                  name="course_semester"
                  label="Período do Curso"
                  id="course_semester"
                  placeholder="Digite o período"
                  type="number"
                  control={control}
                  required
                />
              </Box>
              <Box className="flex flex-col flex-1">
                <Controller
                  name="shift"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormLabel>
                        Turno
                        <Typography component="span" color="error" aria-hidden>
                          {' *'}
                        </Typography>
                      </FormLabel>
                      <FormControl fullWidth>
                        <Select
                          value={field.value ?? ''}
                          onChange={(event) =>
                            field.onChange(event.target.value)
                          }
                          displayEmpty
                          renderValue={(value) =>
                            value ? (
                              value.charAt(0) + value.slice(1).toLowerCase()
                            ) : (
                              <span style={{ color: 'rgba(0,0,0,0.4)' }}>
                                Selecione um turno
                              </span>
                            )
                          }
                        >
                          <MenuItem value="" disabled>
                            Selecione um turno
                          </MenuItem>
                          <MenuItem value="MATUTINO">Matutino</MenuItem>
                          <MenuItem value="VESPERTINO">Vespertino</MenuItem>
                          <MenuItem value="NOTURNO">Noturno</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                />
              </Box>
            </Box>
            <Controller
              name="semester_id"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormLabel>
                    Semestre letivo
                    <Typography component="span" color="error" aria-hidden>
                      {' *'}
                    </Typography>
                  </FormLabel>
                  <Autocomplete
                    disablePortal
                    options={semesters.map((semester: Semester) => ({
                      label: semester.year + '.' + semester.semester,
                      value: semester.id,
                    }))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Selecione um semestre"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    onChange={(_event, value) => field.onChange(value?.value)}
                  />
                </>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="error"
            startIcon={<Cancel />}
            onClick={() => setCancelConfirmOpen(true)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            variant="contained"
            color="secondary"
            endIcon={<Save />}
          >
            Salvar
          </Button>
        </DialogActions>
      </form>
      <ConfirmDialogBlue
        open={cancelConfirmOpen}
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelConfirmOpen(false)}
        title="Cancelar"
        content="Tem certeza de que deseja cancelar? Se confirmar, seu progresso não será salvo."
      />
    </Dialog>
  );
}
