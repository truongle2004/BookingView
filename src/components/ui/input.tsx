import { cn } from '@/utils/Cn';

export function Input(props: React.ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={cn(
        'h-10 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        props.className,
      )}
    />
  );
}
