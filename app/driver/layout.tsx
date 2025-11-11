'use client';

import { DriverAuthProvider } from '@/app/context/DriverAuthContext';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DriverAuthProvider>{children}</DriverAuthProvider>;
}

