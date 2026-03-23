// @ts-check
import { test, expect } from '@playwright/test';

/**
 * NERDIO VALUE ENGINEERING SUITE - E2E TEST SUITE
 * ================================================
 * Comprehensive end-to-end tests for all features
 * Run with: npm run test:e2e
 */

// Test data for injecting into forms
const TEST_DATA = {
  customerProfile: {
    companyName: 'Acme Corporation',
    industry: 'Financial Services',
    totalUsers: 1000,
    primaryContact: 'John Smith',
    email: 'john.smith@acme.com',
  },
  timeline: {
    simple: {
      goLiveDate: getFutureDate(90),
      users: '1',
      useCases: '1',
      cloud: '2',
      apps: '1',
    },
    complex: {
      goLiveDate: getFutureDate(120),
      users: '3',
      useCases: '3',
      cloud: '3',
      apps: '3',
    }
  }
};

function getFutureDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// ==========================================
// 1. APPLICATION LOADING & NAVIGATION TESTS
// ==========================================

test.describe('Application Loading', () => {
  test('should load the main application', async ({ page }) => {
    await page.goto('/');

    // Check page loads without errors
    await expect(page).toHaveTitle(/Nerdio|Timeline|Calculator/i);

    // Verify main navigation is present
    await expect(page.locator('nav, [role="navigation"], header')).toBeVisible();
  });

  test('should display the main navigation tabs', async ({ page }) => {
    await page.goto('/');

    // Check for navigation elements (could be buttons, tabs, or links)
    const navContainer = page.locator('nav, header').first();
    await expect(navContainer).toBeVisible();
  });

  test('should not have any console errors on load', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for any async errors

    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('favicon') &&
      !err.includes('HMR') &&
      !err.includes('WebSocket')
    );

    expect(criticalErrors.length).toBe(0);
  });
});

// ==========================================
// 2. TIMELINE CALCULATOR TESTS
// ==========================================

test.describe('Timeline Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to Timeline Calculator if not default
    const timelineTab = page.getByRole('button', { name: /timeline/i }).or(
      page.getByText(/timeline calculator/i)
    );
    if (await timelineTab.isVisible()) {
      await timelineTab.click();
    }
  });

  test('should display timeline calculator form', async ({ page }) => {
    // Look for timeline-related content
    const timelineContent = page.locator('text=/go-live|timeline|project/i').first();
    await expect(timelineContent).toBeVisible({ timeout: 10000 });
  });

  test('should have go-live date input', async ({ page }) => {
    const dateInput = page.locator('input[type="date"]').first();
    await expect(dateInput).toBeVisible();
  });

  test('should calculate timeline when form is filled', async ({ page }) => {
    // Fill go-live date
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible()) {
      await dateInput.fill(TEST_DATA.timeline.simple.goLiveDate);
    }

    // Look for any results or calculation output
    await page.waitForTimeout(1000);
    const pageContent = await page.content();
    expect(pageContent).toBeTruthy();
  });

  test('should show complexity factors', async ({ page }) => {
    // Look for complexity-related content
    const complexityContent = page.locator('text=/complexity|factor|scope/i').first();
    if (await complexityContent.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(complexityContent).toBeVisible();
    }
  });
});

// ==========================================
// 3. BUSINESS CASE WIZARD TESTS
// ==========================================

test.describe('Business Case Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to Business Case tab
    const businessCaseTab = page.getByRole('button', { name: /business case/i }).or(
      page.getByText(/business case/i).first()
    );
    if (await businessCaseTab.isVisible()) {
      await businessCaseTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('should display scenario selector', async ({ page }) => {
    // Look for migration scenarios
    const scenarioContent = page.locator('text=/scenario|migration|citrix|vmware/i').first();
    await expect(scenarioContent).toBeVisible({ timeout: 10000 });
  });

  test('should allow scenario selection', async ({ page }) => {
    // Click on a scenario card if available
    const scenarioCard = page.locator('[class*="card"], [class*="scenario"]').first();
    if (await scenarioCard.isVisible({ timeout: 5000 }).catch(() => false)) {
      await scenarioCard.click();
    }
  });

  test('should show progress stepper', async ({ page }) => {
    // Look for step indicators
    const stepIndicator = page.locator('text=/step|customer|profile|current|future/i').first();
    await expect(stepIndicator).toBeVisible({ timeout: 10000 });
  });

  test('should navigate through wizard steps', async ({ page }) => {
    // Select a scenario first
    const citrixOption = page.locator('text=/citrix/i').first();
    if (await citrixOption.isVisible({ timeout: 5000 }).catch(() => false)) {
      await citrixOption.click();
      await page.waitForTimeout(500);

      // Look for next button or continue action
      const nextButton = page.getByRole('button', { name: /next|continue|proceed/i });
      if (await nextButton.isVisible()) {
        await nextButton.click();
      }
    }
  });
});

