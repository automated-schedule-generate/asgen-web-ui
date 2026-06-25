import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { PreferencesForm } from '../../../../_components/preferences-form.component';

export default function EditPreferencesPage() {
  return (
    <ContentLayoutComponent
      title="Editar preferências"
      description="Atualize suas preferências de horários"
    >
      <PreferencesForm />
    </ContentLayoutComponent>
  );
}
