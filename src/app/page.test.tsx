import {act, screen} from "@testing-library/react";
import Page from "./page";
import {renderWithProviders} from "@/utils/test-utils";
import { setupServer } from 'msw/node'
import {handlers} from "@/mocks/handlers";


// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("Page", () => {

  it("renders a heading", async () => {
    await act( async () => renderWithProviders(<Page/>));

    screen.debug();

    expect(screen.getByText("Posts")).toBeInTheDocument()
  });
});
