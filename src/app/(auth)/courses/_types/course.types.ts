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
  type: 'INTEGRADO' | 'SUBSEQUENTE' | 'SUPERIOR' | 'OUTRO';
  subjects?: Subject[];
}
