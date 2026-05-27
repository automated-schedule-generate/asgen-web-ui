import type { Subject } from '../../subjects/_interfaces/subject.interface';
import { CourseType } from '../_schemas/course.schema';

export interface CourseData extends CourseType {
  id: string;
  subjects?: Subject[];
}
