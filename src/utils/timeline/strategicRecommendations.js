/**
 * Strategic Recommendations Engine for Timeline Calculator
 *
 * Generates comprehensive, actionable recommendations based on
 * complexity factors, timeline pressure, and migration context.
 */

import { TIMELINE_PARTNERS, getRecommendedPartners } from '../../constants/timelinePartners';

/**
 * Recommendation categories for organized display
 */
export const RECOMMENDATION_CATEGORIES = {
  timeline: {
    id: 'timeline',
    label: 'Timeline Strategy',
    icon: 'Clock',
    color: 'blue',
    description: 'Recommendations to meet your target date'
  },
  partners: {
    id: 'partners',
    label: 'Partner Stack',
    icon: 'Users',
    color: 'purple',
    description: 'Technology partners to accelerate delivery'
  },
  approach: {
    id: 'approach',
    label: 'Migration Approach',
    icon: 'Route',
    color: 'indigo',
    description: 'Strategic approach recommendations'
  },
  risk: {
    id: 'risk',
    label: 'Risk Mitigation',
    icon: 'Shield',
    color: 'amber',
    description: 'Proactive risk management'
  },
  resources: {
    id: 'resources',
    label: 'Resources & Team',
    icon: 'Users',
    color: 'green',
    description: 'Staffing and skill recommendations'
  },
  prework: {
    id: 'prework',
    label: 'Pre-Work Opportunities',
    icon: 'Zap',
    color: 'orange',
    description: 'Work that can start before project kickoff'
  }
};

/**
 * Priority levels for recommendations
 */
const PRIORITY = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4
};

/**
 * Generate comprehensive strategic recommendations
 * @param {Object} params - Parameters for generating recommendations
 * @param {number} params.delta - Weeks available minus weeks required (negative = short)
 * @param {number} params.weeksRequired - Total weeks required
 * @param {number} params.weeksAvailable - Weeks available until go-live
 * @param {Object} params.breakdown - Complexity factor breakdown
 * @param {Object} params.formData - Form data with all inputs
 * @param {number} params.totalScore - Total complexity score
 * @returns {Object} - Categorized recommendations
 */
export function generateStrategicRecommendations({
  delta,
  weeksRequired,
  weeksAvailable,
  breakdown,
  formData,
  totalScore
}) {
  const recommendations = {
    timeline: [],
    partners: [],
    approach: [],
    risk: [],
    resources: [],
    prework: []
  };

  // Analyze the situation
  const context = analyzeContext(delta, weeksRequired, weeksAvailable, breakdown, formData, totalScore);

  // Generate recommendations for each category
  recommendations.timeline = generateTimelineRecommendations(context);
  recommendations.partners = generatePartnerRecommendations(context);
  recommendations.approach = generateApproachRecommendations(context);
  recommendations.risk = generateRiskRecommendations(context);
  recommendations.resources = generateResourceRecommendations(context);
  recommendations.prework = generatePreworkRecommendations(context);

  // Sort each category by priority
  Object.keys(recommendations).forEach(category => {
    recommendations[category].sort((a, b) => a.priority - b.priority);
  });

  // Calculate summary metrics
  const summary = generateSummary(recommendations, context);

  return {
    recommendations,
    summary,
    context
  };
}

/**
 * Analyze the project context to inform recommendations
 */
