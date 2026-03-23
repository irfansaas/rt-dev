import React, { useState } from 'react';
import { Server, Package, HardDrive, DollarSign, Zap, ChevronRight } from 'lucide-react';

/**
 * PartnerBadge - Small inline badge showing a partner recommendation
 * Use near form fields or inline with text to highlight partner value
 *
 * Types match partner categories:
 * - compute: Nerdio (purple)
 * - application: Recast (orange)
 * - endpoints: IGEL/10ZiG (blue)
 * - storage: NetApp (teal)
 * - azure: Archera (green)
 * - migration: Juriba (indigo)
 */
export default function PartnerBadge({
  partner, // 'nerdio', 'recast', 'igel', 'netapp', 'archera', 'juriba'
  value,
  label,
  onClick,
  size = 'sm',
  showPartnerName = true,
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false);

  const partnerConfig = {
    nerdio: {
      name: 'Nerdio',
      icon: Server,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-300',
      iconColor: 'text-purple-600',
      hoverBg: 'hover:bg-purple-200'
    },
    recast: {
      name: 'Recast',
      icon: Package,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-300',
      iconColor: 'text-orange-600',
      hoverBg: 'hover:bg-orange-200'
    },
    igel: {
      name: 'IGEL',
      icon: HardDrive,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-300',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-200'
    },
    tenzig: {
      name: '10ZiG',
      icon: HardDrive,
      bgColor: 'bg-sky-100',
      textColor: 'text-sky-800',
      borderColor: 'border-sky-300',
      iconColor: 'text-sky-600',
      hoverBg: 'hover:bg-sky-200'
    },
    netapp: {
      name: 'NetApp',
      icon: HardDrive,
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-800',
      borderColor: 'border-teal-300',
      iconColor: 'text-teal-600',
      hoverBg: 'hover:bg-teal-200'
    },
    archera: {
      name: 'Archera',
      icon: DollarSign,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
      iconColor: 'text-green-600',
      hoverBg: 'hover:bg-green-200'
    },
    juriba: {
      name: 'Juriba',
      icon: Zap,
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-800',
      borderColor: 'border-indigo-300',
      iconColor: 'text-indigo-600',
      hoverBg: 'hover:bg-indigo-200'
    }
  };

  const config = partnerConfig[partner] || partnerConfig.nerdio;
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
      title={`${config.name}: ${value} ${label || ''}`}
    >
      <Icon className={`w-3 h-3 ${config.iconColor}`} />
      {showPartnerName && <span className="opacity-75">{config.name}</span>}
      {value && <span className="font-bold">{value}</span>}
      {label && <span className="opacity-75">{label}</span>}
      {onClick && isHovered && (
        <ChevronRight className="w-3 h-3 opacity-60" />
      )}
    </span>
  );
}
