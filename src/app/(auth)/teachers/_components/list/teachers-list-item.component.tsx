'use client';
import { useRouter } from 'next/navigation';
import { Visibility } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

interface TeachersListItemComponentProps {
  name: string;
  id: string;
}
export function TeachersListItemComponent({
  name,
  id,
}: TeachersListItemComponentProps) {
  const router = useRouter();
  return (
    <Card elevation={0} variant="outlined" className="!p-0">
      <CardContent className="flex flex-row items-center justify-between !px-2 !py-0">
        <Typography color="secondary" variant="body1">
          {name}
        </Typography>
        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Visibility />}
            onClick={() => router.push(`/teachers/${id}`)}
          >
            Mais informações
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
