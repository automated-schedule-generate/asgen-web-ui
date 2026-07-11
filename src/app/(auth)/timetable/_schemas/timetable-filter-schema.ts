import { z } from 'zod';

export const TimetableFilterSchema = z.object({
  course_id: z.string(),
});

export type TimetableFilterType = z.infer<typeof TimetableFilterSchema>;
