import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { PreferencesView } from '../../../_components/preferences-view.component';

export default function PreferencesPage() {
  return (
    <ContentLayoutComponent
      title="Preferências"
      description="Visualize suas preferências de horários"
    >
      <PreferencesView />
    </ContentLayoutComponent>
  );
}
