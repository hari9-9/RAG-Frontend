/**
 * @file TextInputSection.test.tsx
 * @description Unit tests for the TextInputSection component using Jest and React Testing Library.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TextInputSection from "../../src/components/TextInputSection";

// Mock dependencies
const mockSetInputText = jest.fn();
const mockSetApiData = jest.fn();

describe("TextInputSection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input field and send button", () => {
    render(
      <TextInputSection inputText="" setInputText={mockSetInputText} setApiData={mockSetApiData} />
    );

    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("updates input field on change", () => {
    render(
      <TextInputSection inputText="" setInputText={mockSetInputText} setApiData={mockSetApiData} />
    );

    const input = screen.getByPlaceholderText("Enter text...");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(mockSetInputText).toHaveBeenCalledWith("test query");
  });

  it("disables the button when loading", async () => {
    render(
      <TextInputSection inputText="test query" setInputText={mockSetInputText} setApiData={mockSetApiData} />
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ response: "API response", sources: [] }),
      })
    ) as jest.Mock;

    const button = screen.getByRole("button", { name: /send/i });

    fireEvent.click(button);
    expect(button).toBeDisabled();

    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it("calls API and updates data on successful request", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ response: "API response", sources: [] }),
      })
    ) as jest.Mock;

    render(
      <TextInputSection inputText="test query" setInputText={mockSetInputText} setApiData={mockSetApiData} />
    );

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => expect(mockSetApiData).toHaveBeenCalledWith({ response: "API response", sources: [] }));
  });

  it("displays error message on API failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Internal Server Error",
      })
    ) as jest.Mock;

    render(
      <TextInputSection inputText="test query" setInputText={mockSetInputText} setApiData={mockSetApiData} />
    );

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => expect(screen.getByText(/API Error: Internal Server Error/i)).toBeInTheDocument());
  });

  it("does not call API if input is empty", async () => {
    render(
      <TextInputSection inputText="" setInputText={mockSetInputText} setApiData={mockSetApiData} />
    );

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
