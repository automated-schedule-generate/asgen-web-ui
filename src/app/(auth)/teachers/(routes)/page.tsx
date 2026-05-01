import { getTeachers } from '../_services/teacher.service';
import { TeachersListComponent } from '../_components/list/teachers-list.component';
import type { TeacherListType } from '../_types/teacher-list.type';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { SearchBarComponent } from '@/components/utilities/search-bar.component';

export default async function TeachersPage() {
  const { data } = await getTeachers();
  const teachers = data.items as TeacherListType;

  return (
    <div>
      <ContentLayoutComponent title="Docentes Ativos">
        <SearchBarComponent />
        <TeachersListComponent teachers={teachers || []} />
      </ContentLayoutComponent>
    </div>
  );
}
