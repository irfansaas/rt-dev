/**
 * Strategic Recommendations Display Component
 *
 * Displays comprehensive, categorized recommendations with
 * expandable details, partner suggestions, and action items.
 */

import React, { useState, useMemo } from 'react';
import {
  Clock,
  Users,
  GitBranch,
  Shield,
  Zap,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  ArrowRight,
  Target,
  TrendingUp,
  Building
} from 'lucide-react';
import { generateStrategicRecommendations, RECOMMENDATION_CATEGORIES } from '../utils/timeline/strategicRecommendations';

const CATEGORY_ICONS = {
  timeline: Clock,
  partners: Building,
  approach: GitBranch,
  risk: Shield,
  resources: Users,
  prework: Zap
};

const PRIORITY_COLORS = {
  1: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800', badge: 'bg-red-100 text-red-700' },
  2: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700' },
  3: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700' },
  4: { bg: 'bg-gray-50', border: 'border-gray-400', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-600' }
};

const TYPE_ICONS = {
  critical: AlertTriangle,
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
  partner: Building,
  approach: Target,
  risk: Shield,
  resource: Users,
  prework: Zap,
  action: Lightbulb
};

/**
 * Main Strategic Recommendations Component
 */
export default function StrategicRecommendations({
  delta,
  weeksRequired,
  weeksAvailable,
  breakdown,
  formData,
  totalScore,
  className = ''
}) {
  const [expandedCategories, setExpandedCategories] = useState({
    timeline: true,
    partners: true,
    approach: false,
    risk: false,
    resources: false,
    prework: false
  });
  const [expandedItems, setExpandedItems] = useState({});

  // Generate recommendations
  const { recommendations, summary, context } = useMemo(() => {
    return generateStrategicRecommendations({
      delta,
      weeksRequired,
      weeksAvailable,
      breakdown,
      formData,
      totalScore
    });
  }, [delta, weeksRequired, weeksAvailable, breakdown, formData, totalScore]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleItem = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Filter to only show categories with recommendations
  const activeCategories = Object.entries(recommendations)
    .filter(([_, recs]) => recs.length > 0)
    .map(([cat]) => cat);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Summary Header */}
      <div className="bg-gradient-to-r from-nerdio-dark to-nerdio-primary-700 p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Lightbulb className="text-amber-300" size={22} />
            Strategic Recommendations
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            summary.timelinePressure === 'critical' ? 'bg-red-500' :
            summary.timelinePressure === 'tight' ? 'bg-amber-500' :
            summary.timelinePressure === 'moderate' ? 'bg-blue-400' :
            'bg-green-500'
          }`}>
            {summary.timelinePressure === 'critical' ? 'Action Required' :
             summary.timelinePressure === 'tight' ? 'Attention Needed' :
             summary.timelinePressure === 'moderate' ? 'On Track' :
             'Looking Good'}
          </span>
        </div>
        <p className="text-sm text-nerdio-secondary-200 mb-4">
          {summary.headline}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{summary.totalRecommendations}</div>
            <div className="text-xs text-nerdio-secondary-200">Total Items</div>
          </div>
          {summary.criticalItems > 0 && (
            <div className="bg-red-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-200">{summary.criticalItems}</div>
              <div className="text-xs text-red-200">Critical</div>
            </div>
          )}
          <div className="bg-purple-500/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-200">{summary.partnerOpportunities}</div>
            <div className="text-xs text-purple-200">Partners</div>
          </div>
          {summary.potentialTimelineSavings > 0 && (
            <div className="bg-green-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-200">~{summary.potentialTimelineSavings}w</div>
              <div className="text-xs text-green-200">Potential Savings</div>
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs - Mobile Friendly */}
      <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
        {activeCategories.map(category => {
          const catConfig = RECOMMENDATION_CATEGORIES[category];
          const Icon = CATEGORY_ICONS[category];
          const count = recommendations[category].length;
          const hasCritical = recommendations[category].some(r => r.priority === 1);

          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                expandedCategories[category]
                  ? 'border-nerdio-primary-500 text-nerdio-primary-700 bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} className={hasCritical ? 'text-red-500' : ''} />
              {catConfig.label}
              <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                hasCritical ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recommendations by Category */}
      <div className="divide-y divide-gray-100">
        {activeCategories.map(category => {
          if (!expandedCategories[category]) return null;

          const catConfig = RECOMMENDATION_CATEGORIES[category];
          const Icon = CATEGORY_ICONS[category];
          const categoryRecs = recommendations[category];

          return (
            <div key={category} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={18} className={`text-${catConfig.color}-600`} />
                <h4 className="font-semibold text-gray-900">{catConfig.label}</h4>
                <span className="text-xs text-gray-500">{catConfig.description}</span>
              </div>

              <div className="space-y-3">
                {categoryRecs.map(rec => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    expanded={expandedItems[rec.id]}
                    onToggle={() => toggleItem(rec.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Individual Recommendation Card
 */
function RecommendationCard({ recommendation, expanded, onToggle }) {
  const colors = PRIORITY_COLORS[recommendation.priority] || PRIORITY_COLORS[3];
  const TypeIcon = TYPE_ICONS[recommendation.type] || Lightbulb;

  const hasDetails = recommendation.actions ||
                     recommendation.rationale ||
                     recommendation.mitigations ||
                     recommendation.strategy ||
                     recommendation.requirements ||
                     recommendation.activities;

  return (
    <div className={`rounded-lg border-l-4 ${colors.border} ${colors.bg} overflow-hidden`}>
      {/* Header - Always visible */}
      <div
        className={`p-4 ${hasDetails ? 'cursor-pointer' : ''}`}
        onClick={hasDetails ? onToggle : undefined}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <TypeIcon
              size={18}
              className={`mt-0.5 flex-shrink-0 ${
                recommendation.priority === 1 ? 'text-red-600' :
                recommendation.priority === 2 ? 'text-amber-600' :
                'text-blue-600'
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h5 className={`font-semibold ${colors.text}`}>
                  {recommendation.title}
                </h5>
                {recommendation.impact && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    recommendation.impact === 'high' || recommendation.impact === 'critical'
                      ? 'bg-red-200 text-red-800'
                      : recommendation.impact === 'medium'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-blue-200 text-blue-800'
                  }`}>
                    {recommendation.impact.toUpperCase()} IMPACT
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">{recommendation.text}</p>

              {/* Partner highlight */}
              {recommendation.partner && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg">{recommendation.partner.icon}</span>
                  <span className="text-sm font-medium text-purple-700">
                    {recommendation.partner.name}
                  </span>
                  {recommendation.potentialSavings && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      ~{recommendation.potentialSavings.weeks} weeks savings
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {hasDetails && (
            <button className="text-gray-400 hover:text-gray-600 p-1">
              {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && hasDetails && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-200/50">
          {/* Actions */}
          {recommendation.actions && (
            <div className="mt-3">
              <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">Recommended Actions</h6>
              <ul className="space-y-1">
                {recommendation.actions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <ArrowRight size={14} className="mt-1 text-nerdio-primary-500 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rationale */}
          {recommendation.rationale && Array.isArray(recommendation.rationale) && (
            <div className="mt-3">
              <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">Why This Matters</h6>
              <ul className="space-y-1">
                {recommendation.rationale.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="mt-1 text-green-500 flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mitigations (for risks) */}
          {recommendation.mitigations && (
            <div className="mt-3">
              <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">Mitigation Actions</h6>
              <div className="space-y-2">
                {recommendation.mitigations.map((mit, idx) => (
                  <div key={idx} className="bg-white rounded p-2 border border-gray-200">
                    <div className="font-medium text-sm text-gray-800">{mit.action}</div>
                    <div className="text-xs text-gray-500">{mit.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategy (for approach) */}
          {recommendation.strategy && (
            <div className="mt-3">
              <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {recommendation.strategy.name}
              </h6>
              {recommendation.strategy.phases && (
                <div className="space-y-2">
                  {recommendation.strategy.phases.map((phase, idx) => (
                    <div key={idx} className="bg-white rounded p-2 border border-gray-200 flex items-start gap-3">
                      <div className="bg-nerdio-primary-100 text-nerdio-primary-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-800">{phase.name}</div>
                        {phase.users && <div className="text-xs text-gray-500">Users: {phase.users}</div>}
                        {phase.duration && <div className="text-xs text-gray-500">Duration: {phase.duration}</div>}
                        {phase.focus && <div className="text-xs text-nerdio-primary-600">{phase.focus}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {recommendation.strategy.tiers && (
                <div className="space-y-2">
                  {recommendation.strategy.tiers.map((tier, idx) => (
                    <div key={idx} className="bg-white rounded p-2 border border-gray-200">
                      <div className="font-medium text-sm text-gray-800">{tier.tier}</div>
                      <div className="text-xs text-gray-500">Criteria: {tier.criteria}</div>
                      <div className="text-xs text-nerdio-primary-600">Timing: {tier.timing}</div>
                    </div>
                  ))}
                </div>
              )}
              {recommendation.strategy.composition && (
                <div className="space-y-2">
                  {recommendation.strategy.composition.map((comp, idx) => (
                    <div key={idx} className="bg-white rounded p-2 border border-gray-200 flex justify-between">
                      <div>
                        <div className="font-medium text-sm text-gray-800">{comp.group}</div>
                        <div className="text-xs text-gray-500">{comp.reason}</div>
                      </div>
                      <div className="text-sm font-medium text-nerdio-primary-600">{comp.percentage}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Requirements (for resources) */}
          {recommendation.requirements && (
            <div className="mt-3">
              <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">Resource Requirements</h6>
              <div className="bg-white rounded p-3 border border-gray-200">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Role:</span>
                    <span className="ml-2 font-medium text-gray-800">{recommendation.requirements.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Allocation:</span>
                    <span className="ml-2 font-medium text-gray-800">{recommendation.requirements.allocation}</span>
                  </div>
                  {recommendation.requirements.timing && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Timing:</span>
                      <span className="ml-2 font-medium text-gray-800">{recommendation.requirements.timing}</span>
                    </div>
                  )}
                </div>
                {recommendation.requirements.skills && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Key Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recommendation.requirements.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {recommendation.alternatives && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Alternatives:</span>
                  <ul className="mt-1 space-y-1">
                    {recommendation.alternatives.map((alt, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                        <ArrowRight size={12} className="text-gray-400" />
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Activities (for prework) */}
          {recommendation.activities && (
            <div className="mt-3">
              <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">Pre-Work Activities</h6>
              <div className="space-y-2">
                {recommendation.activities.map((activity, idx) => (
                  <div key={idx} className="bg-white rounded p-2 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{activity.task}</div>
                        <div className="text-xs text-gray-500">Owner: {activity.owner}</div>
                      </div>
                    </div>
                    <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {activity.duration}
                    </div>
                  </div>
                ))}
              </div>
              {recommendation.potentialSavings && (
                <div className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp size={14} />
                  Potential: {recommendation.potentialSavings}
                </div>
              )}
            </div>
          )}

          {/* Partner savings detail */}
          {recommendation.potentialSavings?.description && (
            <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-green-800">
                <TrendingUp size={14} className="inline mr-1" />
                {recommendation.potentialSavings.description}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
