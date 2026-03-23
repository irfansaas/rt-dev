# Nerdio Value Engineering Suite

A comprehensive sales engineering toolkit for Azure Virtual Desktop (AVD) migrations with Nerdio Manager. This suite provides timeline calculation, business case building, competitive intelligence, and deal acceleration tools.

## Features

### Timeline Calculator
- **18 Complexity Factors**: Comprehensive scoring across Project Scope, Tech Stack, Governance, Security, and Applications
- **Weighted Scoring System**: Application modernization has 10x weight when required
- **Visual Timeline**: Modern horizontal timeline showing phase-by-phase breakdown
- **Partner Acceleration**: Integration with 6 technology partners for timeline optimization
- **Smart Recommendations**: Context-aware suggestions based on your complexity profile
- **Scenario Comparison**: Save and compare multiple project configurations

### Business Case Builder (6-Step Wizard)
1. **Scenario Selection**: Multi-select migration scenarios with primary designation
2. **Customer Profile**: Company info, user count, industry, contacts
3. **NTENT Discovery**: Guided discovery questions across 5 dimensions
4. **Current State**: Simple mode or Mixed Environments configuration
5. **Future State**: Azure AVD + Nerdio configuration with partner stack
6. **Results Dashboard**: 5 tabs of comprehensive analysis

### Results Dashboard
- **Business Case Tab**: TCO comparison, ROI analysis, payback period, environmental impact
- **Stakeholder Views**: Finance, IT, Security, Executive persona presentations
- **Deal Tracking**: Risk Register + Close Plan milestones
- **Competitive Intel**: Battlecards for Citrix, VMware, RDS, Windows 365, AWS
- **Share & Export**: Email templates, PDF, Excel, CSV, JSON export

### Quick Qualifier (NTENT Framework)
- **N**eed & Priority - Business problem discovery
- **T**iming & Urgency - Timeline requirements
- **E**ducation & Enablement - Learning needs
- **N**ext Step - Micro-commitments
- **T**eams & Stakeholders - Key players mapping

### Additional Features
- **Sensitivity Analysis**: What-if scenarios for cost variables
- **Assumptions Panel**: Document and track assumptions
- **Scenario Templates**: Pre-built configurations for common migrations
- **Auto-Save**: Automatic scenario persistence with cloud sync
- **Partner Recommendations**: AI-powered partner stack suggestions
- **50+ Case Studies**: Industry-specific social proof
- **Executive One-Pager**: Summary export for leadership

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4 with custom Nerdio brand colors
- **Form Management**: react-hook-form with Zod validation
- **Icons**: lucide-react
- **Charts**: Recharts
- **PDF Generation**: jsPDF + jspdf-autotable
- **Excel Export**: xlsx (SheetJS)
- **Date Handling**: date-fns
- **State Management**: React Context API
- **Notifications**: react-hot-toast

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── TimelineCalculator.jsx      # Main timeline calculator
│   ├── business-case/              # Business Case Builder (15+ components)
│   ├── QuickQualifier/             # NTENT discovery form
│   ├── ExecutiveOnePager/          # Executive summary export
│   ├── navigation/                 # Main navigation
│   └── ui/                         # Shared UI components
├── contexts/
│   ├── BusinessCaseContext.jsx     # Global business case state
│   └── AuthContext.jsx             # Authentication state
├── hooks/                          # Custom React hooks
├── config/                         # Configuration files
├── constants/                      # Static constants
├── utils/                          # Utility functions
│   ├── business-case/              # Cost & ROI calculators
│   ├── timeline/                   # Phase calculations
│   └── export/                     # PDF & Excel generators
└── data/                           # Pricing & metrics data
```

## Documentation

- [Feature Guide](docs/FEATURE_GUIDE.md) - Comprehensive feature walkthrough
- [User Guide](docs/USER_GUIDE.md) - End-user documentation
- [Architecture](docs/ARCHITECTURE.md) - Technical architecture overview
- [Developer Guide](docs/DEVELOPER_GUIDE.md) - Development & maintenance
- [Release Notes](docs/RELEASE_NOTES.md) - Version history

## Brand Colors

- **Primary (Eastern Blue)**: `#239CBB`
- **Secondary (Viking)**: `#77CADC`
- **Dark (Firefly)**: `#0F2A38`
- **Light**: `#E8F5F9`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `?` | Open Quick Reference |
| `F1` | Open Help Center |
| `Ctrl+S` | Save current scenario |
| `Ctrl+E` | Export to PDF |
| `Esc` | Close modals |

## License

Proprietary - Nerdio Internal Use Only
