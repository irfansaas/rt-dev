import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Ensure autoTable is available on jsPDF instances
if (!jsPDF.API.autoTable && autoTable) {
  jsPDF.API.autoTable = function(...args) {
    return autoTable(this, ...args);
  };
}

/**
 * Generate a professionally designed Timeline Analysis PDF
 * with visual timeline capture using html2canvas
 */
export async function generateTimelinePDF(results, formData, scenarioName = 'Timeline Analysis', timelineElement = null) {
  const doc = new jsPDF('p', 'mm', 'letter');

  // Brand colors (RGB)
  const colors = {
    nerdio: [35, 156, 187],        // Eastern Blue - Primary
    nerdioDark: [15, 42, 56],      // Firefly - Dark
    success: [34, 197, 94],         // Green
    danger: [239, 68, 68],          // Red
    warning: [234, 179, 8],         // Yellow/Amber
    info: [59, 130, 246],           // Blue
    purple: [147, 51, 234],         // Purple
    dark: [31, 41, 55],             // Dark gray
    light: [243, 244, 246]          // Light gray
  };

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let currentY = margin;

  // Helper function to add new page
  const addPage = () => {
    doc.addPage();
    currentY = margin;
  };

  // Helper function to draw colored box with text
  const drawBox = (x, y, width, height, color, title, value, subtitle = null) => {
    doc.setFillColor(...color);
    try {
      doc.roundedRect(x, y, width, height, 3, 3, 'F');
    } catch(e) { doc.rect(x, y, width, height, 'F'); }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    try {
      doc.text(title, x + width / 2, y + 7, { align: 'center' });
    } catch(e) { /* skip */ }

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    try {
      doc.text(value, x + width / 2, y + 18, { align: 'center' });
    } catch(e) { /* skip */ }

    if (subtitle) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      try {
        doc.text(subtitle, x + width / 2, y + 24, { align: 'center' });
      } catch(e) { /* skip */ }
    }
  };

  // ============================================
  // PAGE 1: EXECUTIVE SUMMARY WITH VISUAL
  // ============================================

  // Header
  doc.setFillColor(...colors.nerdio);
  try {
    doc.rect(0, 0, pageWidth, 35, 'F');
  } catch(e) { /* skip */ }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('AVD MIGRATION TIMELINE', pageWidth / 2, 15, { align: 'center' });
  } catch(e) { /* skip */ }

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  try {
    doc.text(scenarioName, pageWidth / 2, 24, { align: 'center' });
  } catch(e) { /* skip */ }

  doc.setFontSize(9);
  try {
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 31, { align: 'center' });
  } catch(e) { /* skip */ }

  currentY = 42;

  // Feasibility Status Banner
  const delta = results.delta;
  const statusColor = delta >= 0 ? colors.success : delta >= -4 ? colors.warning : colors.danger;
  const statusText = delta >= 0 ? 'TIMELINE APPEARS FEASIBLE' :
                     delta >= -4 ? 'TIMELINE MAY BE TIGHT' :
                     'TIMELINE LIKELY NOT FEASIBLE';

  doc.setFillColor(...statusColor);
  try {
    doc.roundedRect(margin, currentY, pageWidth - 2 * margin, 20, 4, 4, 'F');
  } catch(e) { doc.rect(margin, currentY, pageWidth - 2 * margin, 20, 'F'); }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text(statusText, pageWidth / 2, currentY + 8, { align: 'center' });
  } catch(e) { /* skip */ }

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const statusDetail = delta >= 0
    ? `Estimated ~${delta.toFixed(1)} weeks buffer for unexpected issues`
    : `Estimated ~${Math.abs(delta).toFixed(1)} weeks short - may require scope adjustment`;
  try {
    doc.text(statusDetail, pageWidth / 2, currentY + 16, { align: 'center' });
  } catch(e) { /* skip */ }

  currentY += 27;

  // Three key metrics boxes
  const boxWidth = 55;
  const boxHeight = 28;
  const spacing = 8;
  const startX = (pageWidth - (3 * boxWidth + 2 * spacing)) / 2;

  // Weeks Required
  drawBox(startX, currentY, boxWidth, boxHeight, colors.info, 'EST. WEEKS REQUIRED', `~${results.weeksRequired}`, 'Based on complexity');

  // Weeks Available
  drawBox(startX + boxWidth + spacing, currentY, boxWidth, boxHeight, colors.purple, 'WEEKS AVAILABLE', `${results.weeksAvailable}`, 'Start to go-live');

  // Delta
  const deltaColor = delta >= 0 ? colors.success : delta >= -4 ? colors.warning : colors.danger;
  drawBox(startX + 2 * (boxWidth + spacing), currentY, boxWidth, boxHeight, deltaColor, 'EST. DELTA', `${delta > 0 ? '+' : ''}~${delta.toFixed(1)}`, delta >= 0 ? 'Buffer weeks' : 'Weeks short');

  currentY += boxHeight + 8;

  // Project Dates in a compact row
  doc.setTextColor(...colors.dark);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');

  const startDate = new Date(formData.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const goLiveDate = new Date(formData.goLiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  try {
    doc.text(`Start: ${startDate}`, margin, currentY + 5);
    doc.text(`Go-Live Target: ${goLiveDate}`, pageWidth / 2, currentY + 5);
    doc.text(`Complexity Score: ${results.totalScore} pts`, pageWidth - margin, currentY + 5, { align: 'right' });
  } catch(e) { /* skip */ }

  currentY += 12;

  // ============================================
  // VISUAL TIMELINE CAPTURE (if element provided)
  // ============================================
  if (timelineElement) {
    try {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(timelineElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');

      // Calculate image dimensions to fit on page
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      // Check if we need a new page for the image
      if (currentY + imgHeight > pageHeight - 20) {
        // Scale down if too tall
        const maxHeight = pageHeight - currentY - 20;
        if (imgHeight > maxHeight) {
          const scale = maxHeight / imgHeight;
          const scaledWidth = imgWidth * scale;
          const scaledHeight = maxHeight;
          const xOffset = (pageWidth - scaledWidth) / 2;
          doc.addImage(imgData, 'PNG', xOffset, currentY, scaledWidth, scaledHeight);
          currentY += scaledHeight + 5;
        } else {
          doc.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
          currentY += imgHeight + 5;
        }
      } else {
        doc.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 5;
      }
    } catch (error) {
      console.error('Failed to capture timeline visual:', error);
      // Fall back to text-based timeline
      currentY = renderTextTimeline(doc, results, currentY, margin, pageWidth, colors);
    }
  } else {
    // No element provided, use text-based timeline
    currentY = renderTextTimeline(doc, results, currentY, margin, pageWidth, colors);
  }

  // ============================================
  // PAGE 2: COMPLEXITY BREAKDOWN
  // ============================================
  addPage();

  // Page header
  doc.setFillColor(...colors.nerdioDark);
  try {
    doc.rect(0, 0, pageWidth, 18, 'F');
  } catch(e) { /* skip */ }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('COMPLEXITY ASSESSMENT BREAKDOWN', margin, 12);
  } catch(e) { /* skip */ }

  currentY = 25;

  // Group breakdown by category
  const categories = ['Project Scope', 'Tech Stack', 'Governance', 'Security', 'Applications'];

  categories.forEach((category, catIdx) => {
    const categoryItems = results.breakdown.filter(item => item.category === category);
    if (categoryItems.length === 0) return;

    const categoryTotal = categoryItems.reduce((sum, item) => sum + item.score, 0);

    // Category header
    doc.setTextColor(...colors.dark);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    try {
      doc.text(`${category}`, margin, currentY);
      doc.text(`${categoryTotal} points`, pageWidth - margin, currentY, { align: 'right' });
    } catch(e) { /* skip */ }

    currentY += 4;

    // Category items table
    const catData = categoryItems.map(item => [
      item.name,
      item.value,
      item.weight,
      `${item.score} pts`
    ]);

    doc.autoTable({
      startY: currentY,
      head: [['Factor', 'Value', 'Weight', 'Score']],
      body: catData,
      headStyles: {
        fillColor: colors.nerdio,
        textColor: [255, 255, 255],
        fontSize: 8
      },
      bodyStyles: {
        textColor: colors.dark,
        fontSize: 8
      },
      columnStyles: {
        0: { cellWidth: 65 },
        1: { cellWidth: 22, halign: 'center' },
        2: { cellWidth: 22, halign: 'center' },
        3: { cellWidth: 25, halign: 'center', fontStyle: 'bold' }
      },
      margin: { left: margin, right: margin },
      alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // Check if we need a new page
    if (currentY > pageHeight - 45 && catIdx < categories.length - 1) {
      addPage();
      currentY = 25;
    }
  });

  // Total score box
  doc.setFillColor(...colors.nerdio);
  try {
    doc.roundedRect(margin, currentY, pageWidth - 2 * margin, 18, 3, 3, 'F');
  } catch(e) { doc.rect(margin, currentY, pageWidth - 2 * margin, 18, 'F'); }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('TOTAL COMPLEXITY SCORE', margin + 8, currentY + 12);
    doc.text(`${results.totalScore} points`, pageWidth - margin - 8, currentY + 12, { align: 'right' });
  } catch(e) { /* skip */ }

  currentY += 25;

  // ============================================
  // RECOMMENDATIONS SECTION
  // ============================================

  // Check if we need new page for recommendations
  if (currentY > pageHeight - 60) {
    addPage();
    currentY = 25;
  }

  doc.setTextColor(...colors.dark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('RECOMMENDATIONS', margin, currentY);
  } catch(e) { /* skip */ }

  currentY += 6;

  // Recommendations
  if (results.recommendations && results.recommendations.length > 0) {
    results.recommendations.slice(0, 5).forEach((rec, idx) => {
      const recColor = rec.type === 'critical' ? colors.danger :
                       rec.type === 'warning' ? colors.warning :
                       rec.type === 'success' ? colors.success : colors.info;

      // Check for page break
      if (currentY > pageHeight - 25) {
        addPage();
        currentY = 25;
      }

      // Recommendation indicator
      doc.setFillColor(...recColor);
      try {
        doc.roundedRect(margin, currentY, 3, 14, 1, 1, 'F');
      } catch(e) { doc.rect(margin, currentY, 3, 14, 'F'); }

      doc.setTextColor(...colors.dark);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      const recLines = doc.splitTextToSize(rec.text, pageWidth - 2 * margin - 10);
      try {
        doc.text(recLines, margin + 6, currentY + 5);
      } catch(e) { /* skip */ }

      currentY += Math.max(18, recLines.length * 4 + 10);
    });
  }

  // ============================================
  // NERDIO VS NATIVE COMPARISON
  // ============================================

  if (currentY > pageHeight - 55) {
    addPage();
    currentY = 25;
  }

  currentY += 5;

  doc.setTextColor(...colors.dark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('Timeline Comparison: Nerdio vs Native Azure', margin, currentY);
  } catch(e) { /* skip */ }

  currentY += 6;

  // Comparison boxes
  const compBoxWidth = (pageWidth - 2 * margin - 8) / 2;
  const compBoxHeight = 38;

  // With Nerdio
  doc.setFillColor(...colors.success);
  try {
    doc.roundedRect(margin, currentY, compBoxWidth, compBoxHeight, 3, 3, 'F');
  } catch(e) { doc.rect(margin, currentY, compBoxWidth, compBoxHeight, 'F'); }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('With Nerdio Manager', margin + compBoxWidth / 2, currentY + 8, { align: 'center' });
  } catch(e) { /* skip */ }

  doc.setFontSize(20);
  try {
    doc.text(`~${results.weeksRequired} weeks`, margin + compBoxWidth / 2, currentY + 22, { align: 'center' });
  } catch(e) { /* skip */ }

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  try {
    doc.text('Automated & optimized', margin + compBoxWidth / 2, currentY + 32, { align: 'center' });
  } catch(e) { /* skip */ }

  // Native Azure
  const nativeWeeks = Math.round(results.weeksRequired * 1.4);
  doc.setFillColor(...colors.warning);
  try {
    doc.roundedRect(margin + compBoxWidth + 8, currentY, compBoxWidth, compBoxHeight, 3, 3, 'F');
  } catch(e) { doc.rect(margin + compBoxWidth + 8, currentY, compBoxWidth, compBoxHeight, 'F'); }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('Native Azure Only', margin + compBoxWidth + 8 + compBoxWidth / 2, currentY + 8, { align: 'center' });
  } catch(e) { /* skip */ }

  doc.setFontSize(20);
  try {
    doc.text(`~${nativeWeeks} weeks`, margin + compBoxWidth + 8 + compBoxWidth / 2, currentY + 22, { align: 'center' });
  } catch(e) { /* skip */ }

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  try {
    doc.text('Manual configuration required', margin + compBoxWidth + 8 + compBoxWidth / 2, currentY + 32, { align: 'center' });
  } catch(e) { /* skip */ }

  // Footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    try {
      doc.text('Nerdio Value Engineering - Timeline Calculator | getnerdio.com', pageWidth / 2, pageHeight - 8, { align: 'center' });
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    } catch(e) { /* skip */ }
  }

  return doc;
}

