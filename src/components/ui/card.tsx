import { cn } from '@/utils/Cn';

export function Card(props: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn('rounded-xl border border-gray-200 bg-white shadow-sm', props.className)}
    />
  );
}

export function CardHeader(props: React.ComponentProps<'div'>) {
  return <div {...props} className={cn('flex flex-col gap-1.5 p-5', props.className)} />;
}

export function CardTitle(props: React.ComponentProps<'h3'>) {
  return <h3 className={cn('font-bold leading-none', props.className)}>{props.children}</h3>;
}

export function CardDescription(props: React.ComponentProps<'p'>) {
  return <p {...props} className={cn('text-sm leading-6 text-gray-600', props.className)} />;
}
