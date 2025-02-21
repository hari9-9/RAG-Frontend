import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

export interface PdfProps {
  src: string;
  pageNumber: number; // Page number from parent component
  setPageNumber: (page: number) => void; // Function to update page number
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfReactPdf({ src, pageNumber, setPageNumber }: PdfProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function prevPage() {
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
        <button
          onClick={nextPage}
          className="px-4 py-1 bg-gray-300 rounded"
        >
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
