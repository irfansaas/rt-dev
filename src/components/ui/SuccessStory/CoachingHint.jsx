import React, { useState } from 'react';
import {
  Lightbulb,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Quote,
  Target,
  AlertCircle,
  Sparkles,
  Building2
} from 'lucide-react';

/**
 * CoachingHint - Contextual coaching for sales reps
 * Provides discovery questions, objection handling, and relevant proof points
 *
 * Types:
 * - discovery: Discovery question prompts
 * - objection: Objection handling tips
 * - proof: Social proof suggestions
 * - tip: General sales tips
 */
export default function CoachingHint({
  type = 'tip',
  title,
  content,
  questions = [],
  proofPoint,
  collapsible = true,
  defaultExpanded = false,
  ntentDimension,
  className = ''
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const typeConfig = {
    discovery: {
      icon: MessageCircle,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-800',
      label: 'Discovery'
    },
    objection: {
      icon: AlertCircle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-800',
      label: 'Objection Tip'
    },
    proof: {
      icon: Target,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-500',
      titleColor: 'text-green-800',
      label: 'Social Proof'
    },
    tip: {
      icon: Lightbulb,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-500',
      titleColor: 'text-purple-800',
      label: 'Sales Tip'
    },
    insight: {
      icon: Sparkles,
      bgColor: 'bg-nerdio-light',
      borderColor: 'border-nerdio-primary/30',
      iconColor: 'text-nerdio-primary',
      titleColor: 'text-nerdio-dark',
      label: 'Insight'
    }
  };

  const config = typeConfig[type] || typeConfig.tip;
  const Icon = config.icon;

  const showContent = !collapsible || expanded;

  return (
    <div
      className={`
        rounded-lg border p-3
        ${config.bgColor} ${config.borderColor}
        ${className}
      `}
    >
      <button
        type="button"
        onClick={() => collapsible && setExpanded(!expanded)}
        className={`
          flex items-center justify-between w-full text-left
          ${collapsible ? 'cursor-pointer' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${config.iconColor}`} />
          <span className={`text-xs font-semibold uppercase tracking-wide ${config.titleColor}`}>
            {config.label}
          </span>
          {ntentDimension && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 font-medium">
              NTENT: {ntentDimension}
            </span>
          )}
        </div>
        {collapsible && (
          expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )
        )}
      </button>

      {showContent && (
        <div className="mt-2 space-y-2">
          {title && (
            <p className={`text-sm font-medium ${config.titleColor}`}>
              {title}
            </p>
          )}

          {content && (
            <p className="text-sm text-gray-700">
              {content}
            </p>
          )}

          {questions.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase">Ask:</p>
              <ul className="space-y-1">
                {questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <MessageCircle className="w-3 h-3 mt-1 text-gray-400 flex-shrink-0" />
                    <span className="italic">"{q}"</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {proofPoint && (
            <div className="mt-2 p-2 bg-white/50 rounded border border-white">
              <div className="flex items-start gap-2">
                <Quote className="w-3 h-3 mt-1 text-gray-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="italic text-gray-600">"{proofPoint.quote}"</p>
                  <p className="mt-1 text-gray-500">
                    <span className="font-medium">{proofPoint.person}</span>
                    {proofPoint.title && `, ${proofPoint.title}`}
                    {proofPoint.company && (
                      <span className="flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" />
                        {proofPoint.company}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * CoachingHintCompact - Ultra-compact version for inline use
 */
export function CoachingHintCompact({
  text,
  type = 'tip',
  className = ''
}) {
  const icons = {
    discovery: MessageCircle,
    objection: AlertCircle,
    proof: Target,
    tip: Lightbulb,
    insight: Sparkles
  };

  const colors = {
    discovery: 'text-blue-500',
    objection: 'text-amber-500',
    proof: 'text-green-500',
    tip: 'text-purple-500',
    insight: 'text-nerdio-primary'
  };

  const Icon = icons[type] || Lightbulb;

  return (
    <span
      className={`
        inline-flex items-center gap-1 text-xs text-gray-600
        ${className}
      `}
      title={text}
    >
      <Icon className={`w-3 h-3 ${colors[type]}`} />
      <span>{text}</span>
    </span>
  );
}
