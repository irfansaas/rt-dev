import React, { useState, useRef, useEffect } from 'react';
import {
  Quote,
  Building2,
  Users,
  MapPin,
  TrendingDown,
  ExternalLink,
  X
} from 'lucide-react';

/**
 * SuccessStoryTooltip - Hover/click tooltip showing full case study details
 * Wraps any trigger element and shows a rich tooltip on interaction
 */
export default function SuccessStoryTooltip({
  children,
  story,
  trigger = 'hover', // 'hover' or 'click'
  position = 'bottom',
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    if (trigger === 'click' && isVisible) {
      const handleClickOutside = (e) => {
        if (
          tooltipRef.current &&
          !tooltipRef.current.contains(e.target) &&
          !triggerRef.current.contains(e.target)
        ) {
          setIsVisible(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [trigger, isVisible]);

  if (!story) return children;

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        ref={triggerRef}
        onMouseEnter={() => trigger === 'hover' && setIsVisible(true)}
        onMouseLeave={() => trigger === 'hover' && setIsVisible(false)}
        onClick={() => trigger === 'click' && setIsVisible(!isVisible)}
        className={trigger === 'click' ? 'cursor-pointer' : ''}
      >
        {children}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 w-80 p-4 rounded-xl shadow-xl
            bg-white border border-gray-200
            ${positionClasses[position]}
            animate-fade-in
          `}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{story.company}</h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                {story.industry && (
                  <span className="capitalize">{story.industry.replace('-', ' ')}</span>
                )}
                {story.employeeCount && (
                  <>
                    <span>-</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {story.employeeCount.toLocaleString()} users
                    </span>
                  </>
                )}
              </div>
            </div>
            {trigger === 'click' && (
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Headline */}
          <p className="text-sm font-medium text-nerdio-dark mb-3 line-clamp-2">
            {story.headline}
          </p>

          {/* Key Metrics */}
          {story.impacts && story.impacts.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {story.impacts.slice(0, 3).map((impact, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full
                           bg-green-50 text-green-700 text-xs font-medium"
                >
                  <TrendingDown className="w-3 h-3" />
                  {impact.value}
                  <span className="text-green-600/70">{impact.metric}</span>
                </span>
              ))}
            </div>
          )}

          {/* Quote */}
          {story.quote && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs italic text-gray-600 line-clamp-3">
                    "{story.quote}"
                  </p>
                  <p className="mt-1 text-[10px] text-gray-500">
                    <span className="font-medium">{story.quotePerson}</span>
                    {story.quoteTitle && `, ${story.quoteTitle}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Source indicator */}
          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">
              {story.sourcePlatform && (
                <span className="capitalize">
                  From: {story.sourcePlatform.replace('-', ' ')}
                </span>
              )}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-nerdio-primary font-medium">
              <Building2 className="w-3 h-3" />
              Nerdio Customer
            </span>
          </div>
        </div>
      )}
    </span>
  );
}
