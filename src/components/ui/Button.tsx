import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4',
  {
    variants: {
      variant: {
        default: 'bg-green-300 text-green-950 hover:bg-green-200',
        outline: 'border border-white/20 bg-transparent text-stone-100 hover:bg-white/10',
        ghost: 'bg-transparent text-stone-200 hover:bg-white/10 hover:text-stone-50',
        accent:
          'bg-mtk-500 text-white hover:bg-mtk-400 hover:text-green-950',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'px-3 py-1.5 text-xs',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
