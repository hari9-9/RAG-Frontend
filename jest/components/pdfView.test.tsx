/**
 * @file PdfReactPdf.test.tsx
 * @description Unit tests for the PdfReactPdf component using Jest and React Testing Library.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PdfReactPdf from "../../src/components/pdfView";

// Mock react-pdf components to avoid actual PDF rendering
jest.mock("react-pdf", () => ({
  Document: ({ children }: { children: React.ReactNode }) => <div data-testid="pdf-document">{children}</div>,
  Page: ({ pageNumber }: { pageNumber: number }) => <div data-testid="pdf-page">Page {pageNumber}</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
  },
}));

describe("PdfReactPdf Component", () => {
  const mockSetPageNumber = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the PDF component with navigation buttons", () => {
    render(<PdfReactPdf src="test.pdf" pageNumber={1} setPageNumber={mockSetPageNumber} />);
    
    expect(screen.getByTestId("pdf-document")).toBeInTheDocument();
    expect(screen.getByTestId("pdf-page")).toHaveTextContent("Page 1");
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("navigates to the next page when 'Next' button is clicked", () => {
    render(<PdfReactPdf src="test.pdf" pageNumber={1} setPageNumber={mockSetPageNumber} />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockSetPageNumber).toHaveBeenCalledWith(2);
  });

  it("navigates to the previous page when 'Previous' button is clicked", () => {
    render(<PdfReactPdf src="test.pdf" pageNumber={2} setPageNumber={mockSetPageNumber} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);

    expect(mockSetPageNumber).toHaveBeenCalledWith(1);
  });

  it("disables 'Previous' button when on the first page", () => {
    render(<PdfReactPdf src="test.pdf" pageNumber={1} setPageNumber={mockSetPageNumber} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("renders the correct page number indicator", () => {
    render(<PdfReactPdf src="test.pdf" pageNumber={3} setPageNumber={mockSetPageNumber} />);

    expect(screen.getAllByText(/Page 3/i)).toHaveLength(2);
  });
});
