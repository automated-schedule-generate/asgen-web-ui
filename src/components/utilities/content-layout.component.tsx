'use client';
import { Card, CardContent, Typography } from '@mui/material';

export function ContentLayoutComponent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <CardContent className="flex flex-col gap-4">
        <Typography variant="h5">{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}
