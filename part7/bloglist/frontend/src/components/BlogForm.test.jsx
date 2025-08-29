import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
import { beforeEach } from "vitest";

describe("testing blogform", () => {
  let newBlog;
  let mockSubmit;

  beforeEach(() => {
    newBlog = {
      title: "testy tarzan",
      author: "testanomy",
      url: "vg.no",
    };

    mockSubmit = vi.fn();

    render(<BlogForm createBlog={mockSubmit} />);
  });

  test("event handler calls function with correct form input", async () => {
    const titleInputField = screen.getByPlaceholderText("title");
    const authorInputField = screen.getByPlaceholderText("author");
    const urlInputField = screen.getByPlaceholderText("url");

    const submitBtn = screen.getByText("submit");

    const user = userEvent.setup();

    await user.type(titleInputField, newBlog.title);
    await user.type(authorInputField, newBlog.author);
    await user.type(urlInputField, newBlog.url);

    await user.click(submitBtn);

    console.log(mockSubmit.mock.calls[0][0]);
    console.log(newBlog);

    expect(JSON.stringify(mockSubmit.mock.calls[0][0])).toBe(
      JSON.stringify(newBlog),
    );
    expect(mockSubmit.mock.calls[0][0]).toEqual(newBlog);
  });
});
