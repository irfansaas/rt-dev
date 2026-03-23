/**
 * NTENT Dimensions Constants
 * Centralized NTENT framework dimension definitions
 */

import { Target, Users, GraduationCap, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

// NTENT Discovery Framework Dimensions
export const NTENT_DIMENSIONS = [
  {
    key: 'next',
    letter: 'N',
    label: 'Next Step',
    description: 'Commitments & meetings',
    fullDescription: 'What specific actions have they committed to? Who needs to attend the next meeting?',
    icon: ArrowRight,
    examples: [
      'When can we schedule the next call?',
      'Who else should be in that meeting?',
      'What do you need from me before then?'
    ]
  },
  {
    key: 'teams',
    letter: 'T',
    label: 'Teams',
    description: 'Stakeholders & approvers',
    fullDescription: 'Who are the key decision makers and influencers in this deal?',
    icon: Users,
    examples: [
      'Who needs to approve this?',
      'Who has budget authority?',
      'Who could block this project?'
    ]
  },
  {
    key: 'edu',
    letter: 'E',
    label: 'Education',
    description: 'Proof & enablement',
    fullDescription: 'What proof points or learning do they need to move forward?',
    icon: GraduationCap,
    examples: [
      'What proof points do they need?',
      'Have they seen a demo?',
      'Would a reference call help?'
    ]
  },
  {
    key: 'need',
    letter: 'N',
    label: 'Need',
    description: 'Priority metrics',
    fullDescription: 'What business problem are we solving and why is it important?',
    icon: Target,
    examples: [
      'Why is this urgent for them?',
      'What happens if they do nothing?',
      'What metrics matter most?'
    ]
  },
  {
    key: 'time',
    letter: 'T',
    label: 'Timing',
    description: 'Deadlines & urgency',
    fullDescription: 'What compelling events or deadlines drive the timeline?',
    icon: Clock,
    examples: [
      'What date is immovable?',
      'When does the contract expire?',
      'What happens if they miss the deadline?'
    ]
  },
  {
    key: 'risk',
    letter: 'R',
    label: 'Risk',
    description: 'Blockers & concerns',
    fullDescription: 'What could prevent this deal from closing or project from succeeding?',
    icon: AlertTriangle,
    examples: [
      'What could kill this deal?',
      'What concerns do they have?',
      'What has failed before?'
    ]
  }
];

// Get dimension by key
export const getDimension = (key) => {
  return NTENT_DIMENSIONS.find(d => d.key === key);
};

// Get all dimension keys
export const DIMENSION_KEYS = NTENT_DIMENSIONS.map(d => d.key);

// Dimension display colors (maps to ntentColors.js)
export const DIMENSION_DISPLAY_COLORS = {
  next: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100' },
  teams: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', badge: 'bg-cyan-100' },
  edu: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100' },
  need: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100' },
  time: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100' },
  risk: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-100' }
};

export default NTENT_DIMENSIONS;
