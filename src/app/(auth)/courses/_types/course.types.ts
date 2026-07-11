import type { Subject } from '../../subjects/_interfaces/subject.interface';
import { TimetableEntry } from '../../timetable/types/timetable-entry.type';
import { CourseType } from '../_schemas/course.schema';

export interface CourseData extends CourseType {
  id: string;
  subjects?: Subject[];

  //timetable generated info
  readonly timetable_entries?: (TimetableEntry | null)[][][];
  readonly unassigned?: TimetableEntry[];
  readonly timetable_generated_at?: Date;
}
