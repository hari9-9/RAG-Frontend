import React from "react";

interface TextInputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
}

export default function TextInputSection({ inputText, setInputText }: TextInputSectionProps) {
  return (
    <div className="w-full h-[15%] flex items-center gap-4 p-4 border-t shadow-md">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-grow p-3 text-lg border rounded shadow-sm"
        placeholder="How Can I Help You?"
      />
      <button className="px-6 py-3 bg-green-500 text-white text-lg rounded shadow-md">
        Send
      </button>
    </div>
  );
}
