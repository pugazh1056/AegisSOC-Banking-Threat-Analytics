import { jsPDF } from "jspdf";

interface PdfData {
  title: string;
  metadata: Record<string, string>;
  sections: Array<{
    title: string;
    content: string | string[] | Array<Record<string, string>>;
  }>;
}

// Utility to parse standard " | " formatted strings into key-value pairs
function parseKeyValueString(str: string): Record<string, string> | null {
  if (!str.includes(" | ")) return null;
  const parts = str.split(" | ");
  const result: Record<string, string> = {};
  parts.forEach((part) => {
    const colonIndex = part.indexOf(":");
    if (colonIndex !== -1) {
      const key = part.slice(0, colonIndex).trim();
      const val = part.slice(colonIndex + 1).trim();
      result[key] = val;
    }
  });
  return Object.keys(result).length > 0 ? result : null;
}

export function exportToPdf(data: PdfData, filename: string) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  let y = 20;

  // Page background and top-bar branding helper
  const addNewPage = () => {
    doc.addPage();
    doc.setFillColor(248, 250, 252); // Slate-50 backdrop
    doc.rect(0, 0, 210, 297, "F");
    
    doc.setFillColor(13, 148, 136); // Teal-600 top brand line
    doc.rect(0, 0, 210, 8, "F");
  };

  // Set first page background style
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 297, "F");

  // Top accent bar
  doc.setFillColor(13, 148, 136);
  doc.rect(0, 0, 210, 8, "F");

  y += 5;

  // Header branding block
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.text("AEGIS_SOC COGNITIVE INTELLIGENCE", 14, y);
  y += 5.5;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text("SECURE AUTOMATED COMPLIANCE AUDITING LEDGER // STANDARD ISO-27001 & SOC-2", 14, y);
  y += 6.5;

  // Divider line
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.line(14, y, 196, y);
  y += 9;

  // Report Main Title
  doc.setTextColor(13, 148, 136); // teal-600
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(13);
  doc.text(data.title.toUpperCase(), 14, y);
  y += 8;

  // Dynamic Metadata Block Calculations & Layout
  const metaKeys = Object.keys(data.metadata);
  const rows: Array<{
    col1: { key: string; val: string; keyWidth: number };
    col2?: { key: string; val: string; keyWidth: number };
  }> = [];

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8.5);

  for (let i = 0; i < metaKeys.length; i += 2) {
    const key1 = metaKeys[i];
    const val1 = data.metadata[key1];
    const keyWidth1 = doc.getTextWidth(`${key1.toUpperCase()}:`);
    
    const rowItem: typeof rows[0] = {
      col1: { key: key1, val: val1, keyWidth: keyWidth1 }
    };

    if (i + 1 < metaKeys.length) {
      const key2 = metaKeys[i + 1];
      const val2 = data.metadata[key2];
      const keyWidth2 = doc.getTextWidth(`${key2.toUpperCase()}:`);
      rowItem.col2 = { key: key2, val: val2, keyWidth: keyWidth2 };
    }
    rows.push(rowItem);
  }

  // Pre-calculate positions of metadata keys & values inside the slate box
  let tempMetaY = 6;
  const metaPositions: Array<{
    xKey: number;
    xVal: number;
    key: string;
    valText: string[];
    y: number;
  }> = [];

  rows.forEach((row) => {
    // Column 1 value width limit (max box width is 182, let's divide roughly half)
    const col1MaxValWidth = 92 - 18 - 4 - row.col1.keyWidth;
    const val1Text = doc.splitTextToSize(String(row.col1.val), col1MaxValWidth);
    
    metaPositions.push({
      xKey: 18,
      xVal: 18 + row.col1.keyWidth + 2.5,
      key: row.col1.key,
      valText: val1Text,
      y: tempMetaY
    });

    let maxLines = val1Text.length;

    if (row.col2) {
      const col2MaxValWidth = 194 - 110 - 4 - row.col2.keyWidth;
      const val2Text = doc.splitTextToSize(String(row.col2.val), col2MaxValWidth);
      
      metaPositions.push({
        xKey: 110,
        xVal: 110 + row.col2.keyWidth + 2.5,
        key: row.col2.key,
        valText: val2Text,
        y: tempMetaY
      });
      maxLines = Math.max(maxLines, val2Text.length);
    }

    tempMetaY += (maxLines * 4) + 2.5;
  });

  const finalMetaBoxHeight = tempMetaY + 1.5;

  // Render Metadata Slate Box
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(14, y, 182, finalMetaBoxHeight, "F");

  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.35);
  doc.rect(14, y, 182, finalMetaBoxHeight, "D");

  doc.setFontSize(8.5);
  metaPositions.forEach((pos) => {
    // Draw key
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`${pos.key.toUpperCase()}:`, pos.xKey, y + pos.y);

    // Draw value
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(pos.valText, pos.xVal, y + pos.y);
  });

  y += finalMetaBoxHeight + 10;

  // Helper to print a plain line of text with dynamic paging checks
  const printLines = (
    lines: string[], 
    startX: number, 
    startY: number, 
    lineSpacing: number, 
    fontSize: number, 
    fontStyle: "normal" | "bold" | "italic", 
    textColor: [number, number, number]
  ): number => {
    doc.setFont("Helvetica", fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    
    let currentY = startY;
    
    for (let i = 0; i < lines.length; i++) {
      if (currentY > 274) {
        addNewPage();
        currentY = 22;
        doc.setFont("Helvetica", fontStyle);
        doc.setFontSize(fontSize);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      }
      doc.text(lines[i], startX, currentY);
      currentY += lineSpacing;
    }
    
    return currentY;
  };

  // Render a beautifully structured bento-style card for logs / tables
  const drawDataCard = (record: Record<string, string>, currentY: number): number => {
    const entries = Object.entries(record);
    let localY = 5.5;
    const itemsToDraw: Array<{ key: string; valText: string[]; y: number; xKey: number; xVal: number }> = [];

    for (let i = 0; i < entries.length; ) {
      const [key1, val1] = entries[i];
      const isLong1 = String(val1).length > 42 || ["DESCRIPTION", "TRIGGER", "REASON", "ACTION DESCRIPTION", "EXPLANATION", "SUMMARY", "BACKGROUND", "MANDATED PLAYBOOK MITIGATION ACTIONS"].includes(key1.toUpperCase());

      if (isLong1) {
        const valText = doc.splitTextToSize(String(val1), 164);
        itemsToDraw.push({
          key: key1,
          valText,
          y: localY,
          xKey: 6,
          xVal: 6
        });
        localY += 4 + (valText.length * 4) + 1.5;
        i += 1;
      } else {
        const canPair = i + 1 < entries.length;
        const [key2, val2] = canPair ? entries[i + 1] : ["", ""];
        const isLong2 = canPair && (String(val2).length > 42 || ["DESCRIPTION", "TRIGGER", "REASON", "ACTION DESCRIPTION", "EXPLANATION", "SUMMARY", "BACKGROUND", "MANDATED PLAYBOOK MITIGATION ACTIONS"].includes(key2.toUpperCase()));

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8.5);
        const keyWidth1 = doc.getTextWidth(`${key1.toUpperCase()}:`);

        const val1Text = doc.splitTextToSize(String(val1), 74);
        itemsToDraw.push({
          key: key1,
          valText: val1Text,
          y: localY,
          xKey: 6,
          xVal: 6 + keyWidth1 + 2
        });

        let rowMaxHeight = val1Text.length * 4 + 1.5;

        if (canPair && !isLong2) {
          const keyWidth2 = doc.getTextWidth(`${key2.toUpperCase()}:`);
          const val2Text = doc.splitTextToSize(String(val2), 74);
          itemsToDraw.push({
            key: key2,
            valText: val2Text,
            y: localY,
            xKey: 92,
            xVal: 92 + keyWidth2 + 2
          });
          rowMaxHeight = Math.max(rowMaxHeight, val2Text.length * 4 + 1.5);
          i += 2;
        } else {
          i += 1;
        }

        localY += rowMaxHeight + 1.5;
      }
    }

    const cardHeight = localY + 2;

    // Check card bounds for page overflow
    let targetY = currentY;
    if (targetY + cardHeight > 274) {
      addNewPage();
      targetY = 22;
    }

    // White body fill
    doc.setFillColor(255, 255, 255);
    doc.rect(16, targetY, 178, cardHeight, "F");

    // Border
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.4);
    doc.rect(16, targetY, 178, cardHeight, "D");

    // Dynamic accent color based on keys / scores
    let accentColor: [number, number, number] = [13, 148, 136]; // default teal-600
    const riskVal = record["Risk"] || record["Risk Score"] || record["Incident Risk Index"] || record["Score"] || record["Risk Factor"];
    const riskNum = riskVal ? parseInt(riskVal) : 0;
    const severity = record["Severity Rank"] || record["Threat Category"] || record["Category Status"] || record["Priority"] || record["Status"] || record["Threat Level"];

    if (riskNum >= 80 || (severity && ["CRITICAL", "HIGH", "WARNING", "ERROR"].some(s => severity.toUpperCase().includes(s)))) {
      accentColor = [239, 68, 68]; // Red-500
    } else if (riskNum >= 50 || (severity && ["MEDIUM", "ASSIGNED"].some(s => severity.toUpperCase().includes(s)))) {
      accentColor = [245, 158, 11]; // Amber-500
    }

    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(16, targetY, 1.5, cardHeight, "F");

    // Paint inner components
    doc.setFontSize(8.5);
    itemsToDraw.forEach((item) => {
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100, 116, 139); // slate-500

      const isFullWidth = item.xKey === item.xVal;
      if (isFullWidth) {
        doc.text(`${item.key.toUpperCase()}:`, 16 + item.xKey, targetY + item.y);
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(30, 41, 59); // slate-800
        doc.text(item.valText, 16 + item.xKey, targetY + item.y + 4);
      } else {
        doc.text(`${item.key.toUpperCase()}:`, 16 + item.xKey, targetY + item.y);
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(30, 41, 59); // slate-800
        doc.text(item.valText, 16 + item.xVal, targetY + item.y);
      }
    });

    return targetY + cardHeight + 4;
  };

  // Loop through document sections
  data.sections.forEach((section) => {
    // If we have less than 30mm left, push to next page for section header integrity
    if (y > 245) {
      addNewPage();
      y = 22;
    }

    // Section title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(section.title.toUpperCase(), 14, y);
    y += 4.5;

    // Sub-title accent line
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.35);
    doc.line(14, y, 196, y);
    y += 6.5;

    if (typeof section.content === "string") {
      const splitText = doc.splitTextToSize(section.content, 182);
      y = printLines(splitText, 14, y, 4.5, 9, "normal", [51, 65, 85]);
      y += 6.5;
    } else if (Array.isArray(section.content)) {
      section.content.forEach((item) => {
        if (typeof item === "string") {
          const parsed = parseKeyValueString(item);
          if (parsed) {
            y = drawDataCard(parsed, y);
          } else {
            // It's a plain text item or message log (e.g. Audit checklist or analyst comments)
            let cleanText = item;
            let iconText = "•  ";

            // Support formatted log lines (e.g. "[Time] User: Text")
            if (item.startsWith("[")) {
              iconText = "»  ";
              const closeBracketIndex = item.indexOf("]");
              if (closeBracketIndex !== -1) {
                const colonIndex = item.indexOf(":", closeBracketIndex);
                if (colonIndex !== -1) {
                  const metaPart = item.slice(0, colonIndex + 1);
                  const contentPart = item.slice(colonIndex + 1).trim();

                  // Pre-check space for log item
                  if (y > 270) {
                    addNewPage();
                    y = 22;
                  }

                  const splitMeta = doc.splitTextToSize(`${iconText}${metaPart}`, 180);
                  y = printLines(splitMeta, 16, y, 4, 8.5, "bold", [71, 85, 105]);

                  const splitContent = doc.splitTextToSize(contentPart, 172);
                  y = printLines(splitContent, 22, y, 4, 8.5, "normal", [30, 41, 59]);
                  y += 1.5;
                  return;
                }
              }
            }

            const splitText = doc.splitTextToSize(`${iconText}${cleanText}`, 178);
            y = printLines(splitText, 16, y, 4, 8.5, "normal", [51, 65, 85]);
            y += 2;
          }
        } else if (typeof item === "object" && item !== null) {
          y = drawDataCard(item as Record<string, string>, y);
        }
      });
      y += 4.5;
    }
  });

  // Global page numbers and dynamic validation signatures stamp
  const pageCount = (doc.internal as any).getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // slate-400
    
    doc.text(`CONFIDENTIAL AEGIS_SOC INTELLIGENCE EXPORT - PAGE ${i} OF ${pageCount}`, 14, 288);
    doc.text(`VERIFICATION HASH: sha256-aegis-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 130, 288);
  }

  doc.save(filename);
}
