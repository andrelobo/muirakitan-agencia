import { cn } from '../lib/cn';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src="/brand/assets/svg/logo-horizontal-dark.svg"
      alt="Muirakitan Tecnologia"
      width={576}
      height={170}
      className={cn('h-auto w-[210px] sm:w-[240px]', className)}
    />
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/assets/svg/logo-mark.svg"
      alt=""
      width={100}
      height={100}
      className={cn('h-9 w-9', className)}
    />
  );
}
