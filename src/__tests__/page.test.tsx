import "@testing-library/jest-dom";
import {act, render, screen} from "@testing-library/react";
import Page from "../app/page";
import {renderWithProviders} from "@/utils/test-utils";

describe("Page", () => {
  it("renders a heading", async () => {
    await act( async () => renderWithProviders(<Page/>));

    screen.debug();

    const heading = screen.getByRole("heading", { level: 1 });
    //
    expect(heading).toBeInTheDocument();
  });
});
