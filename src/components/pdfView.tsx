/**
 * @file PdfReactPdf.tsx
 * @description A React component for rendering a PDF file using the `react-pdf` library.
 *              It provides navigation controls to move between pages.
 * @module PdfReactPdf
 */

import React from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useRef } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

/**
 * Defines the properties expected by the PdfReactPdf component.
 *
 * @interface PdfProps
 * @property {string} src - The source URL or path of the PDF file.
 * @property {number} pageNumber - The current page number being displayed.
 * @property {(page: number) => void} setPageNumber - Function to update the current page number.
 */
export interface PdfProps {
  src: string;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

// Configure pdf.js worker source to enable rendering of PDFs.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * PdfReactPdf Component
 *
 * @description This component displays a PDF file with page navigation.
 *
 * @param {PdfProps} props - The component properties.
 * @returns {JSX.Element} A React component displaying a paginated PDF viewer.
 */
export default function PdfReactPdf({ src, pageNumber, setPageNumber }: PdfProps) {
  // Reference to the container element for dynamic width calculations.
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Increments the page number to navigate to the next page.
   */
  function nextPage(): void {
    setPageNumber(pageNumber + 1);
  }

  /**
   * Decrements the page number to navigate to the previous page.
   * Ensures that the page number does not go below 1.
   */
  function prevPage(): void {
    setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1);
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Navigation buttons */}
      <div className="flex gap-4 pb-2">
        <button
          onClick={prevPage}
          disabled={pageNumber <= 1}
          className="px-4 py-1 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button onClick={nextPage} className="px-4 py-1 bg-gray-300 rounded">
          Next
        </button>
      </div>

      {/* PDF Viewer */}
      <div ref={containerRef} className="w-full h-full flex justify-center items-center">
        <Document file={src} className="w-full h-full flex justify-center">
          <Page pageNumber={pageNumber} width={containerRef.current?.clientWidth ?? 800} />
        </Document>
      </div>

      {/* Page Indicator */}
      <p className="pt-2 text-black">Page {pageNumber}</p>
    </div>
  );
}
