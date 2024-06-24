import { screen, act } from "@testing-library/react";
import PostCard from "@/components/PostCard";
import { renderWithProviders } from "@/utils/test-utils";
import { posts, user } from "@/mocks/handlers";

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("PostCard Component", () => {
  it("renders post and user information", async () => {
    await act(async () =>
      renderWithProviders(<PostCard post={posts[0]} user={user} />)
    );

    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  });

  it("renders a real time post added with websocket", async () => {
    await act(async () =>
      renderWithProviders(
        <PostCard
          post={{ ...posts[0], id: 0 }}
          user={user}
          isSinglePage={false}
        />
      )
    );

    const elementWithCursorDefaultClass = screen
      .getByText("Leanne Graham")
      .closest("a"); // Find the link element

    // Check if the element has the cursor-default class when isSinglePage is true
    expect(elementWithCursorDefaultClass).toHaveClass("animate-highlight");
  });

  it("renders a not clickable post when isSinglePage is true", async () => {
    await act(async () =>
      renderWithProviders(<PostCard post={posts[0]} user={user} isSinglePage />)
    );

    const elementWithCursorDefaultClass = screen
      .getByText("Leanne Graham")
      .closest("a"); // Find the link element

    // Check if the element has the cursor-default class when isSinglePage is true
    expect(elementWithCursorDefaultClass).toHaveClass("cursor-default");
  });

  it("renders PostCardPlaceHolder when post is undefined", async () => {
    await act(async () =>
      renderWithProviders(<PostCard post={undefined} user={user} />)
    );

    expect(screen.getByTestId("postcard-placeholder")).toBeInTheDocument();
  });

  it("renders PostCardPlaceHolder when user is undefined", async () => {
    await act(async () =>
      renderWithProviders(<PostCard post={posts[0]} user={undefined} />)
    );

    expect(screen.getByTestId("postcard-placeholder")).toBeInTheDocument();
  });

  it("renders a clickable post when isSinglePage is false", async () => {
    await act(async () =>
      renderWithProviders(
        <PostCard post={posts[0]} user={user} isSinglePage={false} />
      )
    );

    const linkElement = screen.getByText("Leanne Graham").closest("a"); // Find the link element

    // Check if the element has the hover:bg-gray-200 class when isSinglePage is false
    expect(linkElement).toHaveClass("hover:bg-gray-200");
  });
});
