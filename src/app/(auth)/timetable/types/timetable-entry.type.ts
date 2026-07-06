export enum ShiftEnum {
  MORNING = 'MATUTINO',
  AFTERNOON = 'VESPERTINO',
  NIGHT = 'NOTURNO',
}

export interface TimetableEntry {
  id: string;
  timetable_id: string;
  course_id: string;
  course_semester: number;
  shift: ShiftEnum | null;
  day: string | null;
  slot_index: number | null;
  subject_id: string;
  teacher_id: string | null;
  subject_name: string;
  teacher_name: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
