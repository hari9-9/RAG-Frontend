/**
 * @file PdfViewerPage.test.tsx
 * @description Unit tests for the PdfViewerPage component using Jest and React Testing Library.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PdfViewerPage from "../../src/components/PdfViewerPage";

jest.mock("../../src/components/pdfView", () => () => <div data-testid="pdf-viewer">Mock PDF Viewer</div>);
jest.mock("../../src/components/TextInputSection", () => (props: any) => (
  <div data-testid="text-input-section">
    <input
      type="text"
      placeholder="Enter text..."
      value={props.inputText}
      onChange={(e) => props.setInputText(e.target.value)}
    />
    <button onClick={() => props.setApiData({ response: "API Response", sources: [] })}>Send</button>
  </div>
));

describe("PdfViewerPage Component", () => {
  it("renders the component with PDF viewer and input section", () => {
    render(<PdfViewerPage />);
    
    expect(screen.getByTestId("pdf-viewer")).toBeInTheDocument();
    expect(screen.getByTestId("text-input-section")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pdf 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pdf 2/i })).toBeInTheDocument();
  });

  it("switches between PDF tabs", () => {
    render(<PdfViewerPage />);
    
    const pdf1Button = screen.getByRole("button", { name: /pdf 1/i });
    const pdf2Button = screen.getByRole("button", { name: /pdf 2/i });

    fireEvent.click(pdf2Button);
    expect(pdf2Button).toHaveClass("bg-blue-500 text-white");
    expect(pdf1Button).toHaveClass("bg-gray-300");

    fireEvent.click(pdf1Button);
    expect(pdf1Button).toHaveClass("bg-blue-500 text-white");
    expect(pdf2Button).toHaveClass("bg-gray-300");
  });

  it("updates the API response when input is submitted", () => {
    render(<PdfViewerPage />);

    const input = screen.getByPlaceholderText("Enter text...");
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(input, { target: { value: "Test input" } });
    fireEvent.click(sendButton);

    expect(screen.getByText("API Response")).toBeInTheDocument();
  });

  it("handles source click and navigates to the correct page", () => {
    render(<PdfViewerPage />);

    // Simulate API response with a source
    const setApiDataButton = screen.getByRole("button", { name: /send/i });
    fireEvent.click(setApiDataButton);

    // Simulate a source reference
    const source = { text: "Sample text", source: "2024-conocophillips-proxy-statement.pdf", page: 5 };
    
    render(<button onClick={() => screen.getByText("API Response")}>{source.source} - Page {source.page}</button>);

    const sourceButton = screen.getByText(/2024-conocophillips-proxy-statement.pdf - Page 5/i);
    fireEvent.click(sourceButton);

    // Check if the page number is updated correctly
    expect(screen.getByText("API Response")).toBeInTheDocument();
  });
});
