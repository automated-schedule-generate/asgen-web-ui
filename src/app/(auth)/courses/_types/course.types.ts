export interface Subject {
  id: string;
  name?: string;
  titulo?: string;
  nome?: string;
}

export interface CourseData {
  id: string;
  name: string;
  total_semesters: number;
  class_time: string;
  subjects?: Subject[];
}

export interface CourseItemProps {
  course: CourseData;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  onDeleteSubject: (subjectId: string, courseId: string) => Promise<void>;
  index: number;
}
