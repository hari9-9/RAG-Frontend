import { useState } from "react";
import PdfReactPdf from "./pdfView"; // Import your PDF component

export default function PdfViewerPage() {
  const [activePdf, setActivePdf] = useState<"pdf1" | "pdf2">("pdf1");
  const [inputText, setInputText] = useState("");

  return (
    <div className="w-full h-screen flex flex-col p-4">
      {/* Row 1: PDF Viewer + Text Box */}
      <div className="flex w-full h-[70%]">
        {/* Column 1: PDF Viewer (75% width) */}
        <div className="w-[75%] border-r p-4">
          {/* Tabs for PDF selection */}
          <div className="flex gap-2 pb-2">
            <button
              className={`px-4 py-2 rounded ${
                activePdf === "pdf1" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setActivePdf("pdf1")}
            >
              PDF 1
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePdf === "pdf2" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setActivePdf("pdf2")}
            >
              PDF 2
            </button>
          </div>

          {/* PDF Viewer */}
          <PdfReactPdf src={activePdf === "pdf1" ? "src/assets/2023-conocophillips-aim-presentation.pdf" : "src/assets/2024-conocophillips-proxy-statement.pdf"} />
        </div>

        {/* Column 2: Text Box (25% width) */}
        <div className="w-[25%] p-4">
          <textarea
            className="w-full h-full border p-2 rounded"
            placeholder="Write notes here..."
          />
        </div>
      </div>

      {/* Row 2: Input Field + Send Button */}
      <div className="w-full flex items-center gap-4 p-4 border-t">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter text..."
        />
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
