import React, { useState, useMemo } from 'react';
import {
  Lightbulb,
  MessageCircle,
  Quote,
  Target,
  TrendingDown,
  ChevronRight,
  ChevronLeft,
  Users,
  Building2,
  Award,
  AlertTriangle,
  Sparkles,
  X,
  HelpCircle
} from 'lucide-react';
import {
  findRelevantCaseStudies,
  findCaseStudiesByPlatform,
  findCaseStudiesByIndustry,
  getTestimonialQuote,
  getCaseStudyStats
} from '../../../data/caseStudies';

/**
 * CoachingSidebar - A collapsible sidebar providing contextual coaching
 * Shows discovery questions, objection handling, and relevant proof points
 * based on the current step and customer profile
 */
export default function CoachingSidebar({
  currentStep,
  customerProfile,
  onClose,
  className = ''
}) {
  const [activeTab, setActiveTab] = useState('discovery');

  // Get stats
  const stats = useMemo(() => getCaseStudyStats(), []);

  // Get matched stories based on profile
  const matchedStories = useMemo(() => {
    if (!customerProfile) return [];
    return findRelevantCaseStudies({
      industry: customerProfile.industry?.toLowerCase().replace(' ', '-'),
      sourcePlatform: customerProfile.currentPlatform,
      companySize: customerProfile.companySize,
      userCount: customerProfile.totalUsers
    }, 5);
  }, [customerProfile]);

  // Get a contextual quote
  const contextualQuote = useMemo(() => {
    return getTestimonialQuote({
      industry: customerProfile?.industry?.toLowerCase().replace(' ', '-'),
      platform: customerProfile?.currentPlatform
    });
  }, [customerProfile]);

  // Step-specific coaching content
  const stepCoaching = {
    0: { // Scenario Selection
      title: 'Scenario Selection Tips',
      discovery: [
        "What's driving your interest in AVD right now?",
        "Are you looking to replace, augment, or consolidate?",
        "What's the timeline pressure you're facing?"
      ],
      tips: [
        'Multi-platform consolidations often yield highest ROI',
        'Citrix/VMware renewals create natural urgency',
        'Remote work initiatives accelerate adoption'
      ],
      objections: []
    },
    1: { // Customer Profile
      title: 'Profile Discovery',
      discovery: [
        "How many users need VDI access today vs. growth plans?",
        "What compliance requirements affect your industry?",
        "Who are the key decision makers for this initiative?"
      ],
      tips: [
        'User count directly impacts VM sizing and costs',
        'Industry determines compliance messaging',
        'Identifying champions early accelerates deals'
      ],
      objections: [
        {
          objection: "We're just exploring options",
          response: "That's great - let me show you what similar organizations discovered during their exploration. What specific questions are you hoping to answer?"
        }
      ]
    },
    2: { // NTENT Discovery
      title: 'NTENT Deep Dive',
      discovery: [
        "What happens if this project doesn't happen this year?",
        "Who else needs to be involved in this decision?",
        "What would make this a 'must-do' vs 'nice-to-have'?"
      ],
      tips: [
        'Connect business pain to technical solution',
        'Identify and map all stakeholders',
        'Quantify the cost of inaction'
      ],
      objections: [
        {
          objection: "We need to wait until next budget cycle",
          response: "I understand budget timing is critical. Many customers find that starting planning now positions them to capture savings immediately when budget is available. What if we build a business case that shows ROI within the first year?"
        }
      ]
    },
    3: { // Current State
      title: 'Current State Discovery',
      discovery: [
        "What do you love about your current platform?",
        "What are the biggest pain points with your current setup?",
        "How many FTEs manage your VDI environment today?"
      ],
      tips: [
        'Document current costs for ROI comparison',
        'Understand renewal dates and contract terms',
        'Identify hidden costs (labor, downtime, tickets)'
      ],
      objections: [
        {
          objection: "Our current platform works fine",
          response: "That's good to hear - stability is important. What if I could show you how customers with similar 'working' setups achieved 50%+ cost savings while improving user experience? Would that be worth 15 minutes to explore?"
        }
      ]
    },
    4: { // Future State
      title: 'Future State Design',
      discovery: [
        "What would 'success' look like 6 months after go-live?",
        "Are there specific capabilities you need that you don't have today?",
        "How important is automation and self-service to your team?"
      ],
      tips: [
        'Nerdio automation saves 35+ hours/week',
        'Auto-scaling typically reduces compute by 35%',
        'Position Nerdio as enabling vs just managing'
      ],
      objections: [
        {
          objection: "We can manage AVD natively",
          response: "Absolutely - AVD is powerful on its own. What we hear from customers who tried native management is that the time spent on manual tasks like image updates and scaling could be better spent on strategic projects. Would you like to see what automation looks like in practice?"
        }
      ]
    },
    5: { // Results
      title: 'Closing & Next Steps',
      discovery: [
        "What would prevent you from moving forward?",
        "Who else needs to see these numbers?",
        "What's your decision timeline?"
      ],
      tips: [
        'Share stakeholder-specific views',
        'Offer POC or pilot program',
        'Set specific next steps with dates'
      ],
      objections: [
        {
          objection: "The numbers look good but we need to think about it",
          response: "Of course - this is a significant decision. What specific areas would be most helpful to explore further? I can connect you with a customer in your industry who went through the same evaluation."
        }
      ]
    }
  };

  const currentCoaching = stepCoaching[currentStep] || stepCoaching[1];

  const tabs = [
    { id: 'discovery', label: 'Discovery', icon: MessageCircle },
    { id: 'tips', label: 'Tips', icon: Lightbulb },
    { id: 'objections', label: 'Handle', icon: AlertTriangle },
    { id: 'proof', label: 'Proof', icon: Award }
  ];

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-nerdio-dark to-nerdio-primary text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold">Sales Coach</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-white/80">{currentCoaching.title}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-2 text-xs font-medium flex flex-col items-center gap-1 transition-colors ${
                activeTab === tab.id
                  ? 'bg-nerdio-light text-nerdio-dark border-b-2 border-nerdio-primary'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'discovery' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Discovery Questions
            </h4>
            {currentCoaching.discovery.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100"
              >
                <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800 italic">"{q}"</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Sales Tips
            </h4>
            {currentCoaching.tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100"
              >
                <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">{tip}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'objections' && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Objection Handling
            </h4>
            {currentCoaching.objections.length > 0 ? (
              currentCoaching.objections.map((obj, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="p-3 bg-red-50 border-b border-red-100">
                    <p className="text-sm text-red-800 font-medium">"{obj.objection}"</p>
                  </div>
                  <div className="p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">Response:</p>
                    <p className="text-sm text-green-800">{obj.response}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No specific objections for this step.</p>
            )}
          </div>
        )}

        {activeTab === 'proof' && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Social Proof
            </h4>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-nerdio-light rounded-lg text-center">
                <div className="text-xl font-bold text-nerdio-dark">{stats.totalCustomers}+</div>
                <div className="text-xs text-nerdio-dark/70">Success Stories</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <div className="text-xl font-bold text-green-700">50%+</div>
                <div className="text-xs text-green-600">Avg Savings</div>
              </div>
            </div>

            {/* Matched stories */}
            {matchedStories.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-gray-500 mb-2">Relevant Stories</h5>
                <div className="space-y-2">
                  {matchedStories.slice(0, 3).map((story, i) => (
                    <div
                      key={story.id}
                      className="p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-sm text-gray-800">{story.company}</span>
                      </div>
                      <p className="text-xs text-gray-500 capitalize mb-2">
                        {story.industry?.replace('-', ' ')}
                      </p>
                      {story.impacts?.[0] && (
                        <div className="flex items-center gap-1 text-green-600 text-xs">
                          <TrendingDown className="w-3 h-3" />
                          <span className="font-semibold">{story.impacts[0].value}</span>
                          <span>{story.impacts[0].metric}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quote */}
            {contextualQuote && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <Quote className="w-4 h-4 text-gray-400 mb-2" />
                <p className="text-xs italic text-gray-600 line-clamp-3">
                  "{contextualQuote.quote}"
                </p>
                <p className="text-[10px] text-gray-500 mt-2">
                  - {contextualQuote.person}, {contextualQuote.company}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <HelpCircle className="w-4 h-4" />
          <span>Step {currentStep + 1} of 6</span>
        </div>
      </div>
    </div>
  );
}
