import { PreferencesType } from '../_schemas/preferences.schema';
import { TeacherType } from '../_schemas/teacher.schema';

export type TeacherListType = (TeacherType & PreferencesType)[];