function analyzeContext(delta, weeksRequired, weeksAvailable, breakdown, formData, totalScore) {
  // Identify top complexity drivers
  const topDrivers = breakdown
    .filter(b => b.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Calculate category scores
  const categoryScores = {};
  breakdown.forEach(item => {
    if (!categoryScores[item.category]) {
      categoryScores[item.category] = 0;
    }
    categoryScores[item.category] += item.score;
  });

  // Determine timeline pressure
  let timelinePressure = 'comfortable';
  if (delta < 0) timelinePressure = 'critical';
  else if (delta < 4) timelinePressure = 'tight';
  else if (delta < 8) timelinePressure = 'moderate';

  // Identify migration type
  const migrationContext = {
    hasCitrix: formData.citrixCloud === '3' || formData.citrixOnPrem === '3' || formData.citrixHybrid === '3',
    hasVMware: false, // Add if field exists
    isPhysicalToCloud: formData.onPremToCloud === '3',
    hasAppModernization: formData.modernization === '3',
    hasHighAppCount: formData.apps === '3',
    hasLandingZoneWork: formData.landingZone === '3',
    hasSecurityReview: formData.security === '3',
    hasChangeControlComplexity: formData.changeControl === '3',
    hasBackendConnections: formData.backend === '3',
    hasPeripherals: formData.peripherals === '3'
  };

  // Determine user scale
  const userScale = {
    '1': 'small',
    '2': 'medium',
    '3': 'large'
  }[formData.users] || 'small';

  return {
    delta,
    weeksRequired,
    weeksAvailable,
    totalScore,
    topDrivers,
    categoryScores,
    timelinePressure,
    migrationContext,
    userScale,
    formData
  };
}

/**
 * Generate timeline-focused recommendations
 */
function generateTimelineRecommendations(context) {
  const recs = [];
  const { delta, timelinePressure, weeksRequired, weeksAvailable } = context;

  if (timelinePressure === 'critical') {
    recs.push({
      id: 'timeline-critical',
      type: 'critical',
      priority: PRIORITY.CRITICAL,
      title: 'Timeline at Risk',
      text: `Current estimates show the project is ~${Math.abs(delta).toFixed(1)} weeks short of the target date. Immediate action required.`,
      actions: [
        'Review go-live date with stakeholders',
        'Identify scope reduction opportunities',
        'Consider partner acceleration options'
      ],
      impact: 'high',
      category: 'timeline'
    });

    recs.push({
      id: 'timeline-extend',
      type: 'action',
      priority: PRIORITY.HIGH,
      title: 'Consider Date Adjustment',
      text: `Recommend extending target date by ${Math.abs(delta + 4).toFixed(0)}-${Math.abs(delta + 6).toFixed(0)} weeks to include appropriate buffer.`,
      rationale: 'Projects without buffer frequently miss deadlines due to unforeseen complexities.',
      impact: 'high',
      category: 'timeline'
    });
  } else if (timelinePressure === 'tight') {
    recs.push({
      id: 'timeline-tight',
      type: 'warning',
      priority: PRIORITY.HIGH,
      title: 'Limited Buffer Available',
      text: `Timeline has ~${delta.toFixed(1)} weeks buffer. This is tight for projects of this complexity.`,
      actions: [
        'Lock scope early to prevent creep',
        'Establish weekly progress checkpoints',
        'Identify backup resources for critical phases'
      ],
      impact: 'medium',
      category: 'timeline'
    });
  } else if (timelinePressure === 'moderate') {
    recs.push({
      id: 'timeline-moderate',
      type: 'info',
      priority: PRIORITY.MEDIUM,
      title: 'Adequate Timeline with Moderate Buffer',
      text: `${delta.toFixed(1)} weeks of buffer provides reasonable flexibility for this project.`,
      actions: [
        'Use buffer for thorough testing',
        'Consider adding quality checkpoints',
        'Plan for user adoption activities'
      ],
      impact: 'medium',
      category: 'timeline'
    });
  } else {
    recs.push({
      id: 'timeline-comfortable',
      type: 'success',
      priority: PRIORITY.LOW,
      title: 'Comfortable Timeline',
      text: `${delta.toFixed(1)} weeks buffer allows for comprehensive delivery.`,
      actions: [
        'Consider expanding pilot scope',
        'Add additional testing phases',
        'Plan enhanced user training program'
      ],
      impact: 'low',
      category: 'timeline'
    });
  }

  return recs;
}

/**
 * Generate partner-specific recommendations
 */
function generatePartnerRecommendations(context) {
  const recs = [];
  const { delta, migrationContext, totalScore, userScale, formData, timelinePressure, weeksRequired } = context;

  const weeksShort = Math.max(0, -delta);

  // Recast - Application Modernization
  if (migrationContext.hasAppModernization || migrationContext.hasHighAppCount) {
    recs.push({
      id: 'partner-recast',
      type: 'partner',
      priority: PRIORITY.HIGH,
      partner: TIMELINE_PARTNERS.recast,
      title: 'Recast Software - Application Packaging',
      text: 'App modernization is a significant complexity driver. Recast\'s 7,000+ pre-packaged apps and MSIX automation can dramatically reduce this timeline.',
      rationale: [
        migrationContext.hasAppModernization ? '10x complexity multiplier from app modernization' : null,
        migrationContext.hasHighAppCount ? 'Large application portfolio requires efficient packaging' : null,
        'Pre-packaged apps eliminate manual packaging effort'
      ].filter(Boolean),
      potentialSavings: {
        weeks: Math.round(weeksRequired * 0.15 * 10) / 10,
        description: '~70% reduction in app preparation time'
      },
      impact: 'high',
      category: 'partners'
    });
  }

  // Juriba - Migration Orchestration (for large/complex migrations)
  if (userScale === 'large' || weeksShort > 4 || totalScore > 60) {
    recs.push({
      id: 'partner-juriba',
      type: 'partner',
      priority: timelinePressure === 'critical' ? PRIORITY.CRITICAL : PRIORITY.HIGH,
      partner: TIMELINE_PARTNERS.juriba,
      title: 'Juriba Dashworks - Migration Acceleration',
      text: 'For projects of this scale and complexity, Juriba\'s migration orchestration platform can significantly accelerate user migration phases.',
      rationale: [
        userScale === 'large' ? 'Large user count benefits from automated wave planning' : null,
        weeksShort > 4 ? 'Can help close significant timeline gap' : null,
        totalScore > 60 ? 'High complexity projects need orchestration' : null,
        'Automated user communications reduce admin overhead'
      ].filter(Boolean),
      potentialSavings: {
        weeks: Math.round(weeksRequired * 0.30 * 10) / 10,
        description: '50% faster user migration, 58% lower migration costs'
      },
      impact: 'high',
      category: 'partners'
    });
  }

  // Liquidware - Citrix/VMware Profile Migration
  if (migrationContext.hasCitrix) {
    recs.push({
      id: 'partner-liquidware',
      type: 'partner',
      priority: PRIORITY.MEDIUM,
      partner: TIMELINE_PARTNERS.liquidware,
      title: 'Liquidware - Profile Migration',
      text: 'Citrix migration detected. Liquidware provides seamless profile migration from Citrix environments with zero user disruption.',
      rationale: [
        'Automated profile conversion from Citrix',
        'Preserves user personalization and settings',
        'Reduces user training requirements'
      ],
      potentialSavings: {
        weeks: Math.round(weeksRequired * 0.15 * 10) / 10,
        description: '35% faster migration, 60% lower profile costs'
      },
      impact: 'medium',
      category: 'partners'
    });
  }

  // Nerdio Professional Services
  if (totalScore > 50 || timelinePressure === 'critical') {
    recs.push({
      id: 'partner-nerdio-ps',
      type: 'partner',
      priority: PRIORITY.HIGH,
      partner: TIMELINE_PARTNERS.nerdioPS,
      title: 'Nerdio Professional Services',
      text: 'Given the project complexity, engaging Nerdio\'s implementation experts can accelerate deployment and reduce risk.',
      rationale: [
        'Proven implementation playbooks',
        'Deep Nerdio platform expertise',
        'Risk mitigation through experience',
        'Knowledge transfer to internal team'
      ],
      potentialSavings: {
        weeks: Math.round(weeksRequired * 0.25 * 10) / 10,
        description: '60% faster Nerdio deployment, reduced rework'
      },
      impact: 'high',
      category: 'partners'
    });
  }

  // ControlUp - Monitoring
  if (userScale !== 'small' || migrationContext.hasCitrix) {
    recs.push({
      id: 'partner-controlup',
      type: 'partner',
      priority: PRIORITY.MEDIUM,
      partner: TIMELINE_PARTNERS.controlup,
      title: 'ControlUp - Monitoring & Performance',
      text: 'Real-time monitoring accelerates troubleshooting during pilot and migration phases.',
      rationale: [
        'Proactive issue detection reduces delays',
        '70% faster troubleshooting',
        'User experience visibility',
        migrationContext.hasCitrix ? 'Compare Citrix vs AVD performance' : null
      ].filter(Boolean),
      potentialSavings: {
        weeks: Math.round(weeksRequired * 0.10 * 10) / 10,
        description: '40% faster pilot testing'
      },
      impact: 'medium',
      category: 'partners'
    });
  }

  return recs;
}

/**
 * Generate migration approach recommendations
 */
function generateApproachRecommendations(context) {
  const recs = [];
  const { totalScore, userScale, migrationContext, timelinePressure, topDrivers } = context;

  // Phased vs Big-Bang recommendation
  if (totalScore > 60 || userScale === 'large') {
    recs.push({
      id: 'approach-phased',
      type: 'approach',
      priority: PRIORITY.HIGH,
      title: 'Phased Migration Approach Recommended',
      text: 'Given the complexity score and scale, a phased approach will reduce risk and allow for learning between waves.',
      strategy: {
        name: 'Phased Rollout',
        phases: [
          { name: 'Wave 1: Pilot', users: '5-10%', duration: '2-3 weeks', focus: 'Validate architecture & process' },
          { name: 'Wave 2: Early Adopters', users: '15-20%', duration: '3-4 weeks', focus: 'Refine based on feedback' },
          { name: 'Wave 3-N: Main Migration', users: 'Remaining', duration: 'Variable', focus: 'Production rollout' }
        ]
      },
      rationale: [
        'Learn from each wave before scaling',
        'Identify issues with smaller blast radius',
        'Build internal expertise progressively'
      ],
      impact: 'high',
      category: 'approach'
    });
  } else {
    recs.push({
      id: 'approach-accelerated',
      type: 'approach',
      priority: PRIORITY.MEDIUM,
      title: 'Accelerated Migration Possible',
      text: 'Moderate complexity allows for a more aggressive migration timeline with larger waves.',
      strategy: {
        name: 'Accelerated Rollout',
        phases: [
          { name: 'Pilot', users: '10-15%', duration: '2 weeks', focus: 'Quick validation' },
          { name: 'Full Migration', users: '85-90%', duration: '3-4 weeks', focus: 'Rapid deployment' }
        ]
      },
      rationale: [
        'Lower risk profile supports larger waves',
        'Faster time to value',
        'Reduced parallel environment costs'
      ],
      impact: 'medium',
      category: 'approach'
    });
  }

  // Pilot strategy
  const pilotStrategy = determinePilotStrategy(context);
  recs.push({
    id: 'approach-pilot',
    type: 'approach',
    priority: PRIORITY.MEDIUM,
    title: 'Pilot Group Strategy',
    text: pilotStrategy.description,
    strategy: {
      name: 'Pilot Composition',
      composition: pilotStrategy.composition
    },
    rationale: pilotStrategy.rationale,
    impact: 'medium',
    category: 'approach'
  });

  // Application prioritization
  if (migrationContext.hasHighAppCount || migrationContext.hasAppModernization) {
    recs.push({
      id: 'approach-apps',
      type: 'approach',
      priority: PRIORITY.HIGH,
      title: 'Application Tiering Strategy',
      text: 'Prioritize applications into tiers to manage complexity and accelerate initial deployment.',
      strategy: {
        name: 'App Tiering',
        tiers: [
          { tier: 'Tier 1 - Core', criteria: 'Business-critical, high daily usage', timing: 'Day 1' },
          { tier: 'Tier 2 - Standard', criteria: 'Regular use, standard packaging', timing: 'Wave 2' },
          { tier: 'Tier 3 - Specialized', criteria: 'Complex dependencies, legacy', timing: 'Later phases' },
          { tier: 'Tier 4 - Deferred', criteria: 'Rarely used, candidates for retirement', timing: 'Evaluate need' }
        ]
      },
      rationale: [
        'Focus initial effort on highest-value apps',
        'Allow more time for complex app remediation',
        'Opportunity to retire unused applications'
      ],
      impact: 'high',
      category: 'approach'
    });
  }

  // Parallel workstream opportunity
  if (timelinePressure === 'critical' || timelinePressure === 'tight') {
    recs.push({
      id: 'approach-parallel',
      type: 'approach',
      priority: PRIORITY.HIGH,
      title: 'Parallel Workstream Execution',
      text: 'Compress timeline by running workstreams in parallel where dependencies allow.',
      strategy: {
        name: 'Parallel Execution',
        workstreams: [
          { stream: 'Azure Landing Zone', parallel: 'App Discovery & Assessment' },
          { stream: 'Nerdio Configuration', parallel: 'User Communications Planning' },
          { stream: 'App Packaging', parallel: 'Profile Migration Setup' }
        ]
      },
      rationale: [
        'Reduces critical path duration',
        'Requires additional coordination overhead',
        'Best with experienced delivery team'
      ],
      impact: 'high',
      category: 'approach'
    });
  }

  return recs;
}

/**
 * Determine optimal pilot strategy based on context
 */
function determinePilotStrategy(context) {
  const { migrationContext, userScale, totalScore } = context;

  if (totalScore > 70) {
    return {
      description: 'Start with a small, controlled pilot to validate complex configurations.',
      composition: [
        { group: 'IT Power Users', percentage: '2-3%', reason: 'Can troubleshoot issues, provide detailed feedback' },
        { group: 'Representative Users', percentage: '3-5%', reason: 'Variety of use cases and app needs' },
        { group: 'Executive Sponsor', percentage: '1-2 people', reason: 'Visibility and buy-in' }
      ],
      rationale: [
        'High complexity warrants cautious approach',
        'Small blast radius for issue identification',
        'IT users can self-support during validation'
      ]
    };
  }

  if (migrationContext.hasAppModernization) {
    return {
      description: 'Pilot should focus on validating application functionality across user profiles.',
      composition: [
        { group: 'App Super Users', percentage: '5-10%', reason: 'Deep knowledge of application behavior' },
        { group: 'Cross-Departmental', percentage: '5-10%', reason: 'Different app usage patterns' },
        { group: 'Remote Workers', percentage: '2-5%', reason: 'Test network and latency scenarios' }
      ],
      rationale: [
        'App modernization needs diverse testing',
        'Identify edge cases before mass rollout',
        'Build app compatibility confidence'
      ]
    };
  }

  return {
    description: 'Standard pilot approach with representative user groups.',
    composition: [
      { group: 'Early Adopters', percentage: '10-15%', reason: 'Enthusiastic users accelerate adoption' },
      { group: 'Key Departments', percentage: '5-10%', reason: 'Business-critical teams first' },
      { group: 'IT Team', percentage: '100%', reason: 'Dogfooding builds support capability' }
    ],
    rationale: [
      'Balanced approach for moderate complexity',
      'Build momentum with positive feedback',
      'IT team gains hands-on experience'
    ]
  };
}

/**
 * Generate risk mitigation recommendations
 */
function generateRiskRecommendations(context) {
  const recs = [];
  const { migrationContext, topDrivers, totalScore, timelinePressure, categoryScores } = context;

  // Change control risk
  if (migrationContext.hasChangeControlComplexity) {
    recs.push({
      id: 'risk-change-control',
      type: 'risk',
      priority: PRIORITY.HIGH,
      title: 'Change Control Bottleneck Risk',
      text: 'Complex change control processes identified as a major timeline risk.',
      mitigations: [
        {
          action: 'Pre-approve standard changes',
          detail: 'Get CAB pre-approval for routine AVD configuration changes'
        },
        {
          action: 'Establish project-specific CAB schedule',
          detail: 'Request dedicated weekly change slots during project'
        },
        {
          action: 'Create change templates',
          detail: 'Pre-document common changes to expedite reviews'
        }
      ],
      likelihood: 'high',
      impact: 'high',
      category: 'risk'
    });
  }

  // Security review risk
  if (migrationContext.hasSecurityReview) {
    recs.push({
      id: 'risk-security',
      type: 'risk',
      priority: PRIORITY.HIGH,
      title: 'Security Review Timeline Risk',
      text: 'Security review requirements may create approval bottlenecks.',
      mitigations: [
        {
          action: 'Engage security early',
          detail: 'Involve security team in design phase, not just approval'
        },
        {
          action: 'Leverage Nerdio security documentation',
          detail: 'Use Nerdio compliance docs to pre-answer common questions'
        },
        {
          action: 'Request parallel security review',
          detail: 'Ask for review during build, not after completion'
        }
      ],
      likelihood: 'medium',
      impact: 'high',
      category: 'risk'
    });
  }

  // App complexity risk
  if (migrationContext.hasAppModernization || migrationContext.hasHighAppCount) {
    recs.push({
      id: 'risk-apps',
      type: 'risk',
      priority: PRIORITY.CRITICAL,
      title: 'Application Compatibility Risk',
      text: 'Application modernization is the highest-impact complexity factor.',
      mitigations: [
        {
          action: 'Complete app discovery ASAP',
          detail: 'Full inventory before design phase begins'
        },
        {
          action: 'Identify problem apps early',
          detail: 'Flag apps requiring special attention or retirement'
        },
        {
          action: 'Establish app owner accountability',
          detail: 'Each app needs an owner for testing sign-off'
        },
        {
          action: 'Plan for exceptions',
          detail: 'Have a process for apps that cannot migrate initially'
        }
      ],
      likelihood: 'high',
      impact: 'critical',
      category: 'risk'
    });
  }

  // Landing zone risk
  if (migrationContext.hasLandingZoneWork) {
    recs.push({
      id: 'risk-landing-zone',
      type: 'risk',
      priority: PRIORITY.MEDIUM,
      title: 'Azure Landing Zone Dependency',
      text: 'New landing zone work is on the critical path.',
      mitigations: [
        {
          action: 'Start landing zone immediately',
          detail: 'Begin Azure work before formal project kickoff if possible'
        },
        {
          action: 'Use proven landing zone templates',
          detail: 'Microsoft CAF or Nerdio reference architectures'
        },
        {
          action: 'Validate network connectivity early',
          detail: 'ExpressRoute/VPN validation often causes delays'
        }
      ],
      likelihood: 'medium',
      impact: 'medium',
      category: 'risk'
    });
  }

  // General complexity risk
  if (totalScore > 70) {
    recs.push({
      id: 'risk-complexity',
      type: 'risk',
      priority: PRIORITY.HIGH,
      title: 'Overall Complexity Risk',
      text: `Complexity score of ${totalScore} indicates elevated project risk.`,
      mitigations: [
        {
          action: 'Establish risk review cadence',
          detail: 'Weekly risk review with escalation path'
        },
        {
          action: 'Define success criteria early',
          detail: 'Clear go/no-go criteria for each phase'
        },
        {
          action: 'Build contingency time',
          detail: 'Include buffer in each phase, not just overall'
        }
      ],
      likelihood: 'medium',
      impact: 'high',
      category: 'risk'
    });
  }

  // Integration risk
  if (migrationContext.hasBackendConnections) {
    recs.push({
      id: 'risk-integration',
      type: 'risk',
      priority: PRIORITY.MEDIUM,
      title: 'Backend Integration Risk',
      text: 'Complex backend connections may introduce unexpected dependencies.',
      mitigations: [
        {
          action: 'Map all backend dependencies',
          detail: 'Document every connection apps make to backend systems'
        },
        {
          action: 'Test connectivity from Azure early',
          detail: 'Validate network paths before app migration'
        },
        {
          action: 'Engage backend system owners',
          detail: 'Notify teams of upcoming connection changes'
        }
      ],
      likelihood: 'medium',
      impact: 'medium',
      category: 'risk'
    });
  }

  return recs;
}

/**
 * Generate resource and team recommendations
 */
function generateResourceRecommendations(context) {
  const recs = [];
  const { totalScore, userScale, timelinePressure, migrationContext } = context;

  // Dedicated PM recommendation
  if (totalScore > 50 || userScale === 'large') {
    recs.push({
      id: 'resource-pm',
      type: 'resource',
      priority: PRIORITY.HIGH,
      title: 'Dedicated Project Manager',
      text: 'Project complexity warrants a dedicated PM to coordinate workstreams.',
      requirements: {
        role: 'Project Manager',
        allocation: '100%',
        skills: ['AVD/VDI experience', 'Change management', 'Vendor coordination'],
        timing: 'Start to finish'
      },
      rationale: [
        'Complex dependencies need active coordination',
        'Multiple vendor/partner involvement',
        'Risk management and escalation'
      ],
      impact: 'high',
      category: 'resources'
    });
  }

  // AVD/Nerdio expertise
  recs.push({
    id: 'resource-avd-expert',
    type: 'resource',
    priority: PRIORITY.HIGH,
    title: 'AVD Technical Lead',
    text: 'Ensure team has Azure Virtual Desktop and Nerdio expertise.',
    requirements: {
      role: 'AVD Technical Lead',
      allocation: '80-100%',
      skills: ['Azure infrastructure', 'Nerdio Manager', 'FSLogix', 'AVD troubleshooting'],
      timing: 'Design through stabilization'
    },
    alternatives: [
      'Nerdio Professional Services engagement',
      'Microsoft FastTrack for AVD',
      'Nerdio-certified partner'
    ],
    impact: 'high',
    category: 'resources'
  });

  // App packaging resources
  if (migrationContext.hasAppModernization || migrationContext.hasHighAppCount) {
    recs.push({
      id: 'resource-app-packaging',
      type: 'resource',
      priority: PRIORITY.HIGH,
      title: 'Application Packaging Specialist',
      text: 'App modernization requires dedicated packaging expertise.',
      requirements: {
        role: 'App Packaging Specialist',
        allocation: '100% during app phase',
        skills: ['MSIX packaging', 'App-V', 'Application compatibility testing'],
        timing: 'App preparation phase'
      },
      alternatives: [
        'Recast Software professional services',
        'Specialized app packaging vendor'
      ],
      impact: 'high',
      category: 'resources'
    });
  }

  // End user support
  if (userScale !== 'small') {
    recs.push({
      id: 'resource-support',
      type: 'resource',
      priority: PRIORITY.MEDIUM,
      title: 'Migration Support Team',
      text: 'Dedicated support resources during migration waves.',
      requirements: {
        role: 'Migration Support',
        allocation: 'Variable by wave',
        skills: ['AVD user support', 'Troubleshooting', 'User training'],
        timing: 'Pilot through hypercare'
      },
      sizing: {
        small: '1-2 support staff',
        medium: '2-4 support staff',
        large: '4-8 support staff + floor walkers'
      },
      impact: 'medium',
      category: 'resources'
    });
  }

  // Communication/change management
  if (userScale === 'large' || totalScore > 60) {
    recs.push({
      id: 'resource-change-mgmt',
      type: 'resource',
      priority: PRIORITY.MEDIUM,
      title: 'Change Management Support',
      text: 'User adoption success requires structured change management.',
      requirements: {
        role: 'Change Manager / Communications Lead',
        allocation: '50-100%',
        skills: ['Internal communications', 'Training development', 'Adoption metrics'],
        timing: 'Planning through hypercare'
      },
      activities: [
        'User communication plan',
        'Training material development',
        'Adoption tracking and reporting',
        'Feedback loop management'
      ],
      impact: 'medium',
      category: 'resources'
    });
  }

  return recs;
}

/**
 * Generate pre-work recommendations
 */
function generatePreworkRecommendations(context) {
  const recs = [];
  const { migrationContext, timelinePressure } = context;

  // Landing zone pre-work
  if (migrationContext.hasLandingZoneWork) {
    recs.push({
      id: 'prework-landing-zone',
      type: 'prework',
      priority: PRIORITY.HIGH,
      title: 'Azure Landing Zone Preparation',
      text: 'Start Azure infrastructure work before formal project kickoff.',
      activities: [
        { task: 'Azure subscription setup', duration: '1 week', owner: 'Cloud team' },
        { task: 'Network connectivity (ExpressRoute/VPN)', duration: '2-4 weeks', owner: 'Network team' },
        { task: 'Identity integration (AAD Connect)', duration: '1-2 weeks', owner: 'Identity team' },
        { task: 'Security baseline configuration', duration: '1 week', owner: 'Security team' }
      ],
      potentialSavings: '2-3 weeks off critical path',
      impact: 'high',
      category: 'prework'
    });
  }

  // App discovery pre-work
  if (migrationContext.hasHighAppCount || migrationContext.hasAppModernization) {
    recs.push({
      id: 'prework-app-discovery',
      type: 'prework',
      priority: PRIORITY.HIGH,
      title: 'Application Discovery & Assessment',
      text: 'Complete application inventory before project kickoff.',
      activities: [
        { task: 'Deploy app discovery tool', duration: '1 week', owner: 'IT team' },
        { task: 'Collect usage data (30+ days ideal)', duration: '4-6 weeks', owner: 'Automated' },
        { task: 'Identify app owners', duration: '2 weeks', owner: 'PM' },
        { task: 'Initial compatibility assessment', duration: '1-2 weeks', owner: 'App team' }
      ],
      potentialSavings: '3-4 weeks off critical path',
      impact: 'high',
      category: 'prework'
    });
  }

  // Security engagement pre-work
  if (migrationContext.hasSecurityReview) {
    recs.push({
      id: 'prework-security',
      type: 'prework',
      priority: PRIORITY.MEDIUM,
      title: 'Early Security Engagement',
      text: 'Begin security discussions before formal project start.',
      activities: [
        { task: 'Share Nerdio security documentation', duration: '1 day', owner: 'PM' },
        { task: 'Initial architecture review', duration: '1-2 weeks', owner: 'Security team' },
        { task: 'Identify compliance requirements', duration: '1 week', owner: 'Security team' },
        { task: 'Pre-approve reference architecture', duration: '1-2 weeks', owner: 'Security team' }
      ],
      potentialSavings: '2-4 weeks off critical path',
      impact: 'medium',
      category: 'prework'
    });
  }

  // User communication pre-work
  recs.push({
    id: 'prework-communication',
    type: 'prework',
    priority: PRIORITY.LOW,
    title: 'User Communication Preparation',
    text: 'Begin user awareness before migration activities start.',
    activities: [
      { task: 'Executive sponsorship announcement', duration: '1 week', owner: 'Sponsor' },
      { task: 'Initial awareness communications', duration: '1 week', owner: 'PM/Comms' },
      { task: 'Identify change champions', duration: '2 weeks', owner: 'PM' },
      { task: 'Set up feedback channels', duration: '1 week', owner: 'PM' }
    ],
    potentialSavings: 'Improved user adoption',
    impact: 'medium',
    category: 'prework'
  });

  // Profile backup pre-work
  if (migrationContext.hasCitrix) {
    recs.push({
      id: 'prework-profiles',
      type: 'prework',
      priority: PRIORITY.MEDIUM,
      title: 'Profile Migration Preparation',
      text: 'Prepare for profile migration from existing environment.',
      activities: [
        { task: 'Profile size assessment', duration: '1 week', owner: 'VDI team' },
        { task: 'Identify profile cleanup opportunities', duration: '1 week', owner: 'VDI team' },
        { task: 'Test profile migration tooling', duration: '1-2 weeks', owner: 'VDI team' },
        { task: 'Plan FSLogix storage', duration: '1 week', owner: 'Storage team' }
      ],
      potentialSavings: '1-2 weeks off critical path',
      impact: 'medium',
      category: 'prework'
    });
  }

  return recs;
}

/**
 * Generate summary of all recommendations
 */
function generateSummary(recommendations, context) {
  const allRecs = Object.values(recommendations).flat();

  const criticalCount = allRecs.filter(r => r.priority === PRIORITY.CRITICAL).length;
  const highCount = allRecs.filter(r => r.priority === PRIORITY.HIGH).length;
  const partnerCount = recommendations.partners.length;

  // Calculate potential timeline savings from partners
  const potentialWeeksSaved = recommendations.partners.reduce((sum, p) => {
    return sum + (p.potentialSavings?.weeks || 0);
  }, 0);

  return {
    totalRecommendations: allRecs.length,
    criticalItems: criticalCount,
    highPriorityItems: highCount,
    partnerOpportunities: partnerCount,
    potentialTimelineSavings: Math.round(potentialWeeksSaved * 10) / 10,
    timelinePressure: context.timelinePressure,
    complexityLevel: context.totalScore > 70 ? 'high' : context.totalScore > 40 ? 'moderate' : 'low',
    headline: generateHeadline(context, criticalCount, partnerCount)
  };
}

/**
 * Generate a summary headline
 */
function generateHeadline(context, criticalCount, partnerCount) {
  if (context.timelinePressure === 'critical') {
    return `${criticalCount} critical action${criticalCount !== 1 ? 's' : ''} required - ${partnerCount} partner${partnerCount !== 1 ? 's' : ''} can help close timeline gap`;
  }
  if (context.timelinePressure === 'tight') {
    return `Timeline tight - review ${partnerCount} partner opportunities for acceleration`;
  }
  if (context.totalScore > 60) {
    return `High complexity project - ${partnerCount} partners recommended for risk mitigation`;
  }
  return `${Object.values(RECOMMENDATION_CATEGORIES).length} areas reviewed - ${partnerCount} partner opportunities identified`;
}

export default {
  generateStrategicRecommendations,
  RECOMMENDATION_CATEGORIES,
  PRIORITY
};
