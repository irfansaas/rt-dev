import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  TrendingDown,
  Building2
} from 'lucide-react';
import SuccessStoryCard from './SuccessStoryCard';

/**
 * SuccessStoryCarousel - Auto-rotating carousel of success stories
 * Perfect for sidebars, hero sections, or dedicated proof sections
 */
export default function SuccessStoryCarousel({
  stories = [],
  autoPlay = true,
  interval = 8000,
  variant = 'cards', // 'cards', 'quotes', 'metrics', 'minimal'
  showControls = true,
  showIndicators = true,
  onStoryClick,
  className = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Safely get story count
  const storyCount = stories?.length || 0;

  const next = useCallback(() => {
    if (storyCount > 0) {
      setCurrentIndex((i) => (i + 1) % storyCount);
    }
  }, [storyCount]);

  const prev = useCallback(() => {
    if (storyCount > 0) {
      setCurrentIndex((i) => (i - 1 + storyCount) % storyCount);
    }
  }, [storyCount]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused || storyCount <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, next, storyCount]);

  if (!stories || storyCount === 0) return null;

  const currentStory = stories[currentIndex];

  const industryIcons = {
    'financial-services': '🏦',
    'healthcare': '🏥',
    'education': '🎓',
    'government': '🏛️',
    'retail': '🛒',
    'manufacturing': '🏭',
    'legal': '⚖️',
    'nonprofit': '💚',
    'msp': '🔧'
  };

  if (variant === 'quotes') {
    return (
      <div
        className={`relative p-6 bg-gray-50 rounded-xl ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Quote className="w-8 h-8 text-gray-200 absolute top-4 left-4" />

        <div className="relative z-10 text-center">
          <p className="text-lg italic text-gray-700 mb-4">
            "{currentStory.quote}"
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="text-2xl">{industryIcons[currentStory.industry] || '🏢'}</div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">{currentStory.quotePerson}</p>
              <p className="text-sm text-gray-500">{currentStory.quoteTitle}</p>
              <p className="text-xs text-nerdio-primary font-medium">{currentStory.company}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        {showControls && storyCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={prev}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={next}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Indicators */}
        {showIndicators && storyCount > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-nerdio-primary w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'metrics') {
    return (
      <div
        className={`relative ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="text-xl">{industryIcons[currentStory.industry] || '🏢'}</div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{currentStory.company}</h4>
                <p className="text-xs text-gray-500 capitalize">
                  {currentStory.industry?.replace('-', ' ')}
                </p>
              </div>
            </div>
            {showControls && storyCount > 1 && (
              <div className="flex items-center gap-1">
                <button onClick={prev} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <button onClick={next} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2">
            {currentStory.impacts?.slice(0, 3).map((impact, i) => (
              <div key={i} className="p-2 bg-green-50 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1">
                  <TrendingDown className="w-3 h-3 text-green-600" />
                  <span className="font-bold text-green-700 text-sm">{impact.value}</span>
                </div>
                <p className="text-[10px] text-green-600 mt-0.5">{impact.metric}</p>
              </div>
            ))}
          </div>
        </div>

        {showIndicators && storyCount > 1 && (
          <div className="flex justify-center gap-1 mt-2">
            {stories.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === currentIndex ? 'bg-nerdio-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="text-xl">{industryIcons[currentStory.industry] || '🏢'}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 truncate">
            <span className="font-semibold">{currentStory.company}</span>
            {currentStory.impacts?.[0] && (
              <span className="text-green-600">
                {' '}achieved {currentStory.impacts[0].value} {currentStory.impacts[0].metric.toLowerCase()}
              </span>
            )}
          </p>
        </div>
        {storyCount > 1 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={prev} className="p-1 hover:bg-gray-200 rounded">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <span className="text-xs text-gray-400">{currentIndex + 1}/{storyCount}</span>
            <button onClick={next} className="p-1 hover:bg-gray-200 rounded">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Cards variant (default)
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SuccessStoryCard
        story={currentStory}
        onViewDetails={onStoryClick}
        showFullQuote={false}
      />

      {/* Navigation arrows */}
      {showControls && storyCount > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                     w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200
                     flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                     w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200
                     flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && storyCount > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-nerdio-primary w-4' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
