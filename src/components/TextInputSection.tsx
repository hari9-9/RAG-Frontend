/**
 * @file TextInputSection.tsx
 * @description A React component that provides a text input field for user queries,
 *              sends the input to an API, and updates the response data.
 * @module TextInputSection
 */

import React, { useState } from "react";
import { ApiData } from "./PdfViewerPage";

/**
 * Defines the properties expected by the TextInputSection component.
 *
 * @interface TextInputSectionProps
 * @property {string} inputText - The user input text.
 * @property {(text: string) => void} setInputText - Function to update the input text state.
 * @property {(data: ApiData) => void} setApiData - Function to update the API response data state.
 */
interface TextInputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  setApiData: (data: ApiData) => void;
}

/**
 * TextInputSection Component
 *
 * @description A component that provides a user input field to send queries to an API.
 *              Displays a loading state during the API call and handles errors.
 *
 * @param {TextInputSectionProps} props - The component properties.
 * @returns {JSX.Element} A text input field with a send button and error handling.
 */
export default function TextInputSection({ inputText, setInputText, setApiData }: TextInputSectionProps) {
  // State to track loading status during API call.
  const [loading, setLoading] = useState(false);

  // State to store any API request errors.
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles sending the user query to the API.
   * Performs a GET request and updates the API response state.
   * Displays errors if the request fails.
   */
  const handleSend = async (): Promise<void> => {
    if (!inputText.trim()) return; // Prevent sending empty queries

    setLoading(true);
    setError(null);
    setApiData({ response: "", sources: [] }); // Clear previous response

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL not found. Please check the environment configuration.");
      }
      const response = await fetch(`${backendUrl}/?query=${inputText}`, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });
      

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      // Expecting data to contain { response: string, sources: Source[] }
      setApiData(data);
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