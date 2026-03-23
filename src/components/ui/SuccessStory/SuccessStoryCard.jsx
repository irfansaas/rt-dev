import React, { useState } from 'react';
import {
  Quote,
  Building2,
  Users,
  MapPin,
  TrendingDown,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Server
} from 'lucide-react';

/**
 * SuccessStoryCard - Full card display for a case study
 * Use in carousels, modals, or dedicated sections
 */
export default function SuccessStoryCard({
  story,
  variant = 'default', // 'default', 'compact', 'featured'
  showFullQuote = false,
  onViewDetails,
  className = ''
}) {
  const [expanded, setExpanded] = useState(showFullQuote);

  if (!story) return null;

  const platformLabels = {
    'citrix': 'Citrix',
    'vmware': 'VMware Horizon',
    'on-premises': 'On-Premises VDI',
    'manual-avd': 'Native AVD',
    'legacy-vdi': 'Legacy VDI',
    'rds': 'Remote Desktop Services'
  };

  const industryIcons = {
    'financial-services': '🏦',
    'healthcare': '🏥',
    'education': '🎓',
    'government': '🏛️',
    'retail': '🛒',
    'manufacturing': '🏭',
    'legal': '⚖️',
    'nonprofit': '💚',
    'msp': '🔧',
    'logistics': '📦'
  };

  if (variant === 'compact') {
    return (
      <div className={`p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">{industryIcons[story.industry] || '🏢'}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm truncate">{story.company}</h4>
            <p className="text-xs text-gray-500 capitalize">{story.industry?.replace('-', ' ')}</p>
            {story.impacts?.[0] && (
              <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                <TrendingDown className="w-3 h-3" />
                {story.impacts[0].value} {story.impacts[0].metric}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`bg-gradient-to-br from-nerdio-dark to-nerdio-primary rounded-xl p-6 text-white ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-yellow-300" />
          <span className="text-xs font-semibold uppercase tracking-wide text-yellow-300">
            Featured Success Story
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{story.company}</h3>
        <p className="text-sm text-white/80 mb-4 line-clamp-2">{story.headline}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {story.impacts?.slice(0, 3).map((impact, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white">{impact.value}</div>
              <div className="text-xs text-white/70">{impact.metric}</div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <Quote className="w-5 h-5 text-white/50 mb-2" />
          <p className="text-sm italic text-white/90 line-clamp-3">
            "{story.quote}"
          </p>
          <p className="mt-2 text-xs text-white/70">
            - {story.quotePerson}, {story.quoteTitle}
          </p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{industryIcons[story.industry] || '🏢'}</div>
            <div>
              <h4 className="font-bold text-gray-900">{story.company}</h4>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                <span className="capitalize">{story.industry?.replace('-', ' ')}</span>
                {story.employeeCount && (
                  <>
                    <span>-</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {story.employeeCount.toLocaleString()}
                    </span>
                  </>
                )}
                {story.location && (
                  <>
                    <span>-</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {story.location.toUpperCase()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          {story.sourcePlatform && (
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
              From: {platformLabels[story.sourcePlatform] || story.sourcePlatform}
            </span>
          )}
        </div>
      </div>

      {/* Headline */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-800">{story.headline}</p>
      </div>

      {/* Key Metrics */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {story.impacts?.slice(0, 3).map((impact, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-100"
            >
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-700">{impact.value}</span>
              <span className="text-xs text-green-600">{impact.metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="px-4 pb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-2"
        >
          <Quote className="w-3 h-3" />
          {expanded ? 'Hide quote' : 'Show customer quote'}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {expanded && story.quote && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm italic text-gray-600">
              "{story.quote}"
            </p>
            <p className="mt-2 text-xs text-gray-500">
              <span className="font-medium">{story.quotePerson}</span>
              {story.quoteTitle && `, ${story.quoteTitle}`}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {onViewDetails && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(story)}
            className="flex items-center gap-1 text-sm text-nerdio-primary hover:text-nerdio-dark font-medium"
          >
            View full case study
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
