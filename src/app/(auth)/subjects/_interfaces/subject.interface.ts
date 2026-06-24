import { CourseType } from '../../courses/_schemas/course.schema';
import { SubjectType } from '../_schemas/subject.schema';

export interface Subject extends SubjectType {
  id: string;
  prerequisite?: Subject;
  course: CourseType;
  teachers: {
    user_id: string;
    user: {
      name: string;
    };
  }[];
}
