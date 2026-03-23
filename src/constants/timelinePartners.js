/**
 * Timeline Partners Configuration
 *
 * Partners that can accelerate AVD migration timelines
 * with specific phase-level impacts and cost savings.
 */

export const TIMELINE_PARTNERS = {
  juriba: {
    id: 'juriba',
    name: 'Juriba Dashworks',
    shortName: 'Juriba',
    tagline: 'Migration Acceleration Platform',
    description: 'Automated discovery, orchestration, and user communication for 50% faster migrations.',
    icon: '🚀',
    color: 'indigo',

    // Timeline impact
    timelineReduction: {
      overall: 0.30, // 30% overall timeline reduction
      phases: {
        'User & Use Case Migration': 0.50, // 50% reduction
        'Pilot Group Testing': 0.30, // 30% reduction
        'Design, Build & Configure AVD': 0.20 // 20% reduction
      }
    },

    // Cost impact
    costSavings: {
      migrationCost: 0.58, // 58% reduction in migration costs
      projectManagement: 0.65, // 65% PM efficiency gain
      description: 'Reduces migration labor costs through automation'
    },

    // When to recommend
    triggers: {
      userCountMin: 500,
      weeksOverBudget: 4, // Recommend when 4+ weeks short
      hasComplexMigration: true
    },

    // Value metrics for display
    highlights: [
      '50% faster user migration',
      '58% lower migration costs',
      'Automated user communications',
      'Real-time project dashboards'
    ]
  },

  recast: {
    id: 'recast',
    name: 'Recast Software',
    shortName: 'Recast',
    tagline: 'Application Packaging Automation',
    description: '7,000+ pre-packaged apps and automated MSIX conversion dramatically reduces app prep time.',
    icon: '📦',
    color: 'orange',

    timelineReduction: {
      overall: 0.20, // 20% overall (focused on app phase)
      phases: {
        'Prepare & Transform Applications': 0.70, // 70% reduction
        'Pilot Group Testing': 0.15 // 15% reduction (less app testing)
      }
    },

    costSavings: {
      packagingCost: 0.73, // 73% reduction in packaging costs
      testingCost: 0.40, // 40% less testing
      description: 'Pre-packaged apps eliminate manual packaging labor'
    },

    triggers: {
      appCountMin: 30,
      modernizationRequired: true,
      weeksOverBudget: 2
    },

    highlights: [
      '70% faster app preparation',
      '73% lower packaging costs',
      '7,000+ pre-packaged apps',
      'Automated MSIX conversion'
    ]
  },

  nerdioPS: {
    id: 'nerdioPS',
    name: 'Nerdio Professional Services',
    shortName: 'Nerdio PS',
    tagline: 'Expert Implementation Team',
    description: 'Nerdio\'s own implementation experts accelerate deployment with proven methodologies.',
    icon: '⚡',
    color: 'purple',

    timelineReduction: {
      overall: 0.25, // 25% overall reduction
      phases: {
        'Deploy Nerdio': 0.60, // 60% faster Nerdio deployment
        'Design, Build & Configure AVD': 0.40, // 40% faster config
        'Prepare Azure Environment': 0.30 // 30% faster Azure prep
      }
    },

    costSavings: {
      implementationCost: 0.35, // 35% lower implementation
      riskMitigation: 0.50, // 50% risk reduction
      description: 'Expert guidance reduces rework and accelerates deployment'
    },

    triggers: {
      complexityScore: 50,
      weeksOverBudget: 3,
      firstTimeAVD: true
    },

    highlights: [
      '60% faster Nerdio deployment',
      'Proven implementation playbook',
      'Reduced project risk',
      'Knowledge transfer included'
    ]
  },

  liquidware: {
    id: 'liquidware',
    name: 'Liquidware',
    shortName: 'Liquidware',
    tagline: 'Profile & Environment Migration',
    description: 'Seamless user profile migration from Citrix/VMware with zero user disruption.',
    icon: '👤',
    color: 'teal',

    timelineReduction: {
      overall: 0.15, // 15% overall
      phases: {
        'User & Use Case Migration': 0.35, // 35% faster migration
        'Pilot Group Testing': 0.25, // 25% faster testing
        'Design, Build & Configure AVD': 0.10 // 10% faster (profile setup)
      }
    },

    costSavings: {
      profileMigration: 0.60, // 60% lower profile migration cost
      userDowntime: 0.80, // 80% reduction in user downtime
      description: 'Automated profile migration eliminates manual work'
    },

    triggers: {
      hasCitrix: true,
      hasVMware: true,
      userCountMin: 200
    },

    highlights: [
      '35% faster user migration',
      '60% lower profile costs',
      'Zero user disruption',
      'Citrix/VMware expertise'
    ]
  },

  controlup: {
    id: 'controlup',
    name: 'ControlUp',
    shortName: 'ControlUp',
    tagline: 'Monitoring & Performance',
    description: 'Real-time monitoring accelerates troubleshooting and reduces pilot testing time.',
    icon: '📊',
    color: 'blue',

    timelineReduction: {
      overall: 0.10, // 10% overall
      phases: {
        'Pilot Group Testing': 0.40, // 40% faster testing with monitoring
        'User & Use Case Migration': 0.15 // 15% faster (quick issue resolution)
      }
    },

    costSavings: {
      troubleshooting: 0.70, // 70% faster troubleshooting
      supportCosts: 0.45, // 45% lower ongoing support
      description: 'Proactive monitoring catches issues before they cause delays'
    },

    triggers: {
      userCountMin: 300,
      multiEnvironment: true,
      weeksOverBudget: 1
    },

    highlights: [
      '40% faster pilot testing',
      '70% faster troubleshooting',
      'Real-time performance insights',
      'Proactive issue detection'
    ]
  },

  lakeside: {
    id: 'lakeside',
    name: 'Lakeside SysTrack',
    shortName: 'Lakeside',
    tagline: 'Data-Driven Assessment & Sizing',
    description: 'Workspace analytics provides accurate sizing, app inventory, and persona mapping for faster planning.',
    icon: '📈',
    color: 'blue',

    timelineReduction: {
      overall: 0.22, // 22% overall timeline reduction
      phases: {
        'Prepare Azure Environment': 0.35, // 35% - accurate sizing speeds up Azure setup
        'Design, Build & Configure AVD': 0.40, // 40% - data-driven design is faster
        'Pilot Group Testing': 0.25, // 25% - fewer surprises with accurate data
        'Prepare & Transform Applications': 0.15 // 15% - app inventory accelerates planning
      }
    },

    costSavings: {
      overProvisioning: 0.25, // 25% reduction in over-provisioning
      discoveryLabor: 0.70, // 70% less manual discovery work
      riskMitigation: 0.50, // 50% risk reduction from data-driven decisions
      description: 'Eliminates guesswork with data-driven sizing and planning'
    },

    triggers: {
      userCountMin: 300,
      weeksOverBudget: 2,
      hasComplexMigration: true,
      unknownWorkloads: true
    },

    highlights: [
      '40% faster design phase',
      '25% less over-provisioning',
      'Automated app inventory',
      'Data-driven persona mapping'
    ]
  }
};

