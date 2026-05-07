'use client';
import { Box, Card, CardContent, Typography } from '@mui/material';

export function ContentLayoutComponent({
  title,
  children,
  description,
}: {
  title: string;
  children: React.ReactNode;
  description?: string;
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
      </CardContent>
    </Card>
  );
}
