import { z } from 'zod';

export const TimetableFilterSchema = z.object({
  course_id: z.string(),
  course_semester: z.string().optional(),
  semester_id: z.string().optional(),
});

export type TimetableFilterType = z.infer<typeof TimetableFilterSchema>;
