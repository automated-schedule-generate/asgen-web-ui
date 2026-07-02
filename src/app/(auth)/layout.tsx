import React from 'react';
import { unstable_rethrow } from 'next/navigation';
import { DefaultAppBar } from './_components/app-bar.component';
import { UserProvider } from '@/contexts/user.context';
import { me } from './auth/_services/auth.service';
import { DrawerMenu } from './_components/drawer-menu.component';
import AutoBreadcrumbs from './_components/breadcrumb.component';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function CustomLayout({ children }: LayoutProps) {
  let user = null;
  try {
    user = await me();
  } catch (error) {
    unstable_rethrow(error);
    console.error('Auth layout error (backend might be offline):', error);
  }
  return (
    <div className="layout-container">
      <UserProvider currentUser={user}>
        <DefaultAppBar />
        <DrawerMenu />
        <main className="main-content">
          <AutoBreadcrumbs />
          {children}
        </main>
      </UserProvider>
    </div>
  );
}
