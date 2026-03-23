import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Cloud, AlertTriangle, CheckCircle, Info, Download, Save, RefreshCw, Server, Shield, Package, Settings, Activity, Layers, Sparkles, ChevronDown, ChevronRight, Clock, Zap, TrendingDown, Copy, Image, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { calculatePhaseOverlaps, getTimelineComparison } from '../utils/timeline/phaseOverlap';
// TestDataButton removed - using centralized TestDataPanel in App.jsx instead

import NTENTLegend from './ui/NTENTLegend';
import NTENTLegendCollapsible from './ui/NTENTLegendCollapsible';
import NTENTBadge from './ui/NTENTBadge';
import useCoachTriggers from '../hooks/useCoachTriggers';
import TooltipCoach from './ui/TooltipCoach';
import { PartnerSuggestionBanner } from './ui/PartnerStack';
import { SuccessStoryCarousel, CustomerLikeYouBanner, QuickWinIndicator } from './ui/SuccessStory';
import { caseStudies, getCaseStudyStats } from '../data/caseStudies';
import { PHASE_ACTIVITIES, getPhaseActivitiesWithDuration, getPhaseDescription } from '../constants/phaseActivities';
import PartnerTimelineAccelerator from './ui/PartnerTimelineAccelerator';
import StrategicRecommendations from './StrategicRecommendations';
import { exportTimelinePDF } from '../utils/export/timeline-pdf-generator';
// Icon lookup for breakdown items (icons can't survive JSON serialization in localStorage)
const BREAKDOWN_ICONS = {
  'User Scale': Users,
  'Use Cases': Activity,
  'On-Prem to Cloud Migration': Cloud,
  'Citrix/Omnissa Cloud': Cloud,
  'Citrix/Omnissa Hybrid': Cloud,
  'Citrix/Omnissa On-Prem': Server,
  'Cloud Platform': Cloud,
  'Landing Zone': Settings,
  'Operating Systems': Server,
  'Change Control': AlertTriangle,
  'Security Review': Shield,
  'Application Count': Package,
  'App Modernization': AlertTriangle,
  'Backend Connections': Server,
  'Peripheral Requirements': Settings,
  'Cloud Testing Status': CheckCircle,
  'Last Modernization': Calendar,
};