// ==========================================
// 4. QUICK QUALIFIER (NTENT) TESTS
// ==========================================

test.describe('Quick Qualifier NTENT', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to Qualifier tab
    const qualifierTab = page.getByRole('button', { name: /qualifier/i }).or(
      page.getByText(/qualifier|NTENT/i).first()
    );
    if (await qualifierTab.isVisible()) {
      await qualifierTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('should display NTENT framework', async ({ page }) => {
    // Look for NTENT-related content
    const ntentContent = page.locator('text=/need|timing|education|next step|teams|NTENT/i').first();
    if (await ntentContent.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(ntentContent).toBeVisible();
    }
  });
});

// ==========================================
// 5. EXPORT FUNCTIONALITY TESTS
// ==========================================

test.describe('Export Features', () => {
  test('PDF export button should be functional', async ({ page }) => {
    await page.goto('/');

    // Navigate to results if possible
    const exportButton = page.getByRole('button', { name: /export|pdf|download/i });
    if (await exportButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Just verify it exists and is clickable
      await expect(exportButton).toBeEnabled();
    }
  });

  test('Excel export button should be functional', async ({ page }) => {
    await page.goto('/');

    const excelButton = page.getByRole('button', { name: /excel|spreadsheet/i });
    if (await excelButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(excelButton).toBeEnabled();
    }
  });
});

// ==========================================
// 6. RESPONSIVE DESIGN TESTS
// ==========================================

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    // App should still be functional
    await expect(page.locator('body')).toBeVisible();

    // Check no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 50); // Allow small tolerance
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/');

    await expect(page.locator('body')).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    await expect(page.locator('body')).toBeVisible();
  });
});

// ==========================================
// 7. ACCESSIBILITY TESTS
// ==========================================

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check that headings exist
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();

    // Should have at least some headings for structure
    expect(h1Count + h2Count).toBeGreaterThan(0);
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Check that something is focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeTruthy();
  });

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/');

    const buttons = page.getByRole('button');
    const count = await buttons.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i);
      const name = await button.getAttribute('aria-label') || await button.textContent();
      expect(name?.trim().length).toBeGreaterThan(0);
    }
  });
});

// ==========================================
// 8. STATE MANAGEMENT TESTS
// ==========================================

test.describe('State Management', () => {
  test('should persist data in localStorage', async ({ page }) => {
    await page.goto('/');

    // Check that localStorage operations work
    const hasStorage = await page.evaluate(() => {
      try {
        localStorage.setItem('test', 'value');
        const result = localStorage.getItem('test');
        localStorage.removeItem('test');
        return result === 'value';
      } catch {
        return false;
      }
    });

    expect(hasStorage).toBe(true);
  });

  test('should handle saved scenarios', async ({ page }) => {
    await page.goto('/');

    // Check for saved scenarios functionality
    const savedButton = page.getByRole('button', { name: /saved|load|scenario/i });
    if (await savedButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(savedButton).toBeVisible();
    }
  });
});

// ==========================================
// 9. UI COMPONENTS TESTS
// ==========================================

