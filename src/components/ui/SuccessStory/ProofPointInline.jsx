import React, { useState } from 'react';
import { ExternalLink, Quote, Building2, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * ProofPointInline - Inline social proof that expands to show details
 * Perfect for field labels, section headers, or inline with explanatory text
 *
 * Example: "Cost Savings <ProofPointInline stat="62%" context="avg Citrix migration savings" />"
 */
export default function ProofPointInline({
  stat,
  context,
  company,
  quote,
  quotePerson,
  quoteTitle,
  expandable = true,
  variant = 'default',
  className = ''
}) {
  const [expanded, setExpanded] = useState(false);

  const variants = {
    default: {
      badge: 'bg-nerdio-light text-nerdio-dark border-nerdio-primary/30',
      expanded: 'bg-nerdio-light/50 border-nerdio-primary/20'
    },
    success: {
      badge: 'bg-green-50 text-green-800 border-green-300',
      expanded: 'bg-green-50/50 border-green-200'
    },
    info: {
      badge: 'bg-blue-50 text-blue-800 border-blue-300',
      expanded: 'bg-blue-50/50 border-blue-200'
    }
  };

  const style = variants[variant] || variants.default;

  return (
    <span className={`inline ${className}`}>
      <button
        type="button"
        onClick={() => expandable && setExpanded(!expanded)}
        className={`
          inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
          border ${style.badge}
          ${expandable ? 'cursor-pointer hover:opacity-80' : ''}
          transition-all duration-150
        `}
      >
        <span className="font-bold">{stat}</span>
        {context && <span className="opacity-75">{context}</span>}
        {expandable && (
          expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
        )}
      </button>

      {expanded && quote && (
        <span className={`
          block mt-2 p-3 rounded-lg border text-sm
          ${style.expanded}
        `}>
          <span className="flex items-start gap-2">
            <Quote className="w-4 h-4 mt-0.5 opacity-50 flex-shrink-0" />
            <span>
              <span className="italic text-gray-700">"{quote}"</span>
              {(quotePerson || company) && (
                <span className="block mt-1 text-xs text-gray-500">
                  {quotePerson && <span className="font-medium">{quotePerson}</span>}
                  {quoteTitle && <span>, {quoteTitle}</span>}
                  {company && (
                    <span className="flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3" />
                      {company}
                    </span>
                  )}
                </span>
              )}
            </span>
          </span>
        </span>
      )}
    </span>
  );
}

/**
 * StatHighlight - Simple stat highlight without expansion
 */
export function StatHighlight({ value, label, className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 text-xs font-medium
        text-nerdio-primary
        ${className}
      `}
    >
      <span className="font-bold">{value}</span>
      {label && <span className="opacity-75">{label}</span>}
    </span>
  );
}
