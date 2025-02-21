import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

export interface PdfProps {
  src: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfReactPdf({ src }: PdfProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number }>({ width: 800, height: 1000 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Detects container size & adjusts PDF dimensions
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Maintain aspect ratio (ensures portrait/landscape are not cut off)
        if (pageDimensions.width > pageDimensions.height) {
          // Landscape PDF
          setPageDimensions({ width, height: (width / pageDimensions.width) * pageDimensions.height });
        } else {
          // Portrait PDF
          setPageDimensions({ width: width * 0.8, height: height * 0.9 });
        }
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [pageDimensions.width, pageDimensions.height]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onPageLoadSuccess({ width, height }: { width: number; height: number }) {
    setPageDimensions({ width, height });
  }

  function nextPage() {
    setPageNumber((v) => Math.min(numPages ?? 1, v + 1));
  }

  function prevPage() {
    setPageNumber((v) => Math.max(1, v - 1));
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
        <button
          onClick={nextPage}
          disabled={pageNumber >= (numPages ?? -1)}
          className="px-4 py-1 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>

      {/* PDF Viewer */}
      <div ref={containerRef} className="w-full h-full flex justify-center items-center">
        <Document
          file={src}
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full h-full flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            width={pageDimensions.width}
            height={pageDimensions.height}
            onLoadSuccess={onPageLoadSuccess}
          />
        </Document>
      </div>

      {/* Page Indicator */}
      <p className="pt-2 z-10 text-white">Page {pageNumber} of {numPages}</p>
    </div>
  );
}
