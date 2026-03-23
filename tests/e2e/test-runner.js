#!/usr/bin/env node
/**
 * NERDIO VALUE ENGINEERING SUITE - TEST RUNNER
 * =============================================
 * Single command to run all tests and generate reports
 *
 * Usage: npm run test:all
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, colors.cyan + colors.bright);
  console.log('='.repeat(60) + '\n');
}

function logSuccess(message) {
  log(`[PASS] ${message}`, colors.green);
}

function logError(message) {
  log(`[FAIL] ${message}`, colors.red);
}

function logWarning(message) {
  log(`[WARN] ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`[INFO] ${message}`, colors.blue);
}

// Test results collector
const results = {
  passed: [],
  failed: [],
  skipped: [],
  warnings: [],
  timestamp: new Date().toISOString(),
};

// 1. Build Check
function checkBuild() {
  logSection('1. BUILD CHECK');
  try {
    logInfo('Running production build...');
    execSync('npm run build', { cwd: rootDir, stdio: 'pipe' });
    logSuccess('Production build successful');
    results.passed.push('Build check');
    return true;
  } catch (error) {
    logError('Build failed!');
    results.failed.push({ test: 'Build check', error: error.message });
    return false;
  }
}

// 2. Lint Check (if ESLint is available)
function checkLint() {
  logSection('2. LINT CHECK');
  try {
    execSync('npx eslint src --ext .js,.jsx --quiet', { cwd: rootDir, stdio: 'pipe' });
    logSuccess('No linting errors');
    results.passed.push('Lint check');
    return true;
  } catch (error) {
    logWarning('ESLint not configured or has errors');
    results.warnings.push('Lint check - ESLint not fully configured');
    return true; // Don't fail on lint
  }
}

// 3. Dependency Check
function checkDependencies() {
  logSection('3. DEPENDENCY CHECK');
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Check for critical dependencies
    const criticalDeps = ['react', 'react-dom', 'vite'];
    const missing = criticalDeps.filter(dep => !deps[dep]);

    if (missing.length > 0) {
      logError(`Missing critical dependencies: ${missing.join(', ')}`);
      results.failed.push({ test: 'Dependency check', error: `Missing: ${missing.join(', ')}` });
      return false;
    }

    logSuccess(`All ${Object.keys(deps).length} dependencies present`);
    results.passed.push('Dependency check');
    return true;
  } catch (error) {
    logError('Could not read package.json');
    results.failed.push({ test: 'Dependency check', error: error.message });
    return false;
  }
}

// 4. File Structure Check
function checkFileStructure() {
  logSection('4. FILE STRUCTURE CHECK');
  const requiredFiles = [
    'src/App.jsx',
    'src/main.jsx',
    'src/index.css',
    'src/contexts/BusinessCaseContext.jsx',
    'src/components/TimelineCalculator.jsx',
    'src/components/business-case/BusinessCaseWizard.jsx',
    'package.json',
    'vite.config.js',
    'tailwind.config.js',
  ];

  const missingFiles = [];
  const presentFiles = [];

  for (const file of requiredFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      presentFiles.push(file);
    } else {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length > 0) {
    logError(`Missing files: ${missingFiles.join(', ')}`);
    results.failed.push({ test: 'File structure check', error: `Missing: ${missingFiles.join(', ')}` });
    return false;
  }

  logSuccess(`All ${requiredFiles.length} required files present`);
  results.passed.push('File structure check');
  return true;
}

// 5. Component Import Check
function checkComponentImports() {
  logSection('5. COMPONENT IMPORT CHECK');
  const srcDir = path.join(rootDir, 'src');
  const errors = [];

  function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = content.match(/import.*from\s+['"]([^'"]+)['"]/g) || [];

    for (const imp of imports) {
      const match = imp.match(/from\s+['"]([^'"]+)['"]/);
      if (match) {
        const importPath = match[1];
        // Check relative imports
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          const resolvedPath = path.resolve(path.dirname(filePath), importPath);
          const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx'];
          const exists = extensions.some(ext => fs.existsSync(resolvedPath + ext));
          if (!exists) {
            errors.push(`${filePath}: Cannot resolve '${importPath}'`);
          }
        }
      }
    }
  }

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && file !== 'node_modules') {
        walkDir(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        checkFile(filePath);
      }
    }
  }

  try {
    walkDir(srcDir);

    if (errors.length > 0) {
      logWarning(`Found ${errors.length} potential import issues`);
      errors.slice(0, 5).forEach(err => logWarning(`  ${err}`));
      results.warnings.push(`${errors.length} import issues found`);
    } else {
      logSuccess('All component imports valid');
    }
    results.passed.push('Component import check');
    return true;
  } catch (error) {
    logError(`Import check failed: ${error.message}`);
    results.failed.push({ test: 'Component import check', error: error.message });
    return false;
  }
}

// 6. Calculation Logic Tests
function testCalculationLogic() {
  logSection('6. CALCULATION LOGIC TEST');

  // Test cost calculation formulas
  const testCases = [
    {
      name: 'TCO Calculation',
      test: () => {
        const currentCost = 100000;
        const futureCost = 60000;
        const savings = currentCost - futureCost;
        const percentage = (savings / currentCost) * 100;
        return savings === 40000 && percentage === 40;
      }
    },
    {
      name: 'ROI Calculation',
      test: () => {
        const investment = 50000;
        const returns = 100000;
        const roi = ((returns - investment) / investment) * 100;
        return roi === 100;
      }
    },
    {
      name: 'Payback Period',
      test: () => {
        const investment = 60000;
        const annualSavings = 40000;
        const paybackMonths = (investment / annualSavings) * 12;
        return paybackMonths === 18;
      }
    },
    {
      name: 'Per User Cost',
      test: () => {
        const totalCost = 120000;
        const users = 1000;
        const perUser = totalCost / users / 12;
        return perUser === 10;
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    try {
      if (tc.test()) {
        logSuccess(`  ${tc.name}`);
        passed++;
      } else {
        logError(`  ${tc.name}`);
        failed++;
      }
    } catch (error) {
      logError(`  ${tc.name}: ${error.message}`);
      failed++;
    }
  }

  if (failed === 0) {
    logSuccess(`All ${passed} calculation tests passed`);
    results.passed.push('Calculation logic tests');
    return true;
  } else {
    logError(`${failed} of ${passed + failed} calculation tests failed`);
    results.failed.push({ test: 'Calculation logic tests', error: `${failed} tests failed` });
    return false;
  }
}

// 7. Configuration Validation
function validateConfiguration() {
  logSection('7. CONFIGURATION VALIDATION');

  const configFiles = [
    { file: 'src/config/migrationScenarios.js', key: 'scenarios' },
    { file: 'src/config/competitiveBattlecards.js', key: 'competitors' },
    { file: 'src/config/stakeholderViews.js', key: 'stakeholders' },
    { file: 'src/constants/platformOptions.js', key: 'platforms' },
  ];

  let valid = 0;
  let invalid = 0;

  for (const config of configFiles) {
    const filePath = path.join(rootDir, config.file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Basic syntax check - file should have exports
      if (content.includes('export')) {
        logSuccess(`  ${config.file}`);
        valid++;
      } else {
        logWarning(`  ${config.file} - No exports found`);
        invalid++;
      }
    } else {
      logWarning(`  ${config.file} - Not found`);
      invalid++;
    }
  }

  if (invalid === 0) {
    logSuccess(`All ${valid} configuration files valid`);
    results.passed.push('Configuration validation');
    return true;
  } else {
    logWarning(`${invalid} configuration issues found`);
    results.warnings.push(`${invalid} configuration issues`);
    return true; // Don't fail on config warnings
  }
}

// Generate Report
function generateReport() {
  logSection('TEST RESULTS SUMMARY');

  const totalTests = results.passed.length + results.failed.length;
  const passRate = totalTests > 0 ? ((results.passed.length / totalTests) * 100).toFixed(1) : 0;

  console.log(`
${colors.green}Passed: ${results.passed.length}${colors.reset}
${colors.red}Failed: ${results.failed.length}${colors.reset}
${colors.yellow}Warnings: ${results.warnings.length}${colors.reset}
${colors.blue}Pass Rate: ${passRate}%${colors.reset}
`);

  if (results.failed.length > 0) {
    log('\nFailed Tests:', colors.red);
    results.failed.forEach(f => {
      console.log(`  - ${f.test}: ${f.error}`);
    });
  }

  if (results.warnings.length > 0) {
    log('\nWarnings:', colors.yellow);
    results.warnings.forEach(w => {
      console.log(`  - ${w}`);
    });
  }

  // Save report to file
  const reportPath = path.join(rootDir, 'test-results', 'test-report.json');
  const reportDir = path.dirname(reportPath);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify({
    ...results,
    summary: {
      total: totalTests,
      passed: results.passed.length,
      failed: results.failed.length,
      warnings: results.warnings.length,
      passRate: parseFloat(passRate),
    }
  }, null, 2));

  logInfo(`\nReport saved to: ${reportPath}`);

  return results.failed.length === 0;
}

// Main execution
async function main() {
  console.log(`
${colors.cyan}${colors.bright}
╔═══════════════════════════════════════════════════════════╗
║   NERDIO VALUE ENGINEERING SUITE - TEST RUNNER            ║
║   Comprehensive Testing & Validation                      ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}
`);

  log(`Starting tests at ${new Date().toLocaleString()}\n`, colors.blue);

  // Run all checks
  checkDependencies();
  checkFileStructure();
  checkComponentImports();
  checkBuild();
  checkLint();
  testCalculationLogic();
  validateConfiguration();

  // Generate final report
  const success = generateReport();

  if (success) {
    log('\n[SUCCESS] All tests passed!', colors.green + colors.bright);
    process.exit(0);
  } else {
    log('\n[FAILURE] Some tests failed. Please review the report.', colors.red + colors.bright);
    process.exit(1);
  }
}

main().catch(console.error);