/**
 * Render text-based timeline (fallback when visual capture fails)
 */
function renderTextTimeline(doc, results, currentY, margin, pageWidth, colors) {
  doc.setTextColor(...colors.dark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  try {
    doc.text('Estimated Project Phases:', margin, currentY);
  } catch(e) { /* skip */ }

  currentY += 4;

  const phaseData = results.phases.map((phase, idx) => {
    const overlap = phase.overlapsWithPrevious ? `~${phase.overlapWeeks.toFixed(1)}w overlap` : '-';
    return [
      phase.name,
      `W${Math.round(phase.startWeek)}-${Math.round(phase.endWeek)}`,
      `~${phase.weeks}w`,
      overlap
    ];
  });

  doc.autoTable({
    startY: currentY,
    head: [['Phase', 'Timeline', 'Duration', 'Overlap']],
    body: phaseData,
    headStyles: {
      fillColor: colors.nerdioDark,
      textColor: [255, 255, 255],
      fontSize: 9
    },
    bodyStyles: {
      textColor: colors.dark,
      fontSize: 8
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 28, halign: 'center' },
      2: { cellWidth: 25, halign: 'center' },
      3: { cellWidth: 30, halign: 'center', textColor: colors.success }
    },
    margin: { left: margin, right: margin },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  return doc.lastAutoTable.finalY + 8;
}

/**
 * Export timeline to PDF and trigger download
 * @param {Object} results - The calculation results
 * @param {Object} formData - The form data
 * @param {string} scenarioName - Name for the scenario
 * @param {HTMLElement} timelineElement - Optional DOM element to capture as image
 */
export async function exportTimelinePDF(results, formData, scenarioName = 'Timeline Analysis', timelineElement = null, returnBlob = false) {
  const doc = await generateTimelinePDF(results, formData, scenarioName, timelineElement);
  const filename = `AVD_Timeline_${new Date().toISOString().split('T')[0]}.pdf`;

  if (returnBlob) {
    // Return both the blob and filename for cloud upload
    const blob = doc.output('blob');
    doc.save(filename); // Still save locally
    return { blob, filename };
  }

  doc.save(filename);
  return filename;
}
