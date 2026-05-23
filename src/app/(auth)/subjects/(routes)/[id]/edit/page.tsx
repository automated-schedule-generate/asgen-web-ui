import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import {
  getAllSubjects,
  getSubjectById,
} from '../../../_services/subjects.service';
import SubjectsEditFormComponent from '../../../_components/subjects-edit-form.component';
import { getAllCourses } from '@/app/(auth)/courses/_services/courses.service';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getSubjectById(id);

  let subject = null;
  if (data) {
    subject = data;
  }

  const { data: subjects } = await getAllSubjects();
  const { data: courses } = await getAllCourses();

  return (
    <ContentLayoutComponent
      title="Edição de disciplina"
      description={`Gerenciar informações da disciplina ${subject?.name}`}
    >
      {subject && (
        <SubjectsEditFormComponent
          subject={subject}
          subjects={subjects.items}
          courses={courses.items}
        />
      )}
      {!subject && <div>Error</div>}
    </ContentLayoutComponent>
  );
}
