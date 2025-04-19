import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Info } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export default function Subscription({ className }: { className?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'bg-card w-3xl text-card-foreground border shadow-sm',
            className,
          )}
        >
          <div className="p-2.5 cursor-pointer">
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <Info
                  className="font-bold text-red-700"
                  size={16}
                  strokeWidth={2.5}
                />
                <span className="text-sm text-muted-foreground">
                  Valid: 1 Jan 2025 - 31 Dec 2025
                </span>
              </div>

              <Badge variant="outline">3 Months Left</Badge>
            </div>

            <Progress className="mt-2" value={33} />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={4}
        align="start"
        className="focus-visible:outline-0"
      >
        <div className="bg-card text-card-foreground p-2 divide-x-2 shadow-sm flex">
          <div className="flex flex-col gap-1 px-2 ">
            <p className="text-sm">Remaining</p>
            <div className="flex gap-1 items-baseline">
              <span className="text-2xl font-semibold">11</span>
              <span>hrs</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-2 ">
            <p className="text-sm">Remaining</p>
            <div className="flex gap-1 items-baseline">
              <span className="text-2xl font-semibold">11</span>
              <span>hrs</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-2 ">
            <p className="text-sm">Remaining</p>
            <div className="flex gap-1 items-baseline">
              <span className="text-2xl font-semibold">11</span>
              <span>hrs</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-2 ">
            <p className="text-sm">Remaining</p>
            <div className="flex gap-1 items-baseline">
              <span className="text-2xl font-semibold">11</span>
              <span>hrs</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