/**
 * Calculate timeline reduction when applying a partner
 * @param {Object} phases - Current phases with weeks
 * @param {string} partnerId - Partner to apply
 * @returns {Object} - Adjusted phases and summary
 */
export function calculatePartnerTimelineImpact(phases, partnerId) {
  const partner = TIMELINE_PARTNERS[partnerId];
  if (!partner) return { phases, weeksSaved: 0 };

  let totalWeeksSaved = 0;
  const adjustedPhases = phases.map(phase => {
    const phaseReduction = partner.timelineReduction.phases[phase.name] || 0;
    const weeksSaved = phase.weeks * phaseReduction;
    totalWeeksSaved += weeksSaved;

    return {
      ...phase,
      originalWeeks: phase.weeks,
      weeks: Math.max(1, phase.weeks - weeksSaved), // Minimum 1 week per phase
      weeksSaved,
      reductionPercent: phaseReduction * 100,
      acceleratedBy: phaseReduction > 0 ? partnerId : null
    };
  });

  return {
    phases: adjustedPhases,
    weeksSaved: Math.round(totalWeeksSaved * 10) / 10,
    overallReduction: partner.timelineReduction.overall,
    costSavings: partner.costSavings
  };
}

/**
 * Calculate combined timeline impact from multiple partners
 * @param {Object} phases - Current phases with weeks
 * @param {Array} partnerIds - Partners to apply
 * @returns {Object} - Combined adjusted phases and summary
 */
