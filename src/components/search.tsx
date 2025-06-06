import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function SearchInput({
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <div className="relative">
      <Search className="size-4 absolute left-2 top-2.5 text-muted-foreground" />
      <Input {...props} className={cn(props.className, 'bg-white pl-8')} />
    </div>
  );
}
