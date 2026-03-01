export function downloadReportPDF(filename = "laporan") {
  // Simple cross-platform PDF export trigger using the browser's print dialog.
  // Users can choose "Save as PDF" from print options.
  // Filename is set using document.title for convenience.
  const prevTitle = document.title;
  document.title = filename;
  window.print();
  document.title = prevTitle;
}
