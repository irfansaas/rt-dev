import React, { useState, useMemo } from 'react';
import {
  Zap,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  TrendingDown,
  Calendar,
  Users,
  Info,
  Sparkles
} from 'lucide-react';
import {
  TIMELINE_PARTNERS,
  calculateCombinedPartnerImpact,
  getRecommendedPartners
} from '../../constants/timelinePartners';

/**
 * PartnerTimelineAccelerator - Optional partner selection to reduce timeline
 *
 * Shows recommended partners based on timeline gap, allows selection,
 * and displays the projected timeline/cost impact.
 */
export default function PartnerTimelineAccelerator({
  phases,
  weeksShort,
  weeksRequired,
  formData,
  onAcceleratedTimeline,
  className = ''
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Get recommended partners based on timeline gap
  const recommendedPartners = useMemo(() => {
    return getRecommendedPartners(Math.abs(weeksShort), formData);
  }, [weeksShort, formData]);

  // Calculate impact of selected partners
  const acceleration = useMemo(() => {
    if (!isEnabled || selectedPartners.length === 0) {
      return null;
    }
    return calculateCombinedPartnerImpact(phases, selectedPartners);
  }, [isEnabled, selectedPartners, phases]);

  // Notify parent of accelerated timeline
  React.useEffect(() => {
    if (acceleration && onAcceleratedTimeline) {
      onAcceleratedTimeline(acceleration);
    } else if (!isEnabled && onAcceleratedTimeline) {
      onAcceleratedTimeline(null);
    }
  }, [acceleration, isEnabled, onAcceleratedTimeline]);

  const togglePartner = (partnerId) => {
    setSelectedPartners(prev => {
      if (prev.includes(partnerId)) {
        return prev.filter(id => id !== partnerId);
      } else {
        return [...prev, partnerId];
      }
    });
  };

  const handleEnable = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled && selectedPartners.length === 0 && recommendedPartners.length > 0) {
      // Auto-select first recommended partner
      setSelectedPartners([recommendedPartners[0].id]);
    }
  };

  // Color mapping for partners
  const colorMap = {
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', badge: 'bg-indigo-100' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', badge: 'bg-teal-100' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100' }
  };

  const newWeeksRequired = acceleration
    ? Math.round((weeksRequired - acceleration.weeksSaved) * 10) / 10
    : weeksRequired;

  const newDelta = acceleration
    ? Math.round((weeksShort + acceleration.weeksSaved) * 10) / 10
    : weeksShort;

  return (
    <div className={`bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 overflow-hidden ${className}`}>
      {/* Header - Always visible */}
      <div
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              Partner Timeline Acceleration
              <span className="text-xs font-normal bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">
                Optional
              </span>
            </h3>
            <p className="text-sm text-gray-600">
              {isEnabled && acceleration
                ? `~${acceleration.weeksSaved} weeks faster with ${selectedPartners.length} partner${selectedPartners.length > 1 ? 's' : ''}`
                : 'Select partners to accelerate your timeline'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Enable toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEnable();
            }}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              isEnabled
                ? 'bg-purple-600 text-white'
                : 'bg-white border border-purple-300 text-purple-700 hover:bg-purple-50'
            }`}
          >
            {isEnabled ? 'Enabled' : 'Enable'}
          </button>

          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Impact Summary - Show when enabled */}
          {isEnabled && acceleration && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Time Saved</span>
                </div>
                <div className="text-2xl font-bold text-green-800">
                  ~{acceleration.weeksSaved}w
                </div>
                <div className="text-xs text-gray-500">estimated reduction</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">New Timeline</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  ~{newWeeksRequired}w
                </div>
                <div className="text-xs text-gray-500">
                  {newDelta >= 0
                    ? `+${newDelta}w buffer`
                    : `${newDelta}w short`}
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Cost Impact</span>
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  ~{acceleration.combinedCostSavings?.totalPercent || 0}%
                </div>
                <div className="text-xs text-gray-500">migration cost reduction</div>
              </div>
            </div>
          )}

          {/* Partner Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                {weeksShort < 0 ? 'Recommended Partners' : 'Available Partners'}
              </span>
              {weeksShort < 0 && (
                <span className="text-xs text-red-600 font-medium">
                  ~{Math.abs(weeksShort)} weeks needed to meet target
                </span>
              )}
            </div>

            <div className="space-y-2">
              {Object.values(TIMELINE_PARTNERS).map(partner => {
                const isSelected = selectedPartners.includes(partner.id);
                const isRecommended = recommendedPartners.some(r => r.id === partner.id);
                const colors = colorMap[partner.color] || colorMap.purple;
                const recommendation = recommendedPartners.find(r => r.id === partner.id);

                return (
                  <div
                    key={partner.id}
                    onClick={() => isEnabled && togglePartner(partner.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isEnabled ? 'cursor-pointer' : 'opacity-60'
                    } ${
                      isSelected
                        ? `${colors.bg} ${colors.border}`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Selection checkbox */}
                      <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>

                      {/* Partner info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{partner.icon}</span>
                          <span className="font-semibold text-gray-900">{partner.name}</span>
                          {isRecommended && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{partner.tagline}</p>

                        {/* Key metrics */}
                        <div className="flex flex-wrap gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${colors.badge} ${colors.text}`}>
                            <Clock className="w-3 h-3 inline mr-1" />
                            ~{Math.round(partner.timelineReduction.overall * 100)}% faster
                          </span>
                          {recommendation && (
                            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                              <TrendingDown className="w-3 h-3 inline mr-1" />
                              ~{recommendation.estimatedWeeksSaved}w savings
                            </span>
                          )}
                        </div>

                        {/* Highlights when selected */}
                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-2">
                              {partner.highlights.slice(0, 4).map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-1 text-xs text-gray-600">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Impact indicator */}
                      <div className="text-right flex-shrink-0">
                        <div className={`text-lg font-bold ${colors.text}`}>
                          -{Math.round(partner.timelineReduction.overall * 100)}%
                        </div>
                        <div className="text-xs text-gray-500">timeline</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Methodology note */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <strong>How this works:</strong> Partners accelerate specific project phases through automation,
              pre-built assets, and expertise. Timeline reductions are estimates based on typical partner
              engagements. Actual results may vary based on project specifics. Contact partners for detailed scoping.
            </div>
          </div>

          {/* Phase-level breakdown when enabled */}
          {isEnabled && acceleration && acceleration.phases && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                Estimated Phase Acceleration Breakdown
              </h4>
              <div className="space-y-2">
                {acceleration.phases.map((phase, idx) => {
                  const originalWeeks = phase.originalWeeks || phases[idx]?.weeks || phase.weeks;
                  const reduction = phase.reductionPercent || 0;

                  return (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <div className="flex-1 text-gray-700">{phase.name}</div>
                      <div className="text-gray-400 line-through">{originalWeeks}w</div>
                      <div className="font-semibold text-green-700">~{Math.round(phase.weeks * 10) / 10}w</div>
                      {reduction > 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          -{Math.round(reduction)}%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
