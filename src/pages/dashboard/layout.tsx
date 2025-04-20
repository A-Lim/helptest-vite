import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ScrollArea className="h-full w-full p-4">{children}</ScrollArea>;
}
