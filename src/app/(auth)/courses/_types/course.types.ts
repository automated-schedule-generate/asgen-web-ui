import type { SubjectType } from '../../subjects/_schemas/subject.schema';

export interface CourseData {
  id: string;
  name: string;
  class_time: string | number;
  total_semesters: string | number;
  subjects?: SubjectType[];
}

export interface CourseItemProps {
  course: CourseData;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  onDeleteSubject: (subjectId: string, courseId: string) => Promise<void>;
  index: number;
}
