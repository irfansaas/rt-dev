/**
 * Phase Activities Breakdown
 *
 * Detailed breakdown of activities within each project phase.
 * Time distribution shows typical allocation (as percentage of phase duration).
 * These are estimates based on historical AVD migration projects.
 */

export const PHASE_ACTIVITIES = {
  'Prepare & Transform Applications': {
    description: 'Application assessment, packaging, and modernization preparation',
    activities: [
      {
        name: 'Application Discovery & Inventory',
        timePercent: 15,
        description: 'Catalog all applications, identify dependencies, and document current state'
      },
      {
        name: 'Compatibility Assessment',
        timePercent: 20,
        description: 'Evaluate applications for AVD compatibility, identify blockers and remediation needs'
      },
      {
        name: 'Application Packaging',
        timePercent: 25,
        description: 'Repackage applications for MSIX App Attach or traditional deployment'
      },
      {
        name: 'Image Design & Optimization',
        timePercent: 20,
        description: 'Design golden images, optimize for performance, integrate applications'
      },
      {
        name: 'Application Testing',
        timePercent: 15,
        description: 'Validate application functionality in test environment'
      },
      {
        name: 'Documentation & Runbooks',
        timePercent: 5,
        description: 'Create deployment documentation and operational runbooks'
      }
    ]
  },

  'Prepare Azure Environment': {
    description: 'Azure infrastructure setup and networking configuration',
    activities: [
      {
        name: 'Landing Zone Setup',
        timePercent: 25,
        description: 'Configure Azure subscriptions, management groups, and governance policies'
      },
      {
        name: 'Network Configuration',
        timePercent: 30,
        description: 'Set up VNets, subnets, NSGs, ExpressRoute/VPN connectivity'
      },
      {
        name: 'Identity Integration',
        timePercent: 20,
        description: 'Configure Entra ID, AD DS sync, conditional access policies'
      },
      {
        name: 'Storage Configuration',
        timePercent: 15,
        description: 'Set up Azure Files, FSLogix profile storage, permissions'
      },
      {
        name: 'Security & Compliance Setup',
        timePercent: 10,
        description: 'Configure Defender for Cloud, logging, monitoring baselines'
      }
    ]
  },

  'Deploy Nerdio': {
    description: 'Nerdio Manager for Enterprise installation and configuration',
    activities: [
      {
        name: 'Prerequisites Validation',
        timePercent: 15,
        description: 'Verify Azure permissions, service principals, network requirements'
      },
      {
        name: 'Nerdio Installation',
        timePercent: 20,
        description: 'Deploy Nerdio Manager for Enterprise from Azure Marketplace'
      },
      {
        name: 'Initial Configuration',
        timePercent: 25,
        description: 'Configure host pools, auto-scaling policies, cost optimization settings'
      },
      {
        name: 'Integration Setup',
        timePercent: 25,
        description: 'Connect to identity provider, configure RBAC, set up notifications'
      },
      {
        name: 'Validation & Testing',
        timePercent: 15,
        description: 'Verify Nerdio functionality, test auto-scaling, validate management features'
      }
    ]
  },

  'Design, Build & Configure AVD': {
    description: 'AVD host pool creation and session host configuration',
    activities: [
      {
        name: 'Host Pool Architecture',
        timePercent: 15,
        description: 'Design host pools per use case, sizing, scaling parameters'
      },
      {
        name: 'Session Host Deployment',
        timePercent: 25,
        description: 'Deploy session hosts from golden images, configure VM settings'
      },
      {
        name: 'Application Delivery',
        timePercent: 20,
        description: 'Configure MSIX App Attach, RemoteApp groups, application assignments'
      },
      {
        name: 'FSLogix Configuration',
        timePercent: 15,
        description: 'Set up profile containers, Office containers, redirections'
      },
      {
        name: 'Security Hardening',
        timePercent: 15,
        description: 'Apply security baselines, configure screen capture protection, watermarking'
      },
      {
        name: 'Monitoring Setup',
        timePercent: 10,
        description: 'Configure AVD Insights, alerts, dashboards via Nerdio'
      }
    ]
  },

  'Pilot Group Testing': {
    description: 'Controlled testing with pilot user group',
    activities: [
      {
        name: 'Pilot User Selection',
        timePercent: 10,
        description: 'Identify representative users across use cases and departments'
      },
      {
        name: 'User Onboarding',
        timePercent: 15,
        description: 'Train pilot users, provide access, explain feedback process'
      },
      {
        name: 'Functional Testing',
        timePercent: 25,
        description: 'Validate all applications, peripherals, and workflows'
      },
      {
        name: 'Performance Testing',
        timePercent: 20,
        description: 'Load testing, latency measurement, user experience scoring'
      },
      {
        name: 'Issue Resolution',
        timePercent: 20,
        description: 'Address bugs, configuration issues, and user feedback'
      },
      {
        name: 'Sign-off & Documentation',
        timePercent: 10,
        description: 'Obtain stakeholder approval, document lessons learned'
      }
    ]
  },

  'User & Use Case Migration': {
    description: 'Production rollout to all users',
    activities: [
      {
        name: 'Migration Wave Planning',
        timePercent: 15,
        description: 'Define migration waves, schedule departments, communication plan'
      },
      {
        name: 'User Migration Execution',
        timePercent: 35,
        description: 'Migrate users in planned waves, profile migration, access cutover'
      },
      {
        name: 'Hypercare Support',
        timePercent: 25,
        description: 'Provide enhanced support during transition, rapid issue resolution'
      },
      {
        name: 'Legacy Decommissioning',
        timePercent: 15,
        description: 'Retire old VDI/desktop infrastructure, reclaim resources'
      },
      {
        name: 'Project Closure',
        timePercent: 10,
        description: 'Final documentation, handoff to operations, lessons learned'
      }
    ]
  }
};

/**
 * Get activities for a phase with calculated week durations
 * @param {string} phaseName - Name of the phase
 * @param {number} totalWeeks - Total weeks for the phase
 * @returns {Array} Activities with week allocations
 */
export function getPhaseActivitiesWithDuration(phaseName, totalWeeks) {
  const phaseData = PHASE_ACTIVITIES[phaseName];
  if (!phaseData) return [];

  return phaseData.activities.map(activity => ({
    ...activity,
    weeks: Math.round((activity.timePercent / 100) * totalWeeks * 10) / 10,
    days: Math.round((activity.timePercent / 100) * totalWeeks * 5) // Assuming 5-day work week
  }));
}

/**
 * Get phase description
 * @param {string} phaseName - Name of the phase
 * @returns {string} Phase description
 */
export function getPhaseDescription(phaseName) {
  return PHASE_ACTIVITIES[phaseName]?.description || '';
}

export default PHASE_ACTIVITIES;
