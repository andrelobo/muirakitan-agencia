import {
  Bot,
  BrainCircuit,
  Calculator,
  Globe,
  MonitorSmartphone,
  PlugZap,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  monitor: MonitorSmartphone,
  workflow: Workflow,
  brain: BrainCircuit,
  plug: PlugZap,
  calculator: Calculator,
  bot: Bot,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Globe;
  return <Icon className={className} aria-hidden="true" />;
}
