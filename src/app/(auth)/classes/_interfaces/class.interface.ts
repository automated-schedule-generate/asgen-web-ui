import { CourseType } from '../../courses/_schemas/course.schema';
import { ClassType } from '../_schemas/class.schema';
import { SemesterType } from '../../semesters/_schemas/semester.schema';

export interface Class extends ClassType {
  id: string;
  course: CourseType;
  semester: SemesterType;
}
