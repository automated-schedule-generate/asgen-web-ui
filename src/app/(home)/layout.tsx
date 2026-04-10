import React from 'react';
import { HomeAppBar } from './_components/app-bar.component';

interface LayoutProps {
  children: React.ReactNode;
}

export default function CustomLayout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <HomeAppBar />
      <main>{children}</main>
    </div>
  );
}