export function calculateCombinedPartnerImpact(phases, partnerIds) {
  if (!partnerIds || partnerIds.length === 0) {
    return { phases, weeksSaved: 0, partners: [] };
  }

  let currentPhases = phases;
  let totalWeeksSaved = 0;
  const partnerImpacts = [];

  // Apply each partner's impact (with diminishing returns for overlapping phases)
  partnerIds.forEach((partnerId, index) => {
    const partner = TIMELINE_PARTNERS[partnerId];
    if (!partner) return;

    const diminishingFactor = index === 0 ? 1 : 0.7; // 30% diminishing returns for subsequent partners

    currentPhases = currentPhases.map(phase => {
      const existingReduction = phase.reductionPercent || 0;
      const partnerReduction = (partner.timelineReduction.phases[phase.name] || 0) * diminishingFactor;

      // Don't reduce beyond 80% total
      const maxAdditionalReduction = Math.max(0, 0.80 - (existingReduction / 100));
      const actualReduction = Math.min(partnerReduction, maxAdditionalReduction);
      const additionalWeeksSaved = (phase.originalWeeks || phase.weeks) * actualReduction;

      return {
        ...phase,
        originalWeeks: phase.originalWeeks || phase.weeks,
        weeks: Math.max(1, phase.weeks - additionalWeeksSaved),
        weeksSaved: (phase.weeksSaved || 0) + additionalWeeksSaved,
        reductionPercent: existingReduction + (actualReduction * 100),
        acceleratedBy: actualReduction > 0
          ? [...(phase.acceleratedBy ? [phase.acceleratedBy] : []), partnerId].flat()
          : phase.acceleratedBy
      };
    });

    const partnerWeeksSaved = currentPhases.reduce((sum, p) => {
      const origWeeks = phases.find(orig => orig.name === p.name)?.weeks || p.originalWeeks;
      return sum + (origWeeks - p.weeks);
    }, 0) - totalWeeksSaved;

    totalWeeksSaved += partnerWeeksSaved;

    partnerImpacts.push({
      ...partner,
      weeksSaved: Math.round(partnerWeeksSaved * 10) / 10
    });
  });

  return {
    phases: currentPhases,
    weeksSaved: Math.round(totalWeeksSaved * 10) / 10,
    partners: partnerImpacts,
    combinedCostSavings: calculateCombinedCostSavings(partnerIds)
  };
}

/**
 * Calculate combined cost savings estimate
 */
function calculateCombinedCostSavings(partnerIds) {
  let totalSavingsPercent = 0;
  const categories = new Set();

  partnerIds.forEach(id => {
    const partner = TIMELINE_PARTNERS[id];
    if (!partner) return;

    // Sum up different cost categories (no double counting)
    Object.entries(partner.costSavings).forEach(([category, value]) => {
      if (category !== 'description' && !categories.has(category)) {
        categories.add(category);
        totalSavingsPercent += value * 100;
      }
    });
  });

  return {
    totalPercent: Math.min(totalSavingsPercent, 70), // Cap at 70%
    categories: Array.from(categories)
  };
}

/**
 * Get recommended partners based on timeline gap
 * @param {number} weeksShort - How many weeks short of target
 * @param {Object} formData - Form data for context
 * @returns {Array} - Recommended partners sorted by impact
 */
export function getRecommendedPartners(weeksShort, formData = {}) {
  const recommendations = [];

  Object.values(TIMELINE_PARTNERS).forEach(partner => {
    let relevanceScore = 0;
    const reasons = [];

    // Check if weeks short triggers recommendation
    if (weeksShort >= (partner.triggers.weeksOverBudget || 0)) {
      relevanceScore += 3;
      reasons.push(`Can help close ${weeksShort} week gap`);
    }

    // Check other triggers
    if (partner.triggers.modernizationRequired && formData.modernization === '3') {
      relevanceScore += 2;
      reasons.push('App modernization needed');
    }

    if (partner.triggers.complexityScore && parseInt(formData.totalScore) >= partner.triggers.complexityScore) {
      relevanceScore += 2;
      reasons.push('High complexity project');
    }

    if (partner.triggers.hasCitrix && (formData.citrixCloud === '3' || formData.citrixOnPrem === '3')) {
      relevanceScore += 2;
      reasons.push('Citrix migration detected');
    }

    // Lakeside-specific triggers
    if (partner.triggers.hasComplexMigration &&
        (formData.citrixCloud === '3' || formData.citrixOnPrem === '3' || formData.vmware === '3')) {
      relevanceScore += 2;
      reasons.push('Complex VDI migration benefits from data-driven assessment');
    }

    if (partner.triggers.unknownWorkloads && !formData.hasAssessmentData) {
      relevanceScore += 3;
      reasons.push('No existing assessment data - Lakeside provides accurate sizing');
    }

    // User count based recommendation for Lakeside
    if (partner.id === 'lakeside' && parseInt(formData.userCount) >= 500) {
      relevanceScore += 2;
      reasons.push('Large user base benefits from data-driven sizing');
    }

    if (relevanceScore > 0) {
      recommendations.push({
        ...partner,
        relevanceScore,
        reasons,
        estimatedWeeksSaved: Math.round(weeksShort * partner.timelineReduction.overall * 10) / 10
      });
    }
  });

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export default {
  TIMELINE_PARTNERS,
  calculatePartnerTimelineImpact,
  calculateCombinedPartnerImpact,
  getRecommendedPartners
};
