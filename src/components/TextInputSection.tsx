import React, { useState } from "react";

interface TextInputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  setApiResponse: (response: string) => void; // New prop to update API response
}

export default function TextInputSection({ inputText, setInputText, setApiResponse }: TextInputSectionProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle API call
  const handleSend = async () => {
    if (!inputText.trim()) return; // Prevent empty queries

    setLoading(true);
    setError(null);
    setApiResponse(""); // Clear previous response

    try {
      const response = await fetch(`http://127.0.0.1:8000/query/?query=${encodeURIComponent(inputText)}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      setApiResponse(data.response || "No response received."); // Update response in PdfViewerPage
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[15%] flex flex-col p-4 border-t shadow-md">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow p-3 text-lg border rounded shadow-sm"
          placeholder="Enter text..."
        />
        <button
          className="px-6 py-3 bg-green-500 text-white text-lg rounded shadow-md"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Display Error Message */}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
