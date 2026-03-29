import { useState, useRef, useEffect } from 'react';

export default function ExportMenu({ articles, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxLineWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      doc.setFontSize(20);
      doc.setTextColor(16, 185, 129);
      doc.text('Thuthan', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text('Renewable Energy News Aggregator', margin, yPosition);
      yPosition += 5;
      
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`, margin, yPosition);
      yPosition += 15;

      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 15;

      articles.slice(0, 20).forEach((article, index) => {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = margin;
        }

        doc.setFontSize(12);
        doc.setTextColor(30, 41, 59);
        const titleLines = doc.splitTextToSize(`${index + 1}. ${article.title}`, maxLineWidth);
        if (yPosition + titleLines.length * 6 > pageHeight - 30) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(titleLines, margin, yPosition);
        yPosition += titleLines.length * 6 + 2;

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        const descLines = doc.splitTextToSize(article.description || 'No description', maxLineWidth);
        doc.text(descLines.slice(0, 2), margin, yPosition);
        yPosition += Math.min(descLines.length, 2) * 5 + 2;

        doc.setFontSize(8);
        doc.setTextColor(16, 185, 129);
        doc.text(`Source: ${article.source} | Category: ${article.category}`, margin, yPosition);
        yPosition += 12;
      });

      doc.save(`thuthan-news-${new Date().toISOString().split('T')[0]}.pdf`);
      setIsOpen(false);
      onSuccess && onSuccess('PDF');
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={articles.length === 0 || isExporting}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="hidden sm:inline">Export PDF</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-fadeIn">
          <div className="p-2">
            <p className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Export Options
            </p>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-left text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg transition-colors duration-150 disabled:opacity-50"
            >
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Export as PDF</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Download formatted document</p>
              </div>
            </button>
          </div>
          <div className="px-2 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
              {articles.length} articles available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
