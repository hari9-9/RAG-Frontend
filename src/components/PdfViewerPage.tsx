import { useState } from "react";
import PdfReactPdf from "./pdfView"; // Import your PDF component

export default function PdfViewerPage() {
  // Store the last read page for each PDF
  const [pageNumbers, setPageNumbers] = useState<{ pdf1: number; pdf2: number }>({
    pdf1: 1,
    pdf2: 1,
  });

  const [activePdf, setActivePdf] = useState<"pdf1" | "pdf2">("pdf1");
  const [inputText, setInputText] = useState("");

  // Handle PDF switch and store last read page
  const handleTabSwitch = (pdf: "pdf1" | "pdf2") => {
    setActivePdf(pdf);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Row 1: PDF Viewer + Notes Section */}
      <div className="flex w-full h-[85%]">
        {/* Column 1: PDF Viewer (80% width) */}
        <div className="w-[80%] flex flex-col p-4">
          {/* Tabs for PDF selection */}
          <div className="flex gap-2 pb-4">
            <button
              className={`px-6 py-2 text-lg rounded ${
                activePdf === "pdf1" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => handleTabSwitch("pdf1")}
            >
              PDF 1
            </button>
            <button
              className={`px-6 py-2 text-lg rounded ${
                activePdf === "pdf2" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => handleTabSwitch("pdf2")}
            >
              PDF 2
            </button>
          </div>

          {/* PDF Viewer (Expands Fully) */}
          <div className="flex-grow w-full h-full border shadow-lg overflow-scroll object-contain">
            <PdfReactPdf
              src={
                activePdf === "pdf1"
                  ? "src/assets/2023-conocophillips-aim-presentation.pdf"
                  : "src/assets/2024-conocophillips-proxy-statement.pdf"
              }
              pageNumber={pageNumbers[activePdf]} // Pass the last read page
              setPageNumber={(newPage) =>
                setPageNumbers((prev) => ({ ...prev, [activePdf]: newPage })) // Update page for the active PDF
              }
            />
          </div>
        </div>

        {/* Column 2: Notes Section (20% width) */}
        <div className="w-[20%] p-4">
          <textarea
            className="w-full h-full border p-3 text-lg rounded shadow-md"
            placeholder="Write notes here..."
          />
        </div>
      </div>

      {/* Row 2: Input Field + Send Button */}
      <div className="w-full h-[15%] flex items-center gap-4 p-4 border-t shadow-md">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow p-3 text-lg border rounded shadow-sm"
          placeholder="Enter text..."
        />
        <button className="px-6 py-3 bg-green-500 text-white text-lg rounded shadow-md">
          Send
        </button>
      </div>
    </div>
  );
}
