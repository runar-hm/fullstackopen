import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("testing blogs", () => {
  let blogToTest;
  let mockLikeHandler;
  let mockRemover;

  beforeEach(() => {
    blogToTest = {
      title: "Testertitle",
      author: "John Testington",
      likes: 4,
      url: "test.test",
      user: "Testy Thai",
    };

    mockLikeHandler = vi.fn();
    mockRemover = vi.fn();

    render(
      <Blog
        blog={blogToTest}
        incrementLike={mockLikeHandler}
        removeBlog={mockRemover}
        userCreated={true}
      />,
    );
  });

  test("Title and author is rendered. Not URL or Likes", () => {
    screen.getByText(`${blogToTest.title} - ${blogToTest.author}`);

    const url = screen.queryByText(blogToTest.url);
    expect(url).toBeNull();

    const likes = screen.queryByText(blogToTest.likes);
    expect(likes).toBeNull();
  });

  test('Likes and URL are rendered after "expand" button is clicked', async () => {
    const expandBtn = await screen.findByText("expand");
    expect(expandBtn).toHaveTextContent("expand");

    const user = userEvent.setup();

    await user.click(expandBtn);

    const url = await screen.findByText(blogToTest.url);
    expect(url).toHaveTextContent(blogToTest.url);

    const likes = await screen.findByText(blogToTest.likes);
    expect(likes).toHaveTextContent(blogToTest.likes);
  });

  test("Mock func is called twice when two clicks on like buttons", async () => {
    const expandBtn = await screen.findByText("expand");

    const user = userEvent.setup();

    user.click(expandBtn);

    const likeBtn = await screen.findByText("like");
    expect(likeBtn).toBeDefined();

    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
