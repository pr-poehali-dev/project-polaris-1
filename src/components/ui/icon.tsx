import { icons } from 'lucide-react';

interface IconProps {
  name: string;
  fallback?: string;
  size?: number;
  className?: string;
}

const Icon = ({ name, fallback, size = 24, className }: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons] ?? (fallback ? icons[fallback as keyof typeof icons] : null);

  if (!LucideIcon) return null;

  return <LucideIcon size={size} className={className} />;
};

export default Icon;
