/**
 * Phase Overlap Calculator
 * 
 * Calculates realistic timeline by accounting for parallel phase execution.
 * In reality, phases don't run sequentially - teams work concurrently.
 * 
 * Example: While Azure environment is being built (Phase 2), 
 * Nerdio deployment planning can begin (Phase 3 overlap)
 */

/**
 * Calculate phase overlaps and adjusted timeline
 * @param {Array} phases - Array of phase objects with weeks
 * @param {Object} options - Optional configuration
 * @param {number} options.parallelWorkPercent - Percentage of parallel work (0-100), defaults to 100
 * @returns {Object} - Adjusted phases and time saved
 */
export function calculatePhaseOverlaps(phases, options = {}) {
  const { parallelWorkPercent = 100 } = options;
  const parallelMultiplier = parallelWorkPercent / 100;

  // Define overlap rules based on Nerdio implementation methodology
  const overlapRules = [
    {
      fromPhaseIndex: 0, // Prepare & Transform Applications
      toPhaseIndex: 1,   // Prepare Azure Environment
      overlapPercent: 0.50, // 50% overlap - can start Azure prep while app work continues
      description: 'Azure prep can begin while app transformation is underway'
    },
    {
      fromPhaseIndex: 1, // Prepare Azure Environment
      toPhaseIndex: 2,   // Deploy Nerdio
      overlapPercent: 0.25, // 25% overlap - Nerdio planning starts near end of Azure prep
      description: 'Nerdio deployment planning begins during Azure environment finalization'
    },
    {
      fromPhaseIndex: 2, // Deploy Nerdio
      toPhaseIndex: 3,   // Design, Build & Configure AVD
      overlapPercent: 0.50, // 50% overlap - AVD design starts while Nerdio deploys
      description: 'AVD configuration begins while Nerdio deployment completes'
    },
    {
      fromPhaseIndex: 3, // Design, Build & Configure AVD
      toPhaseIndex: 4,   // Pilot Group Testing
      overlapPercent: 0.50, // 50% overlap - Pilot users can test while final configs complete
      description: 'Pilot testing begins before all AVD configuration is complete'
    },
    {
      fromPhaseIndex: 4, // Pilot Group Testing
      toPhaseIndex: 5,   // User & Use Case Migration
      overlapPercent: 0.50, // 50% overlap - Migration planning/prep during pilot
      description: 'Migration planning and early users can begin during pilot phase'
    }
  ];

  // Clone phases to avoid mutation
  const adjustedPhases = phases.map((phase, index) => ({
    ...phase,
    originalWeeks: phase.weeks,
    phaseIndex: index,
    startWeek: 0, // Will calculate below
    endWeek: 0,   // Will calculate below
    overlapsWithPrevious: false,
    overlapWeeks: 0,
    overlapDescription: null
  }));

  let totalTimeSaved = 0;
  let cumulativeWeeks = 0;

  // Calculate timeline with overlaps
  adjustedPhases.forEach((phase, index) => {
    // Set start week
    phase.startWeek = cumulativeWeeks;

    // Check if this phase overlaps with previous
    const overlapRule = overlapRules.find(rule => rule.toPhaseIndex === index);
    
    if (overlapRule && index > 0) {
      const previousPhase = adjustedPhases[overlapRule.fromPhaseIndex];
      // Apply parallel work multiplier to scale the overlap
      const effectiveOverlapPercent = overlapRule.overlapPercent * parallelMultiplier;
      const overlapAmount = previousPhase.weeks * effectiveOverlapPercent;

      // Adjust start week to account for overlap
      phase.startWeek = previousPhase.startWeek + (previousPhase.weeks - overlapAmount);
      phase.overlapsWithPrevious = true;
      phase.overlapWeeks = overlapAmount;
      phase.overlapDescription = overlapRule.description;

      totalTimeSaved += overlapAmount;
    }

    // Set end week
    phase.endWeek = phase.startWeek + phase.weeks;
    
    // Update cumulative weeks for next phase
    cumulativeWeeks = phase.endWeek;
  });

  // Calculate final adjusted timeline
  const totalWeeksWithOverlap = cumulativeWeeks;
  const totalWeeksWithoutOverlap = phases.reduce((sum, p) => sum + p.weeks, 0);

  return {
    adjustedPhases,
    totalTimeSaved: Math.round(totalTimeSaved * 10) / 10, // Round to 1 decimal
    totalWeeksWithOverlap: Math.round(totalWeeksWithOverlap * 10) / 10,
    totalWeeksWithoutOverlap,
    efficiencyGain: Math.round((totalTimeSaved / totalWeeksWithoutOverlap) * 100),
    overlapRules: overlapRules.map(rule => ({
      ...rule,
      fromPhase: phases[rule.fromPhaseIndex].name,
      toPhase: phases[rule.toPhaseIndex].name
    }))
  };
}

/**
 * Get overlap visualization data for Gantt chart
 * @param {Array} adjustedPhases - Phases with overlap calculations
 * @returns {Array} - Visualization data
 */
export function getOverlapVisualization(adjustedPhases) {
  return adjustedPhases.map((phase, index) => ({
    id: index,
    name: phase.name,
    startWeek: phase.startWeek,
    endWeek: phase.endWeek,
    duration: phase.weeks,
    originalDuration: phase.originalWeeks,
    overlapsWithPrevious: phase.overlapsWithPrevious,
    overlapWeeks: phase.overlapWeeks,
    overlapDescription: phase.overlapDescription,
    startPercent: 0, // Will be calculated relative to total timeline
    widthPercent: 0  // Will be calculated relative to total timeline
  }));
}

/**
 * Calculate timeline comparison metrics
 * @param {number} weeksWithoutOverlap - Sequential timeline
 * @param {number} weeksWithOverlap - Parallel timeline
 * @returns {Object} - Comparison metrics
 */
export function getTimelineComparison(weeksWithoutOverlap, weeksWithOverlap) {
  const weeksSaved = weeksWithoutOverlap - weeksWithOverlap;
  const percentSaved = (weeksSaved / weeksWithoutOverlap) * 100;

  return {
    sequential: {
      weeks: weeksWithoutOverlap,
      label: 'Sequential (Waterfall)'
    },
    parallel: {
      weeks: weeksWithOverlap,
      label: 'Parallel (Agile)'
    },
    savings: {
      weeks: Math.round(weeksSaved * 10) / 10,
      percent: Math.round(percentSaved),
      label: `${Math.round(weeksSaved)} weeks faster`
    }
  };
}

export default {
  calculatePhaseOverlaps,
  getOverlapVisualization,
  getTimelineComparison
};