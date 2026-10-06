'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { FiCheck } from 'react-icons/fi';
import { cn } from '@/utils/Cn';

export function Checkbox(props: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={cn(
        'peer size-5 shrink-0 rounded border border-gray-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-[#006ce4] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#006ce4] data-[state=checked]:bg-[#006ce4] data-[state=checked]:text-white',
        props.className,
      )}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <FiCheck className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
