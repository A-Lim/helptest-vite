import { PropsWithChildren } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <ScrollArea className="h-full w-full p-4 bg-gray-100">
      {children}
    </ScrollArea>
  );
}
