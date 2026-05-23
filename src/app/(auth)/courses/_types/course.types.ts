import type { Subject } from '../../subjects/_interfaces/subject.interface';
import { CourseType } from '../_schemas/course.schema';
export interface CourseData {
  id: string;
  name: string;
  class_time: string | number;
  total_semesters: string | number;
  subjects?: Subject[];
}
