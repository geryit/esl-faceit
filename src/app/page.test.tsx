import {act, screen} from "@testing-library/react";
import Page from "./page";
import {renderWithProviders} from "@/utils/test-utils";
import { setupServer } from 'msw/node'
import {handlers} from "@/mocks/handlers";


// Setup the server to handle requests
const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

// Test suite for the Page component
describe("Page", () => {

  it("renders page correctly", async () => {
    await act( async () => renderWithProviders(<Page/>));

    expect(screen.getByText("Posts")).toBeInTheDocument()
    expect(screen.getByText("Loading...")).toBeInTheDocument()
    expect(screen.getAllByText("Leanne Graham")[0]).toBeInTheDocument()
  });
});
