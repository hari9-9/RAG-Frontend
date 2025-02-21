import PdfReactPdf from "./pdfView";

export default function PageLayout() {
    return (
      <div className="flex flex-col h-screen w-full p-4">
        {/* First Row */}
        <div className="flex flex-1 w-full gap-4">
          <div className="w-[40%] h-full bg-gray-200 p-4 flex items-center justify-center rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <PdfReactPdf src="src/assets/2023-conocophillips-aim-presentation.pdf" />
            </div>
          </div>
          <div className="w-[40%] h-full bg-gray-300 p-4 flex items-center justify-center rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <PdfReactPdf src="src/assets/2023-conocophillips-aim-presentation.pdf" />
            </div>
          </div>
          <div className="w-[20%] h-full bg-gray-400 p-4 flex items-center justify-center rounded-lg">
            Column 3
          </div>
        </div>
  
        {/* Second Row */}
        <div className="flex flex-1 w-full items-center justify-center">
          <div className="flex gap-2 bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Enter text..."
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
}
