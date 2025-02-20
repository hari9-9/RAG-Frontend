export default function PageLayout() {
    return (
      <div className="flex flex-col h-screen p-4">
        {/* First Row */}
        <div className="flex flex-1 gap-4">
          <div className="flex-1 bg-gray-200 p-4 flex items-center justify-center rounded-lg">Column 1</div>
          <div className="flex-1 bg-gray-300 p-4 flex items-center justify-center rounded-lg">Column 2</div>
          <div className="flex-1 bg-gray-400 p-4 flex items-center justify-center rounded-lg">Column 3</div>
        </div>
  
        {/* Second Row */}
        <div className="flex flex-1 items-center justify-center">
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
  