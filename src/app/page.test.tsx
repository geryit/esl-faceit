// /**
//  * @jest-environment node
//  */
import {act, render, screen} from "@testing-library/react";
import Page from "./page";
import {renderWithProviders} from "@/utils/test-utils";
import {delay, http, HttpResponse} from "msw";
import { setupServer } from 'msw/node'


// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', async ({request}) => {
    const url = new URL(request.url);
    const start = url.searchParams.get('_start');
    const limit = url.searchParams.get('_limit');
    await delay(150)
    return HttpResponse.json('John Smith')
  }),
  http.get('https://echo.websocket.org/', async () => {
    await delay(150)
    return HttpResponse.json({ message: 'WebSocket connection handled' })
  })
];

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

    // expect(screen.getByText(/no user/i)).toBeInTheDocument()
  });
});
