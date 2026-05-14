import { CourseType } from '../../courses/_schemas/course.schema';

export interface Subject {
  id: string;
  name: string;
  workload: number;
  is_optional: boolean;
  prerequisite_id?: string;
  prerequisite?: Subject;
  course_id?: string;
  course?: CourseType;
  teachers: {
    user: {
      name: string;
    };
  }[];
}
