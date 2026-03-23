import React, { useState } from 'react';
import { Award, TrendingDown, Clock, Users, ChevronRight } from 'lucide-react';

/**
 * SuccessStoryBadge - Small inline badge showing a key metric from a success story
 * Use near form fields, labels, or inline with text to provide quick social proof
 *
 * Types:
 * - savings: Shows cost savings (green)
 * - time: Shows time savings (blue)
 * - scale: Shows scale/users (purple)
 * - efficiency: Shows efficiency gains (amber)
 */
export default function SuccessStoryBadge({
  type = 'savings',
  value,
  label,
  company,
  onClick,
  size = 'sm',
  showCompany = false,
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false);

  const typeConfig = {
    savings: {
      icon: TrendingDown,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
      iconColor: 'text-green-600',
      hoverBg: 'hover:bg-green-200'
    },
    time: {
      icon: Clock,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-300',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-200'
    },
    scale: {
      icon: Users,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-300',
      iconColor: 'text-purple-600',
      hoverBg: 'hover:bg-purple-200'
    },
    efficiency: {
      icon: Award,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-300',
      iconColor: 'text-amber-600',
      hoverBg: 'hover:bg-amber-200'
    }
  };

  const config = typeConfig[type] || typeConfig.savings;
  const Icon = config.icon;

  const sizeClasses = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full border font-medium
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizeClasses[size]}
        ${onClick ? `cursor-pointer ${config.hoverBg}` : ''}
        transition-all duration-150
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={company ? `${company}: ${value} ${label}` : `${value} ${label}`}
    >
      <Icon className={`w-3 h-3 ${config.iconColor}`} />
      <span className="font-bold">{value}</span>
      {label && <span className="opacity-75">{label}</span>}
      {showCompany && company && (
        <span className="opacity-60 text-[10px]">- {company}</span>
      )}
      {onClick && isHovered && (
        <ChevronRight className="w-3 h-3 opacity-60" />
      )}
    </span>
  );
}