const NerdioTimelineCalculator = () => {
  const [formData, setFormData] = useState({
    goLiveDate: '',
    startDate: '',
    users: '1',
    useCases: '1',
    onPremToCloud: '1',
    citrixCloud: '1',
    citrixHybrid: '1',
    citrixOnPrem: '1',
    cloud: '1',
    landingZone: '1',
    os: '1',
    changeControl: '1',
    security: '1',
    apps: '1',
    modernization: '1',
    backend: '1',
    peripherals: '1',
    cloudTesting: '1',
    lastMod: '1',
    parallelWorkPercent: 100, // Percentage of parallel work execution (0-100)
    appTransformComplete: 0 // Percentage of app transformation already complete (0-100)
  });

  const [results, setResults] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline', 'technology', 'applications'
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [showPartnerHints, setShowPartnerHints] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState({}); // Track which phases are expanded
  const [acceleratedTimeline, setAcceleratedTimeline] = useState(null); // Partner-accelerated timeline
  const [isCopyingTimeline, setIsCopyingTimeline] = useState(false);
  const [currentScenarioId, setCurrentScenarioId] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const timelineRef = useRef(null);
  const coach = useCoachTriggers({ idleMs: 3500 });

  // Copy timeline to clipboard as image
  const copyTimelineToClipboard = async () => {
    if (!timelineRef.current) {
      toast.error('Timeline not available to copy');
      return;
    }

    setIsCopyingTimeline(true);
    try {
      // Dynamic import html2canvas
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(timelineRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true
      });

      // Try to copy to clipboard
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            toast.success('Timeline copied to clipboard! Paste into PowerPoint or other apps.');
          } catch (clipboardError) {
            // Fallback: download the image
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `AVD_Timeline_${new Date().toISOString().split('T')[0]}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            toast.success('Timeline downloaded as PNG (clipboard not available)');
          }
        }
        setIsCopyingTimeline(false);
      }, 'image/png');
    } catch (error) {
      console.error('Error copying timeline:', error);
      toast.error('Failed to copy timeline: ' + error.message);
      setIsCopyingTimeline(false);
    }
  };

  // Toggle phase expansion
  const togglePhaseExpansion = (phaseIndex) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseIndex]: !prev[phaseIndex]
    }));
  };

  // Tab configuration
  const tabs = [
    { id: 'timeline', label: 'Timeline & Scope', icon: Calendar, fields: 4 },
    { id: 'technology', label: 'Technology', icon: Server, fields: 9 },
    { id: 'applications', label: 'Applications', icon: Package, fields: 6 }
  ];

  useEffect(() => {
    const today = new Date();
    const goLive = new Date(today);
    goLive.setDate(goLive.getDate() + 90);

    setFormData(prev => ({
      ...prev,
      startDate: today.toISOString().split('T')[0],
      goLiveDate: goLive.toISOString().split('T')[0]
    }));

    // Load local scenarios with validation
    try {
      const saved = localStorage.getItem('nerdioScenarios');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out corrupted scenarios
        const validScenarios = Array.isArray(parsed)
          ? parsed.filter(s => s && s.id && s.formData && typeof s.formData === 'object')
          : [];
        setSavedScenarios(validScenarios);

        // If we filtered out any scenarios, update localStorage
        if (validScenarios.length !== parsed.length) {
          console.warn('Filtered out corrupted scenarios from localStorage');
          localStorage.setItem('nerdioScenarios', JSON.stringify(validScenarios));
        }
      }
    } catch (err) {
      console.error('Failed to load saved scenarios:', err);
      localStorage.removeItem('nerdioScenarios');
    }

  }, []);

  // Listen for test data injection from TestDataPanel
  useEffect(() => {
    const handleInjectData = (event) => {
      const data = event.detail;
      if (data) {
        setFormData(prev => ({
          ...prev,
          ...data
        }));
        // Auto-calculate after injection
        setTimeout(() => {
          document.querySelector('[data-calculate-btn]')?.click();
        }, 100);
      }
    };

    window.addEventListener('injectTimelineData', handleInjectData);
    return () => window.removeEventListener('injectTimelineData', handleInjectData);
  }, []);

  const tooltips = {
    users: {
      title: "User Scale Impact",
      description: "User scale impacts testing scope, migration waves, and infrastructure sizing",
      formula: "Score = Selection (1-3) × Weight",
      weights: { simple: 2, medium: 2, complex: 3 },
      tip: "Larger user bases require more migration waves and extended pilot testing"
    },
    useCases: {
      title: "Use Case Complexity",
      description: "Each use case requires different host pools, images, and configurations",
      formula: "Score = Selection × 4 (HIGHEST WEIGHT)",
      weights: { simple: 4, medium: 4, complex: 4 },
      tip: "Weight: 4 - This is the HIGHEST weighted factor. Each use case adds host pools, images, and configurations"
    },
    cloud: {
      title: "Cloud Platform Choice",
      description: "Azure is native platform for AVD. GCP/AWS requires additional migration effort",
      formula: "Score = 1 (Azure) or 3 (Other)",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "Azure is native for AVD - choosing GCP/AWS adds 30% timeline penalty"
    },
    changeControl: {
      title: "Change Control Process",
      description: "Change control process directly impacts deployment velocity across all phases",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "Strict CAB processes can add 4-6 weeks. Consider parallel track approvals"
    },
    apps: {
      title: "Application Count",
      description: "More applications mean more testing, packaging, and validation effort",
      formula: "Score = Selection (1-3) × Weight",
      weights: { simple: 2, medium: 2, complex: 3 },
      tip: "Each app requires testing. Consider core apps first for initial deployment"
    },
    modernization: {
      title: "⚠️ Application Modernization",
      description: "Application modernization has 10x WEIGHT when required - the single biggest timeline factor!",
      formula: "Score = Selection × 10 (when complex)",
      weights: { simple: 2, medium: 2, complex: 10 },
      tip: "THIS IS THE #1 TIMELINE DRIVER. Deferring modernization can save 9+ weeks"
    },
    onPremToCloud: {
      title: "On-Prem to Cloud Migration",
      description: "Net-new cloud migration adds infrastructure and migration complexity",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "Full migration requires network architecture, identity sync, and data migration"
    },
    citrix: {
      title: "Citrix/Omnissa Migration",
      description: "Citrix/Omnissa environments require migration planning and parallel testing",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "Existing VDI infrastructure requires parallel operation during transition"
    },
    landingZone: {
      title: "Azure Landing Zone",
      description: "Existing Azure landing zone reduces setup time significantly",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "Pre-built landing zone saves 2-3 weeks. Consider this as a quick win"
    },
    os: {
      title: "Operating System Requirements",
      description: "Legacy operating systems require upgrade/compatibility testing",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "Legacy OS may have app compatibility issues. Plan for testing cycles"
    },
    security: {
      title: "Security Review Process",
      description: "Security review processes gate deployments and add approval cycles",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "External audits add weeks. Engage security team early in the process"
    },
    backend: {
      title: "Backend System Connections",
      description: "Backend system connections affect network design and latency requirements",
      formula: "Score = 0 (none) to 3 (complex)",
      weights: { simple: 0, medium: 1, complex: 3 },
      tip: "External connections require VPN/ExpressRoute and may have compliance implications"
    },
    peripherals: {
      title: "Peripheral Requirements",
      description: "Peripheral device requirements need special drivers and testing",
      formula: "Score = 0 (standard) to 3 (complex)",
      weights: { simple: 0, medium: 2, complex: 3 },
      tip: "Specialized peripherals (scanners, medical devices) need driver compatibility testing"
    },
    cloudTesting: {
      title: "Prior Cloud Testing",
      description: "Prior cloud testing reduces unknowns and accelerates deployment",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "POC or pilot experience reduces risk and accelerates full deployment"
    },
    lastMod: {
      title: "Last Modernization Date",
      description: "Recent modernization means less technical debt and faster migration",
      formula: "Score = Selection × Weight",
      weights: { simple: 1, medium: 2, complex: 3 },
      tip: "Apps modernized in last 2 years typically migrate faster with fewer issues"
    }
  };

  // Complete scoring weights matrix - MATCHED TO RICHARD'S EXCEL
  // Formula: D value = selection (1,2,3) × weight
  // Values extracted from Go-Live Questions (Lookup) sheet
  const weights = {
    users: [2, 2, 3],           // D6:  Simple=2, Medium=4, Complex=9
    useCases: [4, 4, 4],        // D7:  Simple=4, Medium=8, Complex=12
    onPremToCloud: [1, 2, 3],   // D10: Scope multiplier (special handling)
    citrixCloud: [1, 2, 3],     // D11: Scope multiplier (special handling)
    citrixHybrid: [1, 2, 3],    // D12: Scope multiplier (special handling)
    citrixOnPrem: [1, 2, 3],    // D13: Scope multiplier (special handling)
    cloud: [2, 2, 3],           // D14: Simple=2, Medium=4, Complex=9 (FIXED: was [1,2,3])
    landingZone: [2, 2, 3],     // D15: Simple=2, Medium=4, Complex=9 (FIXED: was [1,2,3])
    os: [1, 2, 3],              // D16: Simple=1, Medium=4, Complex=9
    changeControl: [1, 2, 3],   // D19: Simple=1, Medium=4, Complex=9
    security: [1, 2, 3],        // D22: Simple=1, Medium=4, Complex=9
    apps: [2, 2, 3],            // D25: Simple=2, Medium=4, Complex=9
    modernization: [2, 2, 10],  // D26: Simple=2, Medium=4, Complex=30 (THE BIG ONE)
    backend: [0, 1, 3],         // D27: Simple=0, Medium=2, Complex=9
    peripherals: [0, 2, 3],     // D28: Simple=0, Medium=4, Complex=9
    cloudTesting: [1, 2, 3],    // D29: Simple=1, Medium=4, Complex=9
    lastMod: [1, 2, 3]          // D30: Simple=1, Medium=4, Complex=9
  };

  const calculateTimeline = () => {
    // Reset accelerated timeline when recalculating
    setAcceleratedTimeline(null);

    const goLiveDate = new Date(formData.goLiveDate);
    const startDate = new Date(formData.startDate);
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksAvailable = Math.round((goLiveDate - startDate) / msPerWeek);

    let totalScore = 0;
    const breakdown = [];

    const factors = [
      { id: 'users', name: 'User Scale', icon: Users, category: 'Project Scope' },
      { id: 'useCases', name: 'Use Cases', icon: Activity, category: 'Project Scope' },
      { id: 'onPremToCloud', name: 'On-Prem to Cloud Migration', icon: Cloud, category: 'Tech Stack' },
      { id: 'citrixCloud', name: 'Citrix/Omnissa Cloud', icon: Cloud, category: 'Tech Stack' },
      { id: 'citrixHybrid', name: 'Citrix/Omnissa Hybrid', icon: Cloud, category: 'Tech Stack' },
      { id: 'citrixOnPrem', name: 'Citrix/Omnissa On-Prem', icon: Server, category: 'Tech Stack' },
      { id: 'cloud', name: 'Cloud Platform', icon: Cloud, category: 'Tech Stack' },
      { id: 'landingZone', name: 'Landing Zone', icon: Settings, category: 'Tech Stack' },
      { id: 'os', name: 'Operating Systems', icon: Server, category: 'Tech Stack' },
      { id: 'changeControl', name: 'Change Control', icon: AlertTriangle, category: 'Governance' },
      { id: 'security', name: 'Security Review', icon: Shield, category: 'Security' },
      { id: 'apps', name: 'Application Count', icon: Package, category: 'Applications' },
      { id: 'modernization', name: 'App Modernization', icon: AlertTriangle, category: 'Applications' },
      { id: 'backend', name: 'Backend Connections', icon: Server, category: 'Applications' },
      { id: 'peripherals', name: 'Peripheral Requirements', icon: Settings, category: 'Applications' },
      { id: 'cloudTesting', name: 'Cloud Testing Status', icon: CheckCircle, category: 'Applications' },
      { id: 'lastMod', name: 'Last Modernization', icon: Calendar, category: 'Applications' }
    ];

    factors.forEach(factor => {
      const value = parseInt(formData[factor.id]);
      const weight = weights[factor.id][value - 1];
      const score = value * weight;
      totalScore += score;
      breakdown.push({ 
        name: factor.name, 
        value, 
        weight, 
        score,
        icon: factor.icon,
        category: factor.category
      });
    });

    // NOTE: weeksRequired is now calculated AFTER phase calculations (see below)
    // using the sum of Richard's phase formulas instead of the old score-based formula

    // Get individual factor scores for phase calculations (D values in Richard's Excel)
    // D value = selection (1,2,3) × weight from weights matrix
    const scores = {};
    breakdown.forEach(item => {
      const factorId = factors.find(f => f.name === item.name)?.id;
      if (factorId) scores[factorId] = item.score;
    });

    // Map to Richard's Excel D cell names for clarity
    const D6 = scores.users || 0;         // Users
    const D7 = scores.useCases || 0;      // Use Cases
    const D14 = scores.cloud || 0;        // Cloud Platform
    const D15 = scores.landingZone || 0;  // Landing Zone
    const D16 = scores.os || 0;           // Operating Systems
    const D19 = scores.changeControl || 0; // Change Control
    const D22 = scores.security || 0;     // Security Review
    const D25 = scores.apps || 0;         // App Count
    const D26 = scores.modernization || 0; // App Modernization
    const D27 = scores.backend || 0;      // Backend Connections
    const D28 = scores.peripherals || 0;  // Peripherals
    const D29 = scores.cloudTesting || 0; // Cloud Testing
    const D30 = scores.lastMod || 0;      // Last Modernization

    // D10-D13: Scope multipliers (Excel: IF(Yes, D6*D25, 0))
    // These activate when migration path is selected (value > 1 means involvement)
    const onPremVal = parseInt(formData.onPremToCloud) || 1;
    const citrixCloudVal = parseInt(formData.citrixCloud) || 1;
    const citrixHybridVal = parseInt(formData.citrixHybrid) || 1;
    const citrixOnPremVal = parseInt(formData.citrixOnPrem) || 1;

    // Scope multiplier = D6 × D25 when path is active (selection > 1)
    const scopeMultiplier = D6 * D25;
    const D10 = onPremVal > 1 ? scopeMultiplier : 0;      // On-prem to cloud migration
    const D11 = citrixCloudVal > 1 ? scopeMultiplier : 0; // Citrix/Omnissa Cloud
    const D12 = citrixHybridVal > 1 ? scopeMultiplier : 0; // Citrix/Omnissa Hybrid
    const D13 = citrixOnPremVal > 1 ? scopeMultiplier : 0; // Citrix/Omnissa On-Prem

    // ========================================
    // RICHARD'S EXACT EXCEL FORMULAS
    // ========================================
    // Source: Go-Live Timeline v1.0.xlsm, Go-Live Questions (Prospect) sheet
    // All phase calculations use sum/5 division as per Excel
    // Note: appTransformComplete is a progress indicator, NOT a duration modifier

    // Phase 1 (F53): Prepare & Transform Applications
    // Excel: =IF(D26=2,((D30+D27+D26+D25+D7+D29)/5),((D30+D27+D26+D10+D11+D12+D25+D13+D7)/5))
    // D26=2 means "Simple" app modernization (baseXWeight=2)
    let phase1Raw;
    if (D26 === 2) {
      // Simple path: no scope multipliers
      phase1Raw = (D30 + D27 + D26 + D25 + D7 + D29) / 5;
    } else {
      // Medium/Complex path: include scope multipliers D10-D13
      phase1Raw = (D30 + D27 + D26 + D10 + D11 + D12 + D25 + D13 + D7) / 5;
    }
    const phase1Weeks = Math.max(1, Math.round(phase1Raw));

    // Phase 2 (F60): Prepare Azure Environment
    // Excel: =(D19+D15+D14)/5
    const phase2Weeks = Math.max(1, Math.round((D19 + D15 + D14) / 5));

    // Phase 3 (F69): Deploy Nerdio
    // Excel: =IF((D19+D22)/5<1,1,(D19+D22)/5)
    const phase3Raw = (D19 + D22) / 5;
    const phase3Weeks = Math.max(1, Math.round(phase3Raw));

    // Phase 4 (F76): Design, Build & Configure AVD
    // Excel: =(D28+D27+D26+D25+D7+D16)/5
    const phase4Weeks = Math.max(1, Math.round((D28 + D27 + D26 + D25 + D7 + D16) / 5));

    // Phase 5 (F101): Pilot User Group Testing
    // Excel: =(D29+D28+D27+D25+D19+D7)/5
    const phase5Weeks = Math.max(1, Math.round((D29 + D28 + D27 + D25 + D19 + D7) / 5));

    // Phase 6 (F115): User & Use Case Migration
    // Excel: =(D19+D6+D7+D25)/5
    const phase6Weeks = Math.max(1, Math.round((D19 + D6 + D7 + D25) / 5));

// Define phases (sequential/waterfall approach) - using Richard's exact formulas!
const sequentialPhases = [
  { name: 'Prepare & Transform Applications', weeks: phase1Weeks },
  { name: 'Prepare Azure Environment', weeks: phase2Weeks },
  { name: 'Deploy Nerdio', weeks: phase3Weeks },
  { name: 'Design, Build & Configure AVD', weeks: phase4Weeks },
  { name: 'Pilot Group Testing', weeks: phase5Weeks },
  { name: 'User & Use Case Migration', weeks: phase6Weeks }
];

// ========================================
// CALCULATE WEEKS REQUIRED FROM PHASES
// ========================================
// Sequential weeks = sum of all phases (no overlap)
const weeksRequired = phase1Weeks + phase2Weeks + phase3Weeks + phase4Weeks + phase5Weeks + phase6Weeks;
const delta = weeksAvailable - weeksRequired;

// Calculate phase overlaps (parallel/agile approach)
const overlapResult = calculatePhaseOverlaps(sequentialPhases, {
  parallelWorkPercent: formData.parallelWorkPercent
});

// Adjusted weeks required with overlaps
const weeksRequiredWithOverlap = overlapResult.totalWeeksWithOverlap;
const deltaWithOverlap = weeksAvailable - weeksRequiredWithOverlap;

// Timeline comparison (sequential vs parallel)
const timelineComparison = getTimelineComparison(
  weeksRequired,  // Now this is the actual sum of phases!
  weeksRequiredWithOverlap
);

setResults({
  weeksAvailable,
  weeksRequired: weeksRequiredWithOverlap, // Use overlap-adjusted weeks
  weeksRequiredSequential: weeksRequired,   // Keep original for comparison
  delta: deltaWithOverlap,                  // Use overlap-adjusted delta
  deltaSequential: delta,                   // Keep original delta
  totalScore,
  breakdown: breakdown.sort((a, b) => b.score - a.score),
  recommendations: generateRecommendations(deltaWithOverlap, breakdown, formData, totalScore),
  phases: overlapResult.adjustedPhases,     // Use overlap-adjusted phases
  phasesSequential: sequentialPhases,       // Keep original for comparison
  overlapAnalysis: overlapResult,           // Full overlap data
  timelineComparison                        // Comparison metrics
});
  };

  const generateRecommendations = (delta, breakdown, data, totalScore) => {
    const recs = [];

    if (delta < 0) {
      recs.push({
        type: 'critical',
        text: `Estimated timeline appears to be ~${Math.abs(delta).toFixed(1)} weeks short. Consider reviewing scope or extending the target date.`,
        priority: 1
      });

      if (data.modernization === '3') {
        recs.push({
          type: 'action',
          text: `Consider deferring app modernization to a later phase (could potentially save ~9+ weeks)`,
          impact: 'high',
          priority: 2
        });
      }

      if (data.changeControl === '3') {
        recs.push({
          type: 'action',
          text: 'Explore options for more frequent change approvals (could potentially save ~4-6 weeks)',
          impact: 'high',
          priority: 3
        });
      }

      if (data.apps === '3') {
        recs.push({
          type: 'action',
          text: 'Consider prioritizing core applications for initial deployment (could potentially save ~3-5 weeks)',
          impact: 'medium',
          priority: 4
        });
      }

      recs.push({
        type: 'action',
        text: `Consider extending target go-live date by ~${Math.abs(delta + 4).toFixed(1)} weeks to include buffer`,
        impact: 'high',
        priority: 5
      });

      if (data.landingZone === '3') {
        recs.push({
          type: 'action',
          text: 'Pre-building Azure landing zone before project kickoff may save ~2-3 weeks',
          impact: 'medium',
          priority: 6
        });
      }

    } else if (delta < 4) {
      recs.push({
        type: 'warning',
        text: `Timeline appears tight with approximately ${delta.toFixed(1)} weeks estimated buffer. Some risk of delays.`,
        priority: 1
      });
      recs.push({
        type: 'action',
        text: 'Consider assigning a dedicated project delivery team to help maintain pace',
        impact: 'medium',
        priority: 2
      });
    } else {
      recs.push({
        type: 'success',
        text: `Timeline appears feasible with an estimated ${delta.toFixed(1)} weeks of buffer.`,
        priority: 1
      });
      recs.push({
        type: 'action',
        text: 'Recommend maintaining buffer for unexpected complexities that may arise during implementation',
        impact: 'low',
        priority: 2
      });
    }

    // Complexity-based recommendations
    if (totalScore > 80) {
      recs.push({
        type: 'warning',
        text: `Complexity score is elevated (${totalScore} points). A phased approach may help manage risk.`,
        priority: 7
      });
    }

    return recs.sort((a, b) => a.priority - b.priority);
  };

  // Open save dialog
  const openSaveDialog = () => {
    setScenarioName('');
    setShowSaveDialog(true);
  };

  const saveScenario = (customName = null) => {
    const name = customName || scenarioName || `Scenario ${savedScenarios.length + 1}`;
    const scenario = {
      id: currentScenarioId || String(Date.now()),
      name: name.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
      formData: { ...formData },
      results: { ...results }
    };

    setShowSaveDialog(false);
    setScenarioName('');

    // Save to localStorage
    const updated = currentScenarioId
      ? savedScenarios.map(s => s.id === currentScenarioId ? scenario : s)
      : [...savedScenarios, scenario];
    setSavedScenarios(updated);
    setCurrentScenarioId(scenario.id);
    localStorage.setItem('nerdioScenarios', JSON.stringify(updated));
    toast.success('Scenario saved');
  };

  // Default form data structure for validation
  const getDefaultFormData = () => ({
    goLiveDate: '',
    startDate: '',
    users: '1',
    useCases: '1',
    onPremToCloud: '1',
    citrixCloud: '1',
    citrixHybrid: '1',
    citrixOnPrem: '1',
    cloud: '1',
    landingZone: '1',
    os: '1',
    changeControl: '1',
    security: '1',
    apps: '1',
    modernization: '1',
    backend: '1',
    peripherals: '1',
    cloudTesting: '1',
    lastMod: '1',
    parallelWorkPercent: 100
  });

  // Validate results object has required properties for rendering
  const validateResults = (results) => {
    if (!results || typeof results !== 'object') return null;

    // Check for required properties
    const requiredProps = ['weeksAvailable', 'weeksRequired', 'delta', 'totalScore', 'breakdown', 'phases'];
    const hasAllProps = requiredProps.every(prop => results[prop] !== undefined);

    if (!hasAllProps) {
      console.warn('Results missing required properties:', results);
      return null;
    }

    // Ensure arrays are actually arrays
    if (!Array.isArray(results.breakdown) || !Array.isArray(results.phases)) {
      console.warn('Results has invalid array properties:', results);
      return null;
    }

    // Ensure optional nested objects have safe defaults
    if (!results.overlapAnalysis || typeof results.overlapAnalysis !== 'object') {
      results.overlapAnalysis = { totalTimeSaved: 0, adjustedPhases: results.phases };
    }
    if (!Array.isArray(results.recommendations)) {
      results.recommendations = [];
    }

    return results;
  };

  const loadScenario = (scenario) => {
    try {
      // Validate scenario object
      if (!scenario || typeof scenario !== 'object') {
        console.error('Invalid scenario object:', scenario);
        toast.error('Invalid scenario data');
        return;
      }

      // Validate local scenario data
      if (!scenario.formData || typeof scenario.formData !== 'object') {
        console.error('Scenario missing formData:', scenario);
        toast.error('Scenario data is incomplete or corrupted');
        return;
      }

      // Merge with defaults to ensure all required fields exist
      setFormData({ ...getDefaultFormData(), ...scenario.formData });
      const validatedResults = validateResults(scenario.results);
      setResults(validatedResults);
      setAcceleratedTimeline(null);
      setExpandedPhases({});
      setCurrentScenarioId(scenario.id);
      if (validatedResults) {
        toast.success('Scenario loaded');
      } else {
        toast.success('Scenario loaded (click "Estimate Timeline" to recalculate)');
      }
    } catch (err) {
      console.error('Error loading scenario:', err);
      toast.error('Failed to load scenario');
    }
  };

  const clearForm = () => {
    setResults(null);
    setAcceleratedTimeline(null);
    setExpandedPhases({});
    setCurrentScenarioId(null);
    const today = new Date();
    const goLive = new Date(today);
    goLive.setDate(goLive.getDate() + 90);

    setFormData({
      goLiveDate: goLive.toISOString().split('T')[0],
      startDate: today.toISOString().split('T')[0],
      users: '1',
      useCases: '1',
      onPremToCloud: '1',
      citrixCloud: '1',
      citrixHybrid: '1',
      citrixOnPrem: '1',
      cloud: '1',
      landingZone: '1',
      os: '1',
      changeControl: '1',
      security: '1',
      apps: '1',
      modernization: '1',
      backend: '1',
      peripherals: '1',
      cloudTesting: '1',
      lastMod: '1',
      parallelWorkPercent: 100,
      appTransformComplete: 0
    });
  };

  const Tooltip = ({ content, id }) => {
    const tooltipData = typeof content === 'object' ? content : { description: content };
    const isModernization = id === 'modernization';

    return (
      <div className="relative inline-block ml-2">
        <Info
          size={16}
          className={`cursor-help ${isModernization ? 'text-amber-500' : 'text-blue-500'}`}
          onMouseEnter={() => setShowTooltip(id)}
          onMouseLeave={() => setShowTooltip(null)}
        />
        {showTooltip === id && (
          <div className={`absolute left-0 top-6 w-80 p-4 text-sm rounded-lg shadow-xl z-50 ${
            isModernization ? 'bg-amber-900 text-amber-50' : 'bg-gray-900 text-white'
          }`}>
            {/* Title */}
            {tooltipData.title && (
              <div className={`font-bold text-base mb-2 ${isModernization ? 'text-amber-200' : 'text-blue-300'}`}>
                {tooltipData.title}
              </div>
            )}

            {/* Description */}
            <div className="mb-2">
              {tooltipData.description || content}
            </div>

            {/* Formula */}
            {tooltipData.formula && (
              <div className={`rounded p-2 mb-2 font-mono text-xs ${
                isModernization ? 'bg-amber-800' : 'bg-gray-800'
              }`}>
                <span className="text-gray-400">Formula: </span>
                {tooltipData.formula}
              </div>
            )}

            {/* Weights */}
            {tooltipData.weights && (
              <div className="flex gap-2 mb-2 text-xs">
                <span className="px-2 py-1 bg-green-600/30 rounded">
                  Simple: {tooltipData.weights.simple}
                </span>
                <span className="px-2 py-1 bg-yellow-600/30 rounded">
                  Medium: {tooltipData.weights.medium}
                </span>
                <span className={`px-2 py-1 rounded ${
                  tooltipData.weights.complex >= 10 ? 'bg-red-600/50 font-bold' : 'bg-red-600/30'
                }`}>
                  Complex: {tooltipData.weights.complex}
                </span>
              </div>
            )}

            {/* Tip */}
            {tooltipData.tip && (
              <div className={`text-xs italic border-t pt-2 mt-2 ${
                isModernization ? 'border-amber-700 text-amber-200' : 'border-gray-700 text-gray-300'
              }`}>
                {tooltipData.tip}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getValidityColor = (delta) => {
    if (delta >= 0) return 'bg-green-100 border-green-500 text-green-900';
    if (delta >= -4) return 'bg-yellow-100 border-yellow-500 text-yellow-900';
    return 'bg-red-100 border-red-500 text-red-900';
  };

  const getValidityIcon = (delta) => {
    if (delta >= 0) return <CheckCircle className="inline mr-2" />;
    return <AlertTriangle className="inline mr-2" />;
  };

  const renderGanttTimeline = () => {
  if (!results) return null;

  const { weeksAvailable, weeksRequired, phases, overlapAnalysis } = results;

  // Calculate percentages for visualization
  const maxWeeks = Math.max(weeksAvailable, weeksRequired);
  const phasesWithPercent = phases.map(phase => ({
    ...phase,
    startPercent: (phase.startWeek / maxWeeks) * 100,
    widthPercent: (phase.weeks / maxWeeks) * 100
  }));

  // Phase colors
  const phaseColors = [
    'bg-nerdio-primary-500',
    'bg-indigo-500',
    'bg-nerdio-secondary-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-orange-500'
  ];

  // Activity bar colors (lighter variants)
  const activityColors = [
    'bg-nerdio-primary-300',
    'bg-indigo-300',
    'bg-nerdio-secondary-300',
    'bg-pink-300',
    'bg-rose-300',
    'bg-orange-300'
  ];

  return (
    <div ref={timelineRef} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-nerdio-dark mb-2">
            Estimated Project Timeline (Parallel Execution)
          </h3>
          <button
            onClick={copyTimelineToClipboard}
            disabled={isCopyingTimeline}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              isCopyingTimeline
                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-wait'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-nerdio-primary-400'
            }`}
            title="Copy timeline to clipboard for PowerPoint"
          >
            {isCopyingTimeline ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Copy size={16} />
            )}
            {isCopyingTimeline ? 'Copying...' : 'Copy to Clipboard'}
          </button>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>~{weeksRequired} weeks estimated duration</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              results.delta >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            <span>{results.delta >= 0 ? 'On track' : `~${Math.abs(results.delta).toFixed(1)} weeks over`}</span>
          </div>
          {overlapAnalysis && overlapAnalysis.totalTimeSaved > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-semibold">⚡ ~{overlapAnalysis.totalTimeSaved}w saved</span>
            <span className="text-xs text-gray-500">(vs sequential)</span>
          </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">
          * Click any phase to expand and view detailed activity breakdown. All durations are estimates based on typical AVD migrations.
        </p>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 gap-4 mb-4 px-6 text-sm font-semibold text-gray-500">
        <div className="col-span-3">Phase</div>
        <div className="col-span-6">Timeline</div>
        <div className="col-span-2 text-center">Est. Duration</div>
        <div className="col-span-1 text-center">Status</div>
      </div>

      {/* Phase Rows */}
      <div className="space-y-2">
        {phasesWithPercent.map((phase, idx) => {
          const isOverflow = phase.endWeek > weeksAvailable;
          const isExpanded = expandedPhases[idx];
          const phaseActivities = getPhaseActivitiesWithDuration(phase.name, phase.weeks);
          const phaseDescription = getPhaseDescription(phase.name);

          return (
            <div key={idx} className="rounded-lg overflow-hidden">
              {/* Main Phase Row - Clickable */}
              <div
                className={`grid grid-cols-12 gap-4 items-center p-4 cursor-pointer transition-colors ${
                  isExpanded ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => togglePhaseExpansion(idx)}
              >
                {/* Phase Name & Duration */}
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-semibold text-nerdio-dark text-sm">{phase.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        ~{phase.weeks} weeks est.
                        {phase.overlapsWithPrevious && (
                          <span className="ml-2 text-green-600 font-semibold">
                            ⚡ ~{phase.overlapWeeks.toFixed(1)}w overlap
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Bar */}
                <div className="col-span-6 relative h-8 bg-gray-200 rounded-full overflow-visible">
                  {/* Timeline scale markers */}
                  <div className="absolute inset-0 flex items-center">
                    {[0, 25, 50, 75, 100].map(mark => (
                      <div
                        key={mark}
                        className="absolute h-full w-px bg-gray-300"
                        style={{ left: `${mark}%` }}
                      ></div>
                    ))}
                  </div>

                  {/* Phase bar */}
                  <div
                    className={`absolute h-full ${isOverflow ? 'bg-red-500' : phaseColors[idx]} rounded-full transition-all ${
                      phase.overlapsWithPrevious ? 'opacity-90' : ''
                    }`}
                    style={{
                      left: `${phase.startPercent}%`,
                      width: `${phase.widthPercent}%`
                    }}
                    title={phase.overlapDescription || phase.name}
                  >
                    {/* Overlap indicator */}
                    {phase.overlapsWithPrevious && (
                      <div className="absolute -left-1 top-0 h-full w-2 bg-green-400 rounded-l-full">
                        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
                          <span className="text-xs text-green-600">⚡</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="col-span-2 text-center">
                  <span className="text-lg font-semibold text-nerdio-dark">
                    W{Math.round(phase.startWeek)}-{Math.round(phase.endWeek)}
                  </span>
                </div>

                {/* Status Icon */}
                <div className="col-span-1 flex justify-center">
                  {isOverflow ? (
                    <AlertTriangle className="text-red-500" size={20} />
                  ) : phase.overlapsWithPrevious ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Info className="text-gray-400" size={20} />
                  )}
                </div>
              </div>

              {/* Expanded Activity Breakdown */}
              {isExpanded && phaseActivities.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                  {/* Phase Description */}
                  <div className="mb-4 pb-3 border-b border-gray-200">
                    <p className="text-sm text-gray-600 italic">{phaseDescription}</p>
                  </div>

                  {/* Activity Table Header */}
                  <div className="grid grid-cols-12 gap-3 mb-3 text-xs font-semibold text-gray-500 uppercase">
                    <div className="col-span-5">Activity</div>
                    <div className="col-span-4">Time Allocation</div>
                    <div className="col-span-2 text-center">Est. Duration</div>
                    <div className="col-span-1 text-center">%</div>
                  </div>

                  {/* Activity Rows */}
                  <div className="space-y-2">
                    {phaseActivities.map((activity, actIdx) => (
                      <div
                        key={actIdx}
                        className="grid grid-cols-12 gap-3 items-center py-2 hover:bg-white rounded transition-colors group"
                      >
                        {/* Activity Name */}
                        <div className="col-span-5">
                          <div className="flex items-start gap-2">
                            <Clock size={14} className={`mt-0.5 flex-shrink-0 ${
                              actIdx === 0 ? 'text-nerdio-primary-500' : 'text-gray-400'
                            }`} />
                            <div>
                              <div className="text-sm font-medium text-gray-800">{activity.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5 hidden group-hover:block">
                                {activity.description}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Time Allocation Bar */}
                        <div className="col-span-4">
                          <div className="relative h-5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute h-full ${activityColors[idx]} rounded-full transition-all`}
                              style={{ width: `${activity.timePercent}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="col-span-2 text-center">
                          <span className="text-sm font-medium text-gray-700">
                            {activity.weeks > 0 ? `~${activity.weeks}w` : `~${activity.days}d`}
                          </span>
                        </div>

                        {/* Percentage */}
                        <div className="col-span-1 text-center">
                          <span className="text-xs font-semibold text-gray-500">
                            {activity.timePercent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Activity Summary */}
                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                    <span>{phaseActivities.length} activities in this phase</span>
                    <span className="italic">* Time allocations are estimates and may vary based on project complexity</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overlap Details */}
      {overlapAnalysis && overlapAnalysis.totalTimeSaved > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <CheckCircle size={16} />
            Estimated Phase Overlap Benefits
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            {overlapAnalysis.adjustedPhases
              .filter(p => p.overlapsWithPrevious)
              .map((phase, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">⚡</span>
                  <span>{phase.overlapDescription}</span>
                </div>
              ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 italic">
            * Actual overlap potential depends on team capacity, dependencies, and project constraints
          </p>
        </div>
      )}

      {/* Timeline scale */}
      <div className="mt-6 px-6">
        <div className="relative h-8 flex items-center justify-between text-xs text-gray-500">
          <span>Start</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>Est. Go-Live (~Week {Math.round(weeksRequired)})</span>
        </div>
      </div>

      {/* With vs Without Nerdio Comparison */}
      <div className="mt-6 p-4 bg-gradient-to-r from-nerdio-primary-50 to-nerdio-secondary-50 border border-nerdio-primary-200 rounded-lg">
        <h4 className="font-semibold text-nerdio-dark mb-3 flex items-center gap-2">
          <Zap size={18} className="text-nerdio-primary-600" />
          Estimated Timeline: With Nerdio vs Native Azure
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* With Nerdio */}
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-green-600" />
              <span className="font-semibold text-green-800">With Nerdio Manager</span>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">~{weeksRequired} weeks</div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>✓ Automated image management</li>
              <li>✓ Built-in auto-scaling (35% savings)</li>
              <li>✓ Unified management console</li>
              <li>✓ Pre-built AVD templates</li>
              <li>✓ Monitoring & alerting included</li>
            </ul>
          </div>
          {/* Without Nerdio */}
          <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-orange-600" />
              <span className="font-semibold text-orange-800">Native Azure Only</span>
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-2">~{Math.round(weeksRequired * 1.4)} weeks</div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Manual image updates required</li>
              <li>• Custom auto-scaling scripts needed</li>
              <li>• Multiple Azure portal consoles</li>
              <li>• Build templates from scratch</li>
              <li>• Configure monitoring separately</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-nerdio-primary-700 mt-3 text-center">
          * Nerdio typically reduces deployment complexity by 30-40% through automation and pre-built configurations
        </p>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-nerdio-primary-50 via-white to-nerdio-primary-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-nerdio-dark flex items-center gap-3">
                <Calendar className="text-nerdio-primary-500" size={32} />
                Nerdio Go-Live Timeline Calculator
              </h1>
              <p className="text-gray-600 mt-2">
                Estimate your AVD migration timeline based on project complexity factors. Results are estimates to help guide planning discussions.
              </p>
            </div>
            {/* Feature Toggles */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSocialProof(!showSocialProof)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                  showSocialProof
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-gray-50 border-gray-300 text-gray-600'
                }`}
              >
                <Sparkles size={14} />
                <span className="font-medium">
                  {showSocialProof ? 'Social Proof On' : 'Social Proof Off'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowPartnerHints(!showPartnerHints)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                  showPartnerHints
                    ? 'bg-nerdio-secondary-50 border-nerdio-secondary-300 text-nerdio-secondary-700'
                    : 'bg-gray-50 border-gray-300 text-gray-600'
                }`}
              >
                <Layers size={14} />
                <span className="font-medium">
                  {showPartnerHints ? 'Partner Stack On' : 'Partner Stack Off'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-2">
              <div className="flex gap-1">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-nerdio-primary-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <TabIcon size={18} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-opacity-20 bg-white">
                        {tab.fields}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* NTENT Discovery Guide */}
            <NTENTLegendCollapsible />

            {/* TAB 1: Timeline & Scope */}
            {activeTab === 'timeline' && (
              <>
                {/* Dates Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                    <Calendar className="text-nerdio-primary-500" />
                    Timeline Constraints
                  </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Go-Live Target Date (Compelling Event)
                    <NTENTBadge dimension="time" tooltip="What date is immovable? What happens if you miss it?" />
                  </label>
                  <input
                    type="date"
                    value={formData.goLiveDate}
                    onChange={(e) => setFormData({...formData, goLiveDate: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Start Date
                    <NTENTBadge dimension="next" tooltip="When can you realistically start?" />
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Parallel Work Percentage */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parallel Work Capability
                  <NTENTBadge dimension="risk" tooltip="What % of work can run in parallel? Higher = faster timeline but requires more resources" />
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={formData.parallelWorkPercent}
                    onChange={(e) => setFormData({...formData, parallelWorkPercent: parseInt(e.target.value)})}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nerdio-primary-500"
                  />
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <span className="text-lg font-bold text-nerdio-dark">{formData.parallelWorkPercent}%</span>
                    <span className="text-xs text-gray-500">parallel</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sequential (Waterfall)</span>
                  <span>Fully Parallel (Agile)</span>
                </div>
                <p className="text-xs text-gray-600 mt-2 bg-blue-50 p-2 rounded">
                  💡 Tip: 100% parallel assumes dedicated teams for each phase. Lower this if team resources are shared.
                </p>
              </div>
            </div>

            {/* Project Scope */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                <Users className="text-nerdio-primary-500" />
                Project Scope
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Users
                    <NTENTBadge dimension="need" tooltip="How many users need AVD? Scale impacts timeline" />
                    <Tooltip id="users" content={tooltips.users} />
                  </label>
                  <select
                    value={formData.users}
                    onChange={(e) => setFormData({...formData, users: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Less than 1,000</option>
                    <option value="2">1,000 - 5,000</option>
                    <option value="3">More than 5,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Use Cases
                    <NTENTBadge dimension="need" tooltip="Each use case adds complexity (Weight: 4 - HIGHEST)" />
                    <Tooltip id="useCases" content={tooltips.useCases} />
                  </label>
                  <select
                    value={formData.useCases}
                    onChange={(e) => setFormData({...formData, useCases: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">3-5 use cases</option>
                    <option value="2">5-10 use cases</option>
                    <option value="3">10+ use cases</option>
                  </select>
                </div>
              </div>
            </div>
              </>
            )}

            {/* TAB 2: Technology */}
            {activeTab === 'technology' && (
              <>
                {/* Current Technology Stack */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                    <Server className="text-nerdio-primary-500" />
                    Current Technology Stack
                  </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    On-Prem to Cloud Migration
                    <NTENTBadge dimension="risk" tooltip="Full migration adds infrastructure complexity" />
                    <Tooltip id="onPremToCloud" content={tooltips.onPremToCloud} />
                  </label>
                  <select
                    value={formData.onPremToCloud}
                    onChange={(e) => setFormData({...formData, onPremToCloud: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">No</option>
                    <option value="2">Partial</option>
                    <option value="3">Yes - Full Migration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Citrix/Omnissa Cloud
                    <NTENTBadge dimension="risk" tooltip="Migration from existing VDI platform" />
                    <Tooltip id="citrix" content={tooltips.citrix} />
                  </label>
                  <select
                    value={formData.citrixCloud}
                    onChange={(e) => setFormData({...formData, citrixCloud: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">No</option>
                    <option value="2">Partial</option>
                    <option value="3">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Citrix/Omnissa Hybrid
                    <NTENTBadge dimension="risk" tooltip="Hybrid complexity adds testing time" />
                    <Tooltip id="citrixHybrid" content={{
                      title: "Hybrid VDI Environment",
                      description: "Hybrid Citrix/Omnissa setups add complexity with split management",
                      formula: "Score = Selection × Weight",
                      weights: { simple: 1, medium: 2, complex: 3 },
                      tip: "Hybrid requires parallel operation testing and user experience validation"
                    }} />
                  </label>
                  <select
                    value={formData.citrixHybrid}
                    onChange={(e) => setFormData({...formData, citrixHybrid: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">No</option>
                    <option value="2">Partial</option>
                    <option value="3">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Citrix/Omnissa On-Prem
                    <NTENTBadge dimension="risk" tooltip="On-prem requires parallel testing" />
                    <Tooltip id="citrixOnPrem" content={{
                      title: "On-Premises VDI",
                      description: "On-premises VDI requires migration planning and parallel testing",
                      formula: "Score = Selection × Weight",
                      weights: { simple: 1, medium: 2, complex: 3 },
                      tip: "Full on-prem migration requires careful cutover planning and rollback strategy"
                    }} />
                  </label>
                  <select
                    value={formData.citrixOnPrem}
                    onChange={(e) => setFormData({...formData, citrixOnPrem: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">No</option>
                    <option value="2">Partial</option>
                    <option value="3">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cloud Platform
                    <NTENTBadge dimension="edu" tooltip="Azure is native for AVD. GCP/AWS adds complexity" />
                    <Tooltip id="cloud" content={tooltips.cloud} />
                  </label>
                  <select
                    value={formData.cloud}
                    onChange={(e) => setFormData({...formData, cloud: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Azure (Score: 2)</option>
                    <option value="2">Hybrid/Multi-cloud (Score: 4)</option>
                    <option value="3">GCP/AWS / No cloud exp. (Score: 9)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Azure Landing Zone
                    <NTENTBadge dimension="next" tooltip="Existing landing zone saves 2-3 weeks" />
                    <Tooltip id="landingZone" content={tooltips.landingZone} />
                  </label>
                  <select
                    value={formData.landingZone}
                    onChange={(e) => setFormData({...formData, landingZone: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Yes - Exists (Score: 2)</option>
                    <option value="2">Partial - Existing + New (Score: 4)</option>
                    <option value="3">No - New to Azure (Score: 9)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Operating Systems
                    <NTENTBadge dimension="risk" tooltip="Legacy OS requires upgrade/compatibility testing" />
                    <Tooltip id="os" content={tooltips.os} />
                  </label>
                  <select
                    value={formData.os}
                    onChange={(e) => setFormData({...formData, os: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Windows 11 / Server 2019+</option>
                    <option value="2">Windows 10 / Server 2016</option>
                    <option value="3">Windows 7/8 / Server 2012</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Governance & Security */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                <Shield className="text-nerdio-primary-500" />
                Governance & Security
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Change Control Process
                    <NTENTBadge dimension="risk" tooltip="How fast can you get approvals? Directly impacts velocity" />
                    <Tooltip id="changeControl" content={tooltips.changeControl} />
                  </label>
                  <select
                    value={formData.changeControl}
                    onChange={(e) => setFormData({...formData, changeControl: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Less than 1 week</option>
                    <option value="2">1-2 weeks</option>
                    <option value="3">Monthly process</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Security Review Process
                    <NTENTBadge dimension="risk" tooltip="Security reviews gate deployments and add approval cycles" />
                    <Tooltip id="security" content={tooltips.security} />
                  </label>
                  <select
                    value={formData.security}
                    onChange={(e) => setFormData({...formData, security: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Accept defaults</option>
                    <option value="2">Short review process</option>
                    <option value="3">Challenging/Lengthy review</option>
                  </select>
                </div>
              </div>
            </div>
              </>
            )}

            {/* TAB 3: Applications */}
            {activeTab === 'applications' && (
              <>
                {/* Applications */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                    <Package className="text-nerdio-primary-500" />
                    Application Discovery
                  </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Applications
                    <NTENTBadge dimension="risk" tooltip="More apps = more testing, packaging, validation" />
                    <Tooltip id="apps" content={tooltips.apps} />
                  </label>
                  <select
                    value={formData.apps}
                    onChange={(e) => setFormData({...formData, apps: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Less than 100</option>
                    <option value="2">100-300</option>
                    <option value="3">More than 300</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    App Modernization Required?
                    <NTENTBadge dimension="risk" tooltip="10x WEIGHT! Single biggest timeline factor - what could kill this?" />
                    <Tooltip id="modernization" content={tooltips.modernization} />
                  </label>
                  <select
                    value={formData.modernization}
                    onChange={(e) => setFormData({...formData, modernization: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">No - Already modern</option>
                    <option value="2">Some repackaging needed</option>
                    <option value="3">Yes - Full modernization (Weight: 10!)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Backend System Connections
                    <NTENTBadge dimension="risk" tooltip="Backend connections affect network design and latency" />
                    <Tooltip id="backend" content={tooltips.backend} />
                  </label>
                  <select
                    value={formData.backend}
                    onChange={(e) => setFormData({...formData, backend: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">No</option>
                    <option value="2">Few / Low priority</option>
                    <option value="3">Core LOB / Latency sensitive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peripheral Device Requirements
                    <NTENTBadge dimension="risk" tooltip="Peripherals need special drivers and testing" />
                    <Tooltip id="peripherals" content={tooltips.peripherals} />
                  </label>
                  <select
                    value={formData.peripherals}
                    onChange={(e) => setFormData({...formData, peripherals: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">No</option>
                    <option value="2">Yes - RemoteFX capable</option>
                    <option value="3">RemoteFX + 3rd party drivers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cloud Testing Status
                    <NTENTBadge dimension="edu" tooltip="Prior cloud testing reduces unknowns" />
                    <Tooltip id="cloudTesting" content={tooltips.cloudTesting} />
                  </label>
                  <select
                    value={formData.cloudTesting}
                    onChange={(e) => setFormData({...formData, cloudTesting: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Yes - Works well</option>
                    <option value="2">Yes - Some challenges</option>
                    <option value="3">Not tested</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Application Modernization
                    <NTENTBadge dimension="risk" tooltip="Recent modernization = less technical debt" />
                    <Tooltip id="lastMod" content={tooltips.lastMod} />
                  </label>
                  <select
                    value={formData.lastMod}
                    onChange={(e) => setFormData({...formData, lastMod: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">Recently (modern)</option>
                    <option value="2">1-2 years ago</option>
                    <option value="3">2+ years ago</option>
                  </select>
                </div>
              </div>

              {/* App Transformation Progress - NEW FIELD */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  % Complete of App Transformation
                  <NTENTBadge dimension="timing" tooltip="How much app transformation work has already been done? This reduces Phase 1 duration." />
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={formData.appTransformComplete}
                    onChange={(e) => setFormData({...formData, appTransformComplete: parseInt(e.target.value)})}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nerdio-primary-500"
                  />
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <span className="text-lg font-bold text-nerdio-dark">{formData.appTransformComplete}%</span>
                    <span className="text-xs text-gray-500">complete</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Started (0%)</span>
                  <span>Fully Complete (100%)</span>
                </div>
                <p className="text-xs text-gray-600 mt-2 bg-blue-50 p-2 rounded">
                  💡 If app assessment/packaging work has already started, this reduces the "Prepare & Transform Applications" phase duration.
                </p>
              </div>
            </div>
              </>
            )}

            {/* Action Buttons - Always Visible */}
            <div className="flex gap-3">
              <button
                data-calculate-btn
                onClick={calculateTimeline}
                className="flex-1 bg-nerdio-primary-500 hover:bg-nerdio-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Estimate Timeline
              </button>
              {activeTab !== 'applications' ? (
                <button
                  onClick={() => setActiveTab(activeTab === 'timeline' ? 'technology' : 'applications')}
                  className="bg-nerdio-primary-500 hover:bg-nerdio-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  Next Tab →
                </button>
              ) : (
                <button
                  onClick={clearForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={20} />
                  Clear Form
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-nerdio-dark mb-4">How This Estimate Works</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  18 complexity factors assessed (1-3)
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Weighted scoring based on typical impact
                </p>
                <p className="flex items-start gap-2">
                  <AlertTriangle size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                  App modernization has highest impact
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Generates estimated week ranges
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Compares to your target go-live
                </p>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
                <p className="text-sm font-semibold text-amber-800">Key Factor to Consider</p>
                <p className="text-sm text-amber-700 mt-1">
                  Application modernization typically has the largest impact on timeline estimates - worth careful evaluation with your team.
                </p>
              </div>

              {/* Item 11: Tooltip emphasis */}
              <div className="mt-4 p-3 bg-nerdio-info-50 border border-nerdio-info-200 rounded-lg">
                <p className="text-xs text-nerdio-info-700 flex items-center gap-2">
                  <Info size={14} className="text-nerdio-info-500 flex-shrink-0" />
                  <span><strong>Tip:</strong> Hover over <span className="inline-block w-4 h-4 bg-nerdio-info-500 rounded-full text-white text-[10px] flex items-center justify-center">i</span> icons for detailed guidance on each field.</span>
                </p>
              </div>
            </div>

            {/* Usage Guidelines - Do's and Don'ts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                <Shield className="text-nerdio-primary-600" size={20} />
                Usage Guidelines
              </h2>

              {/* Do's */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <CheckCircle size={14} />
                  Do's
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Use as a conversation starter with customers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Present as an "estimate" or "projection"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Validate with customer's actual environment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Adjust inputs based on discovery findings
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Include buffer for unexpected complexities
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <h3 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                  <AlertTriangle size={14} />
                  Don'ts
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Present as a guaranteed or fixed timeline
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Use in formal contracts without validation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Skip discovery questions to speed up sales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Ignore red timeline indicators
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Promise timeline without partner involvement
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-2 bg-nerdio-primary-50 border border-nerdio-primary-200 rounded text-xs text-nerdio-primary-700">
                <strong>Remember:</strong> This tool helps set realistic expectations - not make promises.
              </div>
            </div>

            {/* Saved Scenarios */}
            {savedScenarios.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                  <Save className="text-nerdio-primary-600" size={20} />
                  Saved Scenarios
                </h2>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {savedScenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        currentScenarioId === scenario.id
                          ? 'bg-nerdio-primary-50 border-nerdio-primary-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => loadScenario(scenario)}>
                        <p className="text-sm font-medium text-gray-900 truncate">{scenario.name}</p>
                        <p className="text-xs text-gray-500">{scenario.date}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${scenario.name}"?`)) {
                            const updated = savedScenarios.filter(s => s.id !== scenario.id);
                            setSavedScenarios(updated);
                            localStorage.setItem('nerdioScenarios', JSON.stringify(updated));
                            if (currentScenarioId === scenario.id) setCurrentScenarioId(null);
                            toast.success('Scenario deleted');
                          }
                        }}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        title="Delete scenario"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {/* Empty State - No Results Yet */}
        {!results && (
          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-nerdio-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-nerdio-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Ready to Estimate Your Timeline?
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill in the {tabs.find(t => t.id === activeTab)?.fields} factors in the <span className="font-semibold text-nerdio-primary-600">{tabs.find(t => t.id === activeTab)?.label}</span> tab,
                  then click "Estimate Timeline" to see if your go-live date appears feasible.
                </p>
                <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>18 factors analyzed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Phase overlap optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Risk recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="mt-6 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-nerdio-dark">Estimated Timeline Analysis</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      try {
                        toast.loading('Generating PDF with timeline visual...', { id: 'pdf-export' });
                        const pdfResult = await exportTimelinePDF(
                          results,
                          formData,
                          `Scenario ${savedScenarios.length + 1}`,
                          timelineRef.current,
                          true // returnBlob option
                        );
                        toast.success(`Timeline exported to ${pdfResult.filename || pdfResult}`, { id: 'pdf-export' });
                      } catch (error) {
                        console.error('PDF export error:', error);
                        toast.error('Failed to export PDF: ' + error.message, { id: 'pdf-export' });
                      }
                    }}
                    className="flex items-center gap-2 bg-nerdio-secondary-600 hover:bg-nerdio-secondary-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download size={18} />
                    Export PDF
                  </button>
                  <button
                    onClick={openSaveDialog}
                    className="flex items-center gap-2 bg-nerdio-primary-500 hover:bg-nerdio-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save size={18} />
                    Save Scenario
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-nerdio-primary-50 border-2 border-nerdio-primary-200 rounded-lg p-6 text-center relative">
                  {acceleratedTimeline && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Accelerated
                    </div>
                  )}
                  <div className="text-4xl font-bold text-nerdio-dark">
                    {acceleratedTimeline
                      ? `~${Math.round((results.weeksRequired - acceleratedTimeline.weeksSaved) * 10) / 10}`
                      : `~${results.weeksRequired}`}
                  </div>
                  <div className="text-blue-700 mt-2">Est. Weeks Required</div>
                  {acceleratedTimeline ? (
                    <div className="text-xs text-green-600 mt-1 flex items-center justify-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      ~{acceleratedTimeline.weeksSaved}w saved with partners
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 mt-1">Based on complexity factors</div>
                  )}
                </div>
                <div className="bg-nerdio-secondary-50 border-2 border-nerdio-secondary-200 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-nerdio-dark">{results.weeksAvailable}</div>
                  <div className="text-purple-700 mt-2">Weeks Available</div>
                  <div className="text-xs text-gray-500 mt-1">Start to go-live window</div>
                </div>
                {/* Delta card - shows accelerated delta when partner acceleration enabled */}
                {(() => {
                  const effectiveDelta = acceleratedTimeline
                    ? results.delta + acceleratedTimeline.weeksSaved
                    : results.delta;
                  const deltaImproved = acceleratedTimeline && results.delta < 0 && effectiveDelta >= results.delta;

                  return (
                    <div className={`border-2 rounded-lg p-6 text-center relative ${
                      effectiveDelta >= 0 ? 'bg-green-50 border-green-200' :
                      effectiveDelta >= -4 ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      {deltaImproved && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          Improved
                        </div>
                      )}
                      <div className={`text-4xl font-bold ${
                        effectiveDelta >= 0 ? 'text-green-900' :
                        effectiveDelta >= -4 ? 'text-yellow-900' :
                        'text-red-900'
                      }`}>
                        {effectiveDelta > 0 ? '+' : ''}~{effectiveDelta.toFixed(1)}
                      </div>
                      <div className={`mt-2 ${
                        effectiveDelta >= 0 ? 'text-green-700' :
                        effectiveDelta >= -4 ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        Est. Delta (Gap)
                      </div>
                      {acceleratedTimeline && results.delta < 0 ? (
                        <div className="text-xs text-green-600 mt-1">
                          Was ~{results.delta.toFixed(1)}w before acceleration
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 mt-1">Buffer or shortfall</div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Validity Message */}
              {(() => {
                const effectiveDelta = acceleratedTimeline
                  ? results.delta + acceleratedTimeline.weeksSaved
                  : results.delta;

                return (
                  <div className={`border-2 rounded-lg p-6 mb-6 ${getValidityColor(effectiveDelta)}`}>
                    <div className="text-xl font-bold flex items-center">
                      {getValidityIcon(effectiveDelta)}
                      {effectiveDelta >= 0 ? 'TIMELINE APPEARS FEASIBLE' :
                       effectiveDelta >= -4 ? 'TIMELINE MAY BE TIGHT - ELEVATED RISK' :
                       'TIMELINE LIKELY NOT FEASIBLE'}
                      {acceleratedTimeline && results.delta < 0 && effectiveDelta >= 0 && (
                        <span className="ml-3 text-sm font-normal bg-green-200 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Partner acceleration applied
                        </span>
                      )}
                    </div>
                    <p className="mt-2">
                      {effectiveDelta >= 0
                        ? `Estimated ~${effectiveDelta.toFixed(1)} weeks of buffer for unexpected issues. Actual timeline may vary.`
                        : effectiveDelta >= -4
                        ? `Estimated ~${Math.abs(effectiveDelta).toFixed(1)} weeks short - may require scope adjustment or timeline extension.`
                        : `Estimated ~${Math.abs(effectiveDelta).toFixed(1)} weeks short - project scope or timeline likely needs adjustment.`}
                    </p>
                    {acceleratedTimeline && results.delta < effectiveDelta && (
                      <p className="mt-2 text-sm text-green-700 bg-green-50 rounded p-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 flex-shrink-0" />
                        <span>
                          Partner acceleration improved timeline by ~{acceleratedTimeline.weeksSaved} weeks
                          (from ~{results.delta.toFixed(1)}w to ~{effectiveDelta.toFixed(1)}w)
                        </span>
                      </p>
                    )}
                    <p className="text-xs text-gray-600 mt-2 italic">
                      * This assessment is based on typical AVD migration patterns and may vary based on your specific circumstances.
                    </p>
                  </div>
                );
              })()}

              {/* Gantt Timeline */}
              {renderGanttTimeline()}

              {/* Partner Timeline Acceleration - Optional feature */}
              <PartnerTimelineAccelerator
                phases={results.phases}
                weeksShort={results.delta}
                weeksRequired={results.weeksRequired}
                formData={formData}
                onAcceleratedTimeline={setAcceleratedTimeline}
                className="mt-6"
              />

              {/* Strategic Recommendations */}
              <StrategicRecommendations
                delta={results.delta}
                weeksRequired={results.weeksRequired}
                weeksAvailable={results.weeksAvailable}
                breakdown={results.breakdown}
                formData={formData}
                totalScore={results.totalScore}
                className="mt-6"
              />

              {/* Partner Optimization Stack - Help accelerate timeline */}
              {showPartnerHints && (
                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                    <Layers className="text-purple-600" size={24} />
                    Partner Optimization Stack
                    <span className="text-xs font-normal bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full ml-2">
                      Accelerate Delivery
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {results.delta < 0
                      ? "Partners can help compress your timeline and reduce complexity. Consider these solutions to meet your go-live date."
                      : "Maximize project success with best-of-breed partner solutions that integrate seamlessly with Nerdio."}
                  </p>
                  <PartnerSuggestionBanner
                    variant="highlight"
                    context={`${results.weeksRequired} week timeline`}
                    showSavings={true}
                    maxPartners={4}
                  />
                </div>
              )}

              {/* Success Stories - Social proof for similar migrations */}
              {showSocialProof && (
                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-nerdio-dark mb-4 flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={24} />
                    Similar Customer Success Stories
                    <span className="text-xs font-normal bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full ml-2">
                      Social Proof
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    See how similar organizations successfully completed their AVD migrations with Nerdio.
                  </p>
                  <SuccessStoryCarousel
                    stories={caseStudies.slice(0, 10)}
                    autoPlay={true}
                    interval={8000}
                    showControls={true}
                  />
                </div>
              )}

              {/* Complexity Breakdown by Category */}
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-nerdio-dark mb-4">Complexity Assessment Breakdown</h3>
                <p className="text-sm text-gray-600 mb-4">
                  These factors contribute to the estimated timeline calculation:
                </p>
                
                {/* Group by category */}
                {['Project Scope', 'Tech Stack', 'Governance', 'Security', 'Applications'].map(category => {
                  const categoryItems = results.breakdown.filter(item => item.category === category);
                  if (categoryItems.length === 0) return null;
                  
                  const categoryTotal = categoryItems.reduce((sum, item) => sum + item.score, 0);
                  
                  return (
                    <div key={category} className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center justify-between">
                        <span>{category}</span>
                        <span className="text-sm text-gray-600">{categoryTotal} points</span>
                      </h4>
                      <div className="space-y-2">
                        {categoryItems.map((item, idx) => {
                          const Icon = BREAKDOWN_ICONS[item.name] || Info;
                          return (
                            <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <span className="flex items-center gap-2 text-gray-700">
                                <Icon size={16} className="text-nerdio-primary-500" />
                                <span className="text-sm">{item.name}</span>
                              </span>
                              <span className="text-nerdio-dark font-semibold text-sm">
                                {item.score} pts <span className="text-gray-500">({item.value} × {item.weight})</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border-t-2 border-indigo-500 mt-4">
                  <span className="font-bold text-indigo-900">TOTAL COMPLEXITY SCORE</span>
                  <span className="font-bold text-indigo-900 text-xl">{results.totalScore} points</span>
                </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">About These Estimates</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>* Based on typical patterns from AVD migration projects</li>
                    <li>* Calculations assume a dedicated project delivery team</li>
                    <li>* Actual timelines may vary based on your specific environment and team capabilities</li>
                    <li>* We recommend validating these estimates with your implementation partner</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>   
        )}
      </div>

      {/* Test Data - handled by centralized TestDataPanel in App.jsx */}

      {/* Save Scenario Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-nerdio-dark flex items-center gap-2">
                <Save className="text-nerdio-primary-500" />
                Save Scenario
              </h2>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scenario Name <span className="text-gray-400">(e.g., Company Name)</span>
              </label>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="Enter company or scenario name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nerdio-primary-500 focus:border-nerdio-primary-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && scenarioName.trim()) {
                    saveScenario();
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Saved: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveScenario()}
                  disabled={!scenarioName.trim()}
                  className="flex-1 px-4 py-2 bg-nerdio-primary-500 hover:bg-nerdio-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NerdioTimelineCalculator;
