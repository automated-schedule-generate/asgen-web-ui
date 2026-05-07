import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { PreferencesForm } from '../../_components/preferences-form.component';

export default function preferences() {
  return (
    <>
      <ContentLayoutComponent
        title={'Preferências'}
        description={'Defina suas preferências de horários'}
      >
        <PreferencesForm />
      </ContentLayoutComponent>
    </>
  );
}
