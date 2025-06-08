import { PropsWithChildren } from 'react';

export function DashboardLayout({ children }: PropsWithChildren) {
  return <div className="h-full w-full p-4 bg-gray-100">{children}</div>;
}
