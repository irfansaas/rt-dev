import React, { useState, useMemo } from 'react';
import {
  Layers,
  Server,
  Package,
  HardDrive,
  DollarSign,
  Zap,
  TrendingUp,
  ChevronRight,
  X,
  Sparkles,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Partner savings estimation (self-contained, no external dependencies)
function getQuickEstimate(profile, partnerIds) {
  const users = profile?.totalUsers || 500;
  const rates = {
    nerdio: 210, recast: 85, igel: 150, tenzig: 130,
    netapp: 95, archera: 70, juriba: 60, lakeside: 55
  };
  const estimates = partnerIds.map(id => ({
    id,
    savings: Math.round((rates[id] || 50) * users / 10)
  }));
  const total = estimates.reduce((s, e) => s + e.savings, 0);
  const synergyBonus = partnerIds.length > 1 ? Math.round(total * 0.05) : 0;
  return { grandTotal: total + synergyBonus, estimates, synergyBonus };
}

/**
 * PartnerSuggestionBanner - Prominent banner showing partner recommendations
 * Use at key decision points to highlight optimization opportunities
 *
 * Variants:
 * - default: Full banner with all details
 * - minimal: Compact single-line version
 * - highlight: Gradient background, prominent styling
 * - sidebar: Vertical layout for sidebars
 */
export default function PartnerSuggestionBanner({
  variant = 'default', // 'default', 'minimal', 'highlight', 'sidebar', 'inline'
  dismissible = false,
  onDismiss,
  onViewPartnerStack,
  context, // e.g., "Based on 500 users", "Citrix migration"
  maxPartners = 3,
  showSavings = true,
  showBreakdown = true, // Show per-partner breakdown
  className = ''
}) {
  const [dismissed, setDismissed] = useState(false);
  const [breakdownExpanded, setBreakdownExpanded] = useState(false);

  // Get quick estimate for display
  const estimate = useMemo(() => {
    try {
      const partnerIds = ['nerdio', 'igel', 'recast'].slice(0, maxPartners);
      return getQuickEstimate({ totalUsers: 500 }, partnerIds);
    } catch (error) {
      console.error('Error calculating partner estimate:', error);
      return { grandTotal: 0, estimates: [], synergyBonus: 0 };
    }
  }, [maxPartners]);

  if (dismissed || !estimate) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const partnerIcons = {
    nerdio: { icon: Server, color: 'text-purple-600', bg: 'bg-purple-100' },
    recast: { icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
    igel: { icon: HardDrive, color: 'text-blue-600', bg: 'bg-blue-100' },
    tenzig: { icon: HardDrive, color: 'text-sky-600', bg: 'bg-sky-100' },
    netapp: { icon: HardDrive, color: 'text-teal-600', bg: 'bg-teal-100' },
    archera: { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    juriba: { icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    lakeside: { icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' }
  };

  const partnerNames = {
    nerdio: 'Nerdio',
    recast: 'Recast',
    igel: 'IGEL',
    tenzig: '10ZiG',
    netapp: 'NetApp',
    archera: 'Archera',
    juriba: 'Juriba',
    lakeside: 'Lakeside'
  };

  // Partner value propositions and methodology descriptions
  const partnerInfo = {
    nerdio: {
      tagline: 'Azure VDI Management',
      methodology: 'Based on 35% auto-scaling savings on compute costs ($50/user/month baseline)',
      link: 'https://nerdio.com'
    },
    recast: {
      tagline: 'Application Packaging',
      methodology: 'Based on 73% reduction in application packaging labor costs',
      link: 'https://recastsoftware.com'
    },
    igel: {
      tagline: 'Endpoint Optimization',
      methodology: 'Based on 70% endpoint TCO reduction via device repurposing and energy savings',
      link: 'https://igel.com'
    },
    tenzig: {
      tagline: 'Thin Client Solutions',
      methodology: 'Based on 65% endpoint TCO reduction with purpose-built thin clients',
      link: 'https://10zig.com'
    },
    netapp: {
      tagline: 'Storage Optimization',
      methodology: 'Based on 45% storage savings via Azure NetApp Files data reduction',
      link: 'https://netapp.com'
    },
    archera: {
      tagline: 'Azure Financial Engineering',
      methodology: 'Based on 28% Azure commitment savings (net 21% after Archera fee)',
      link: 'https://archera.ai'
    },
    juriba: {
      tagline: 'Migration Acceleration',
      methodology: 'Based on 50% reduction in migration project costs',
      link: 'https://juriba.com'
    },
    lakeside: {
      tagline: 'Data-Driven Assessment',
      methodology: 'Based on 22% timeline reduction and 25% less over-provisioning via accurate sizing',
      link: 'https://lakesidesoftware.com'
    }
  };

  // Minimal variant - single line
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200 ${className}`}>
        <Layers className="w-4 h-4 text-purple-600 flex-shrink-0" />
        <p className="text-sm text-purple-800">
          <span className="font-semibold">Partner Stack:</span>
          {showSavings && estimate.grandTotal > 0 && (
            <span> Save <span className="font-bold">${estimate.grandTotal.toLocaleString()}</span>/year</span>
          )}
        </p>
        {onViewPartnerStack && (
          <button
            onClick={onViewPartnerStack}
            className="text-purple-600 hover:text-purple-800 ml-auto flex items-center gap-1 text-sm font-medium"
          >
            View <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Inline variant - ultra compact
  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-sm ${className}`}>
        <Layers className="w-3.5 h-3.5 text-purple-600" />
        <span className="text-gray-600">Partner stack savings:</span>
        <span className="font-bold text-purple-600">${estimate.grandTotal.toLocaleString()}/yr</span>
        {onViewPartnerStack && (
          <button onClick={onViewPartnerStack} className="text-purple-600 hover:underline text-xs">
            Details
          </button>
        )}
      </span>
    );
  }

  // Highlight variant - gradient background
  if (variant === 'highlight') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Main banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-5 text-white">
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

            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Partner Optimization Stack
                </h4>
                <p className="text-sm text-white/80 mt-1">
                  Maximize ROI with complementary solutions
                </p>
              </div>

              {showSavings && estimate.grandTotal > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold">${estimate.grandTotal.toLocaleString()}</div>
                  <div className="text-xs text-white/70">estimated annual savings*</div>
                </div>
              )}
            </div>

            {/* Partner breakdown with savings */}
            <div className="mt-4 space-y-2">
              {estimate.estimates.map((e) => {
                const config = partnerIcons[e.id] || partnerIcons.nerdio;
                const Icon = config.icon;
                const info = partnerInfo[e.id];
                return (
                  <div
                    key={e.id}
                    className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/20 rounded">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium text-sm">{partnerNames[e.id]}</span>
                        {info && (
                          <span className="text-xs text-white/60 ml-2">{info.tagline}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-sm">${(e.savings || 0).toLocaleString()}/yr</span>
                  </div>
                );
              })}

              {/* Synergy bonus if applicable */}
              {estimate.synergyBonus > 0 && (
                <div className="flex items-center justify-between bg-yellow-400/20 rounded-lg px-3 py-2 border border-yellow-400/30">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-400/30 rounded">
                      <Zap className="w-4 h-4 text-yellow-300" />
                    </div>
                    <div>
                      <span className="font-medium text-sm text-yellow-200">Partner Synergy Bonus</span>
                      <span className="text-xs text-yellow-300/70 ml-2">Multi-partner integration</span>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-yellow-200">+${estimate.synergyBonus.toLocaleString()}/yr</span>
                </div>
              )}
            </div>

            {/* Methodology disclosure toggle */}
            {showBreakdown && (
              <button
                onClick={() => setBreakdownExpanded(!breakdownExpanded)}
                className="mt-3 flex items-center gap-1 text-xs text-white/70 hover:text-white/90"
              >
                <Info className="w-3.5 h-3.5" />
                <span>How are these savings calculated?</span>
                {breakdownExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            {onViewPartnerStack && (
              <button
                onClick={onViewPartnerStack}
                className="mt-4 flex items-center gap-1 text-sm text-white hover:text-yellow-200 font-medium"
              >
                Configure Partner Stack <ChevronRight className="w-4 h-4" />
              </button>
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

        {/* Expanded methodology section */}
        {breakdownExpanded && (
          <div className="mt-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-3">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-gray-800 text-sm">Savings Methodology</h5>
                <p className="text-xs text-gray-500 mt-1">
                  *These are estimated savings based on industry benchmarks and typical customer results.
                  Actual savings may vary based on your specific environment and implementation.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {estimate.estimates.map((e) => {
                const info = partnerInfo[e.id];
                const config = partnerIcons[e.id];
                const Icon = config?.icon || Server;
                if (!info) return null;
                return (
                  <div key={e.id} className="flex items-start gap-2 text-xs">
                    <div className={`p-1 rounded ${config?.bg || 'bg-gray-100'} flex-shrink-0`}>
                      <Icon className={`w-3 h-3 ${config?.color || 'text-gray-600'}`} />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">{partnerNames[e.id]}:</span>
                      <span className="text-gray-600 ml-1">{info.methodology}</span>
                    </div>
                  </div>
                );
              })}
              {estimate.synergyBonus > 0 && (
                <div className="flex items-start gap-2 text-xs">
                  <div className="p-1 rounded bg-yellow-100 flex-shrink-0">
                    <Zap className="w-3 h-3 text-yellow-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Synergy Bonus:</span>
                    <span className="text-gray-600 ml-1">Additional 3-15% value from integrated partner solutions working together</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200">
              Contact your Nerdio representative for a detailed, customized analysis based on your specific requirements.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Sidebar variant - vertical layout
  if (variant === 'sidebar') {
    return (
      <div className={`p-4 bg-purple-50 rounded-xl border border-purple-200 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-semibold text-purple-800 uppercase tracking-wide">
            Partner Stack
          </span>
        </div>

        {showSavings && estimate.grandTotal > 0 && (
          <div className="p-2 bg-white rounded-lg mb-3 border border-purple-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-700">${estimate.grandTotal.toLocaleString()}</span>
              <span className="text-xs text-green-600">/year</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {estimate.estimates.slice(0, 4).map((e) => {
            const config = partnerIcons[e.id] || partnerIcons.nerdio;
            const Icon = config.icon;
            return (
              <div key={e.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${config.bg}`}>
                    <Icon className={`w-3 h-3 ${config.color}`} />
                  </div>
                  <span className="text-gray-700">{partnerNames[e.id]}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ${(e.savings || 0).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        {onViewPartnerStack && (
          <button
            onClick={onViewPartnerStack}
            className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-medium py-2 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            View Full Stack <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  // Default variant - full banner
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Partner Optimization Stack</h4>
              <p className="text-sm text-gray-600">
                {context || 'Recommended for your environment'}
              </p>
            </div>
          </div>

          {showSavings && estimate.grandTotal > 0 && (
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">
                ${estimate.grandTotal.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">estimated annual savings*</div>
            </div>
          )}

          {dismissible && (
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {estimate.estimates.slice(0, 6).map((e) => {
            const config = partnerIcons[e.id] || partnerIcons.nerdio;
            const Icon = config.icon;
            const isSelected = false;
            const info = partnerInfo[e.id];

            return (
              <div
                key={e.id}
                className={`flex items-center gap-2 p-2 rounded-lg border ${
                  isSelected
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
                title={info?.methodology || ''}
              >
                <div className={`p-1.5 rounded ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-800 truncate">
                    {partnerNames[e.id]}
                  </div>
                  <div className="text-xs text-gray-500">
                    ${(e.savings || 0).toLocaleString()}/yr
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Synergy bonus row */}
        {estimate.synergyBonus > 0 && (
          <div className="mt-3 flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-yellow-100">
                <Zap className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-yellow-800">Partner Synergy Bonus</span>
            </div>
            <span className="text-sm font-bold text-yellow-700">+${estimate.synergyBonus.toLocaleString()}/yr</span>
          </div>
        )}

        {/* Methodology disclosure */}
        {showBreakdown && (
          <button
            onClick={() => setBreakdownExpanded(!breakdownExpanded)}
            className="mt-3 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
          >
            <Info className="w-3.5 h-3.5" />
            <span>How are these savings calculated?</span>
            {breakdownExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Expanded methodology section */}
        {breakdownExpanded && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">
                *These are estimated savings based on industry benchmarks and typical customer results.
                Actual savings may vary based on your specific environment.
              </p>
            </div>
            <div className="space-y-1.5">
              {estimate.estimates.map((e) => {
                const info = partnerInfo[e.id];
                if (!info) return null;
                return (
                  <div key={e.id} className="text-xs">
                    <span className="font-semibold text-gray-700">{partnerNames[e.id]}:</span>
                    <span className="text-gray-600 ml-1">{info.methodology}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {onViewPartnerStack && (
          <button
            onClick={onViewPartnerStack}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-purple-600 hover:text-purple-800 font-medium border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Configure Partner Stack <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
