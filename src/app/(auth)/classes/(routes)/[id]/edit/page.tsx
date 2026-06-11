import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { getClassById } from '../../../_services/classes.service';
import { getAllCourses } from '@/app/(auth)/courses/_services/courses.service';
import { getAllSemesters } from '@/app/(auth)/semesters/_services/semesters.service';
import ClassesEditFormComponent from '../../../_components/classes-edit-form.component';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: classe } = await getClassById(id);

  const { data: coursesData } = await getAllCourses({ limit: 100 });
  const { data: semestersData } = await getAllSemesters({ limit: 100 });

  return (
    <ContentLayoutComponent
      title="Edição de turma"
      description={`Gerenciar informações da turma ${classe?.identify}`}
    >
      {classe && (
        <ClassesEditFormComponent
          classe={classe}
          courses={coursesData.items}
          semesters={semestersData.items}
        />
      )}
      {!classe && <div>Turma não encontrada.</div>}
    </ContentLayoutComponent>
  );
}
