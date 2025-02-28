/**
 * @file PdfViewerPage.tsx
 * @description A React component that provides a PDF viewer with interactive tab switching,
 *              API-driven text input, and source-based page navigation.
 * @module PdfViewerPage
 */
import React from "react";
import { useState } from "react";
import PdfReactPdf from "./pdfView";
import TextInputSection from "./TextInputSection";

/**
 * Represents a source entry from the API response.
 *
 * @interface Source
 * @property {string} text - The extracted text from the PDF source.
 * @property {string} source - The name of the PDF file (e.g., "2024-conocophillips-proxy-statement.pdf").
 * @property {number} page - The page number associated with the text.
 */
export interface Source {
  text: string;
  source: string;
  page: number;
}

/**
 * Defines the structure of the API response data.
 *
 * @interface ApiData
 * @property {string} response - The API's response text.
 * @property {Source[]} sources - A list of sources referenced in the response.
 */
export interface ApiData {
  response: string;
  sources: Source[];
}

// Mapping between actual PDF file names and internal keys for easy reference.
const pdfMapping: Record<string, "pdf1" | "pdf2"> = {
  "2023-conocophillips-aim-presentation.pdf": "pdf1",
  "2024-conocophillips-proxy-statement.pdf": "pdf2",
};

/**
 * PdfViewerPage Component
 *
 * @description A page that displays a PDF viewer with tab-based navigation, stores
 *              last read pages, and integrates an API-driven text input section.
 *
 * @returns {JSX.Element} A React component providing a PDF viewer with interactive features.
 */
export default function PdfViewerPage() {
  // State to track the last viewed page for each PDF.
  const [pageNumbers, setPageNumbers] = useState<{ pdf1: number; pdf2: number }>({
    pdf1: 1,
    pdf2: 1,
  });

  // State to track the currently active PDF.
  const [activePdf, setActivePdf] = useState<"pdf1" | "pdf2">("pdf1");

  // State for storing user input text.
  const [inputText, setInputText] = useState("");

  // State for storing API response data.
  const [apiData, setApiData] = useState<ApiData | null>(null);

  /**
   * Handles switching between PDFs while maintaining the last viewed page.
   *
   * @param {"pdf1" | "pdf2"} pdf - The identifier for the selected PDF.
   */
  const handleTabSwitch = (pdf: "pdf1" | "pdf2"): void => {
    setActivePdf(pdf);
  };

  /**
   * Handles navigation to a specific source in the PDF.
   * Updates the active PDF and sets the corresponding page number.
   *
   * @param {Source} source - The source reference containing the PDF name and page number.
   */
  const handleSourceClick = (source: Source): void => {
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
                  ? "/2023-conocophillips-aim-presentation.pdf"
                  : "/2024-conocophillips-proxy-statement.pdf"
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