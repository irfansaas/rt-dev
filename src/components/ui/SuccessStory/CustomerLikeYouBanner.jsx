import React, { useState, useMemo } from 'react';
import {
  Users,
  Building2,
  TrendingDown,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { findRelevantCaseStudies, getCaseStudyStats } from '../../../data/caseStudies';

/**
 * CustomerLikeYouBanner - Shows "Customers like you" based on profile matching
 * Automatically finds and displays relevant case studies
 */
export default function CustomerLikeYouBanner({
  customerProfile,
  maxStories = 3,
  variant = 'carousel', // 'carousel', 'list', 'single', 'stats'
  showMatchReason = true,
  className = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const matchedStories = useMemo(() => {
    if (!customerProfile) return [];
    return findRelevantCaseStudies(customerProfile, maxStories);
  }, [customerProfile, maxStories]);

  const stats = useMemo(() => getCaseStudyStats(), []);

  if (!customerProfile) return null;

  const industryLabels = {
    'financial-services': 'Financial Services',
    'healthcare': 'Healthcare',
    'education': 'Education',
    'government': 'Government',
    'retail': 'Retail',
    'manufacturing': 'Manufacturing',
    'legal': 'Legal',
    'nonprofit': 'Nonprofit',
    'msp': 'MSP'
  };

  const platformLabels = {
    'citrix': 'Citrix',
    'vmware': 'VMware',
    'on-premises': 'On-Premises',
    'rds': 'RDS'
  };

  const getMatchReason = (story) => {
    const reasons = [];
    if (story.industry === customerProfile.industry) {
      reasons.push(`Same industry: ${industryLabels[story.industry] || story.industry}`);
    }
    if (story.sourcePlatform === customerProfile.sourcePlatform ||
        story.sourcePlatform === customerProfile.currentPlatform) {
      reasons.push(`Same source: ${platformLabels[story.sourcePlatform] || story.sourcePlatform}`);
    }
    if (story.size === customerProfile.companySize) {
      reasons.push(`Similar size`);
    }
    return reasons.length > 0 ? reasons[0] : 'Similar profile';
  };

  if (variant === 'stats') {
    return (
      <div className={`p-4 bg-gradient-to-r from-nerdio-light to-white rounded-xl border border-nerdio-primary/20 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-nerdio-primary" />
          <span className="font-semibold text-nerdio-dark">Nerdio Customer Success</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-nerdio-dark">{stats.totalCustomers}+</div>
            <div className="text-xs text-gray-500">Case Studies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nerdio-dark">{stats.industries}</div>
            <div className="text-xs text-gray-500">Industries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nerdio-dark">{stats.citrixMigrations}</div>
            <div className="text-xs text-gray-500">Citrix Migrations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nerdio-dark">{stats.vmwareMigrations}</div>
            <div className="text-xs text-gray-500">VMware Migrations</div>
          </div>
        </div>
      </div>
    );
  }

  if (matchedStories.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 rounded-xl border border-gray-200 ${className}`}>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span className="text-sm">
            Join {stats.totalCustomers}+ organizations using Nerdio across {stats.industries} industries
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'single') {
    const story = matchedStories[0];
    return (
      <div className={`p-4 bg-gradient-to-r from-nerdio-light to-white rounded-xl border border-nerdio-primary/20 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-nerdio-primary" />
          <span className="text-xs font-semibold text-nerdio-primary uppercase tracking-wide">
            Customer Like You
          </span>
          {showMatchReason && (
            <span className="text-xs text-gray-500">
              ({getMatchReason(story)})
            </span>
          )}
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">{story.company}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{story.headline}</p>

            {story.impacts?.[0] && (
              <div className="flex items-center gap-2 mt-2">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-700">{story.impacts[0].value}</span>
                <span className="text-sm text-green-600">{story.impacts[0].metric}</span>
              </div>
            )}
          </div>
        </div>

        {story.quote && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-gray-100">
            <Quote className="w-3 h-3 text-gray-400 mb-1" />
            <p className="text-xs italic text-gray-600 line-clamp-2">"{story.quote}"</p>
            <p className="mt-1 text-[10px] text-gray-500 font-medium">
              - {story.quotePerson}, {story.company}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-nerdio-primary" />
          <span className="text-sm font-semibold text-nerdio-dark">
            Customers Like You ({matchedStories.length} matches)
          </span>
        </div>

        {matchedStories.map((story, i) => (
          <div
            key={story.id}
            className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-nerdio-primary/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-nerdio-light flex items-center justify-center text-nerdio-dark font-bold text-sm">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-gray-900 text-sm truncate">{story.company}</h5>
                {showMatchReason && (
                  <span className="text-[10px] text-gray-400 ml-2">{getMatchReason(story)}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 capitalize">{story.industry?.replace('-', ' ')}</p>
              {story.impacts?.[0] && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs text-green-700">
                  <TrendingDown className="w-3 h-3" />
                  {story.impacts[0].value} {story.impacts[0].metric.toLowerCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Carousel variant (default)
  const currentStory = matchedStories[currentIndex];

  return (
    <div className={`relative p-4 bg-gradient-to-r from-nerdio-light to-white rounded-xl border border-nerdio-primary/20 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-nerdio-primary" />
          <span className="text-xs font-semibold text-nerdio-primary uppercase tracking-wide">
            Customers Like You
          </span>
        </div>
        {matchedStories.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentIndex((i) => (i - 1 + matchedStories.length) % matchedStories.length)}
              className="p-1 rounded-full hover:bg-nerdio-primary/10 text-gray-400 hover:text-nerdio-primary"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-500">
              {currentIndex + 1} / {matchedStories.length}
            </span>
            <button
              onClick={() => setCurrentIndex((i) => (i + 1) % matchedStories.length)}
              className="p-1 rounded-full hover:bg-nerdio-primary/10 text-gray-400 hover:text-nerdio-primary"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Match reason */}
      {showMatchReason && (
        <div className="text-xs text-gray-500 mb-2">
          Match: {getMatchReason(currentStory)}
        </div>
      )}

      {/* Content */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900">{currentStory.company}</h4>
          <p className="text-xs text-gray-500 capitalize">
            {currentStory.industry?.replace('-', ' ')}
            {currentStory.employeeCount && ` - ${currentStory.employeeCount.toLocaleString()} users`}
          </p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{currentStory.headline}</p>

          {currentStory.impacts && currentStory.impacts.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {currentStory.impacts.slice(0, 2).map((impact, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium"
                >
                  <TrendingDown className="w-3 h-3" />
                  {impact.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quote */}
      {currentStory.quote && (
        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-100">
          <Quote className="w-3 h-3 text-gray-400 mb-1" />
          <p className="text-xs italic text-gray-600 line-clamp-2">"{currentStory.quote}"</p>
          <p className="mt-1 text-[10px] text-gray-500 font-medium">
            - {currentStory.quotePerson}
          </p>
        </div>
      )}

      {/* Dots indicator */}
      {matchedStories.length > 1 && (
        <div className="flex justify-center gap-1 mt-3">
          {matchedStories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-nerdio-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
