import React, { useState } from 'react';
import {
  Quote,
  Building2,
  Users,
  TrendingDown,
  Award,
  ChevronRight,
  X,
  Sparkles
} from 'lucide-react';

/**
 * SuccessStoryBanner - Prominent banner for showing social proof at key decision points
 * Use at the top of sections, before CTAs, or in sidebars
 */
export default function SuccessStoryBanner({
  story,
  variant = 'default', // 'default', 'minimal', 'highlight', 'sidebar'
  dismissible = false,
  onDismiss,
  onViewMore,
  context, // e.g., "Citrix migration", "Healthcare customers"
  className = ''
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !story) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
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

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 px-3 py-2 bg-green-50 rounded-lg border border-green-200 ${className}`}>
        <TrendingDown className="w-4 h-4 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800">
          <span className="font-semibold">{story.company}</span>
          {story.impacts?.[0] && (
            <span> achieved <span className="font-bold">{story.impacts[0].value}</span> {story.impacts[0].metric.toLowerCase()}</span>
          )}
        </p>
        {onViewMore && (
          <button
            onClick={() => onViewMore(story)}
            className="text-green-600 hover:text-green-800 ml-auto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <div className={`relative bg-gradient-to-r from-nerdio-dark to-nerdio-primary rounded-xl p-5 text-white overflow-hidden ${className}`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute -left-5 -bottom-5 w-32 h-32 rounded-full bg-white" />
        </div>

        <div className="relative">
          {context && (
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-semibold uppercase tracking-wide text-yellow-300">
                {context}
              </span>
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="text-4xl">{industryIcons[story.industry] || '🏢'}</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">{story.company}</h4>
              <p className="text-sm text-white/80 mt-1 line-clamp-2">{story.headline}</p>

              {story.impacts && story.impacts.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {story.impacts.slice(0, 3).map((impact, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium"
                    >
                      {impact.value} {impact.metric.toLowerCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {story.quote && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Quote className="w-4 h-4 text-white/50 mb-1" />
              <p className="text-sm italic text-white/90 line-clamp-2">
                "{story.quote}"
              </p>
              <p className="mt-1 text-xs text-white/70">
                - {story.quotePerson}
              </p>
            </div>
          )}
        </div>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`p-4 bg-gray-50 rounded-xl border border-gray-200 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-nerdio-primary" />
          <span className="text-xs font-semibold text-nerdio-dark uppercase tracking-wide">
            {context || 'Customer Success'}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">{industryIcons[story.industry] || '🏢'}</div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{story.company}</h4>
            <p className="text-xs text-gray-500 capitalize">{story.industry?.replace('-', ' ')}</p>
          </div>
        </div>

        {story.impacts?.[0] && (
          <div className="p-2 bg-green-50 rounded-lg mb-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-700">{story.impacts[0].value}</span>
              <span className="text-xs text-green-600">{story.impacts[0].metric}</span>
            </div>
          </div>
        )}

        {story.quote && (
          <div className="text-xs">
            <Quote className="w-3 h-3 text-gray-400 mb-1" />
            <p className="italic text-gray-600 line-clamp-3">"{story.quote}"</p>
            <p className="mt-1 text-gray-500 font-medium">{story.quotePerson}</p>
          </div>
        )}

        {onViewMore && (
          <button
            onClick={() => onViewMore(story)}
            className="mt-3 flex items-center gap-1 text-xs text-nerdio-primary hover:text-nerdio-dark font-medium"
          >
            Read full story <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <div className="text-3xl flex-shrink-0">{industryIcons[story.industry] || '🏢'}</div>

      <div className="flex-1 min-w-0">
        {context && (
          <span className="text-xs font-semibold text-nerdio-primary uppercase tracking-wide mb-1 block">
            {context}
          </span>
        )}

        <h4 className="font-bold text-gray-900">{story.company}</h4>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{story.headline}</p>

        <div className="flex flex-wrap items-center gap-3 mt-3">
          {story.impacts?.slice(0, 2).map((impact, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium"
            >
              <TrendingDown className="w-3 h-3" />
              {impact.value}
            </span>
          ))}
          {onViewMore && (
            <button
              onClick={() => onViewMore(story)}
              className="text-xs text-nerdio-primary hover:text-nerdio-dark font-medium flex items-center gap-1"
            >
              Learn more <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
