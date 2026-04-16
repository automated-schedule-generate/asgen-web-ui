import React from 'react';
import { DefaultAppBar } from './_components/app-bar.component';
import { UserProvider } from '@/contexts/user.context';
import { me } from './auth/_services/auth.service';
import { DrawerMenu } from './_components/drawer-menu.component';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function CustomLayout({ children }: LayoutProps) {
  const user = await me();
  return (
    <div className="layout-container">
      <UserProvider currentUser={user}>
        <DefaultAppBar />
        <DrawerMenu />
        <main className="main-content">{children}</main>
      </UserProvider>
    </div>
  );
}
