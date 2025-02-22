// PdfViewerPage.tsx
import { useState } from "react";
import PdfReactPdf from "./pdfView";
import TextInputSection from "./TextInputSection";

// Define the type for each source
export interface Source {
  text: string;
  source: string; // PDF file name (e.g. "2024-conocophillips-proxy-statement.pdf")
  page: number;
}

// Define the API response type
export interface ApiData {
  response: string;
  sources: Source[];
}

// Mapping between PDF file names and our internal keys
const pdfMapping: Record<string, "pdf1" | "pdf2"> = {
  "2023-conocophillips-aim-presentation.pdf": "pdf1",
  "2024-conocophillips-proxy-statement.pdf": "pdf2",
};

export default function PdfViewerPage() {
  // Store the last read page for each PDF
  const [pageNumbers, setPageNumbers] = useState<{ pdf1: number; pdf2: number }>({
    pdf1: 1,
    pdf2: 1,
  });

  const [activePdf, setActivePdf] = useState<"pdf1" | "pdf2">("pdf1");
  const [inputText, setInputText] = useState("");
  const [apiData, setApiData] = useState<ApiData | null>(null);

  // Handle PDF switch and store last read page
  const handleTabSwitch = (pdf: "pdf1" | "pdf2") => {
    setActivePdf(pdf);
  };

  // When a source link is clicked, switch to the correct PDF and page
  const handleSourceClick = (source: Source) => {
    const pdfKey = pdfMapping[source.source];
    if (pdfKey) {
      setActivePdf(pdfKey);
      setPageNumbers((prev) => ({ ...prev, [pdfKey]: source.page }));
    }
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
              pageNumber={pageNumbers[activePdf]}
              setPageNumber={(newPage) =>
                setPageNumbers((prev) => ({ ...prev, [activePdf]: newPage }))
              }
            />
          </div>
        </div>

        {/* Column 2: Notes Section (20% width) */}
        <div className="w-[20%] p-4 border-l flex flex-col">
          <div className="flex-grow border p-3 text-lg rounded shadow-md bg-gray-100 overflow-y-auto whitespace-pre-wrap">
            {apiData ? apiData.response.replace(/\\n/g, "\n") : "Waiting for response..."}
          </div>
          {/* Render source links if available */}
          {apiData && apiData.sources.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xl font-semibold pb-2">Sources:</h3>
              <ul className="list-disc pl-5">
                {apiData.sources.map((src, index) => (
                  <li key={index}>
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleSourceClick(src)}
                    >
                      {src.source} - Page {src.page}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Separate Component for Input */}
      <TextInputSection
        inputText={inputText}
        setInputText={setInputText}
        setApiData={setApiData}
      />
    </div>
  );
}
