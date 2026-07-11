export const dynamic = 'force-dynamic';

import React from 'react';
import { redirect } from 'next/navigation';
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
    console.warn('Auth layout error (backend might be offline):', error);
  }
  // O middleware (src/proxy.ts) intercepta este flag: apaga o cookie `token`
  // (evitando o loop `/` -> `/dashboard`) e deixa a landing exibir o toast.
  if (!user) {
    redirect('/?error=user-fetch');
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
