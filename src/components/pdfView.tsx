import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

export interface PdfProps {
    src: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfReactPdf({ src }: PdfProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function nextPage() {
    setPageNumber((v) => Math.min(numPages ?? 1, v + 1));
  }

  function prevPage() {
    setPageNumber((v) => Math.max(1, v - 1));
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex gap-4 pb-2">
        <button onClick={prevPage} disabled={pageNumber <= 1} className="px-4 py-1 bg-gray-300 rounded">Previous</button>
        <button onClick={nextPage} disabled={pageNumber >= (numPages ?? -1)} className="px-4 py-1 bg-gray-300 rounded">Next</button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Document
          file={src}
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full h-full flex justify-center"
        >
          <Page pageNumber={pageNumber} width={400} />
        </Document>
      </div>
      <p className="pt-2">Page {pageNumber} of {numPages}</p>
    </div>
  );
}
