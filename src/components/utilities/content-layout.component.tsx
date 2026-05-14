'use client';
import {
  Box,
  Card,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';

export function ContentLayoutComponent({
  title,
  children,
  description,
  hasPagination,
  count = 1,
  page = 1,
  onChange,
}: {
  title: string;
  children: React.ReactNode;
  description?: string;
  hasPagination?: boolean;
  count?: number;
  page?: number;
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <CardContent
        className="flex flex-col gap-10"
        sx={{ color: 'secondary.main' }}
      >
        <Box className="flex flex-col gap-1">
          <Typography variant="h5">{title}</Typography>
          {description && (
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>

        {children}

        {hasPagination && (
          <Box>
            <Stack spacing={2}>
              <Pagination
                count={count}
                page={page}
                onChange={onChange}
                color="primary"
              />
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
