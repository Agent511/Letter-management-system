import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  </div>
);