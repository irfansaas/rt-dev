import React from 'react';
import { Check, TrendingUp, Zap, Shield, Clock } from 'lucide-react';

/**
 * QuickWinIndicator - Ultra-compact inline indicators for quick social proof
 * Perfect for appearing next to form fields or in lists
 *
 * Example usage:
 * <QuickWinIndicator text="62% avg savings" icon="check" />
 * <QuickWinIndicator text="14-day migration possible" icon="clock" />
 */
export default function QuickWinIndicator({
  text,
  icon = 'check',
  variant = 'subtle',
  tooltip,
  className = ''
}) {
  const icons = {
    check: Check,
    trending: TrendingUp,
    zap: Zap,
    shield: Shield,
    clock: Clock
  };

  const Icon = icons[icon] || Check;

  const variants = {
    subtle: 'text-gray-500 bg-gray-50',
    success: 'text-green-600 bg-green-50',
    info: 'text-blue-600 bg-blue-50',
    warning: 'text-amber-600 bg-amber-50',
    accent: 'text-nerdio-primary bg-nerdio-light'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded
        ${variants[variant]}
        ${className}
      `}
      title={tooltip || text}
    >
      <Icon className="w-3 h-3" />
      <span>{text}</span>
    </span>
  );
}

/**
 * QuickWinList - Display multiple quick wins in a compact format
 */
export function QuickWinList({ wins, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {wins.map((win, i) => (
        <QuickWinIndicator
          key={i}
          text={win.text}
          icon={win.icon}
          variant={win.variant}
          tooltip={win.tooltip}
        />
      ))}
    </div>
  );
}