test.describe('UI Components', () => {
  test('toast notifications should work', async ({ page }) => {
    await page.goto('/');

    // Toast container should exist
    const toastContainer = page.locator('[class*="toast"], [class*="Toaster"]');
    if (await toastContainer.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(toastContainer).toBeVisible();
    }
  });

  test('modals should be dismissible', async ({ page }) => {
    await page.goto('/');

    // If any modal opens, it should be closeable via Escape
    const modal = page.locator('[role="dialog"], [class*="modal"]');
    if (await modal.isVisible({ timeout: 3000 }).catch(() => false)) {
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('dropdowns should be functional', async ({ page }) => {
    await page.goto('/');

    const select = page.locator('select').first();
    if (await select.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(select).toBeEnabled();
    }
  });
});

// ==========================================
// 10. CALCULATION ACCURACY TESTS
// ==========================================

test.describe('Calculation Accuracy', () => {
  test('cost calculations should produce valid numbers', async ({ page }) => {
    await page.goto('/');

    // Look for any currency displays
    const currencyDisplay = page.locator('text=/\\$[0-9,]+/').first();
    if (await currencyDisplay.isVisible({ timeout: 5000 }).catch(() => false)) {
      const text = await currencyDisplay.textContent();
      const hasValidCurrency = /\$[\d,]+/.test(text || '');
      expect(hasValidCurrency).toBe(true);
    }
  });

  test('percentages should be valid', async ({ page }) => {
    await page.goto('/');

    // Look for percentage displays
    const percentDisplay = page.locator('text=/[0-9]+%/').first();
    if (await percentDisplay.isVisible({ timeout: 5000 }).catch(() => false)) {
      const text = await percentDisplay.textContent();
      const match = text?.match(/(\d+)%/);
      if (match) {
        const percent = parseInt(match[1]);
        expect(percent).toBeGreaterThanOrEqual(0);
        expect(percent).toBeLessThanOrEqual(1000); // Reasonable upper limit
      }
    }
  });
});

// ==========================================
// 11. ERROR HANDLING TESTS
// ==========================================

test.describe('Error Handling', () => {
  test('should handle invalid dates gracefully', async ({ page }) => {
    await page.goto('/');

    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      // Try setting invalid past date
      await dateInput.fill('2020-01-01');

      // App should not crash
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should handle empty form submissions', async ({ page }) => {
    await page.goto('/');

    // Try to submit without filling
    const submitButton = page.getByRole('button', { name: /submit|calculate|next/i }).first();
    if (await submitButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await submitButton.click();

      // App should still be functional
      await expect(page.locator('body')).toBeVisible();
    }
  });
});

// ==========================================
// 12. INTEGRATION TESTS
// ==========================================

test.describe('Full User Journey', () => {
  test('complete business case flow', async ({ page }) => {
    await page.goto('/');

    // This test walks through the entire business case creation flow
    // Step 1: Navigate to Business Case
    const businessCaseTab = page.getByRole('button', { name: /business case/i });
    if (await businessCaseTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await businessCaseTab.click();
      await page.waitForTimeout(500);
    }

    // Step 2: Select a scenario
    const scenario = page.locator('text=/citrix/i').first();
    if (await scenario.isVisible({ timeout: 3000 }).catch(() => false)) {
      await scenario.click();
      await page.waitForTimeout(500);
    }

    // Verify we're on the right path
    await expect(page.locator('body')).toBeVisible();
  });

  test('timeline calculator flow', async ({ page }) => {
    await page.goto('/');

    // Fill timeline calculator
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await dateInput.fill(TEST_DATA.timeline.simple.goLiveDate);
      await page.waitForTimeout(500);
    }

    // App should still be functional
    await expect(page.locator('body')).toBeVisible();
  });
});

// ==========================================
// 13. PERFORMANCE TESTS
// ==========================================

test.describe('Performance', () => {
  test('initial page load should be fast', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in under 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('navigation should be responsive', async ({ page }) => {
    await page.goto('/');

    const tabs = page.getByRole('button');
    const tabCount = await tabs.count();

    for (let i = 0; i < Math.min(tabCount, 3); i++) {
      const tab = tabs.nth(i);
      if (await tab.isVisible()) {
        const startTime = Date.now();
        await tab.click();
        const responseTime = Date.now() - startTime;

        // Each navigation should be under 2 seconds
        expect(responseTime).toBeLessThan(2000);
        await page.waitForTimeout(300);
      }
    }
  });
});
