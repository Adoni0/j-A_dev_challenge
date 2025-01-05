import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { createComponent } from "@lit/react";
import ArticleCard from "../components/ArticleCard";
import "@testing-library/jest-dom";

const ArticleCardReact = createComponent({
  react: React,
  tagName: "article-card",
  elementClass: ArticleCard,
  events: {
    ontoggleBookmark: "toggle-bookmark",
  },
});

describe("ArticleCard React Wrapper", () => {
  const mockArticle = {
    id: 1,
    title: "Test Article Title",
    category: "Education",
    bookmarked: false,
    img: "/images/rocket.jpg",
  };

  it("renders the article content correctly", async () => {
    const { container } = render(<ArticleCardReact article={mockArticle} />);

    // wait for the shadowRoot to render, lit components render to shadow dom
    const shadowRoot = await waitFor(() =>
      container.querySelector("article-card").shadowRoot
    );

    // verify the title is rendered
    expect(shadowRoot.querySelector(".title").textContent).toBe(
      "Test Article Title"
    );

    // verify the category text
    expect(shadowRoot.querySelector(".category-info span").textContent).toBe(
      "Education • Resources"
    );
  });

  it("toggles the bookmark state and emits the toggle-bookmark event", async () => {
    const handleToggleBookmark = jest.fn();
    const { container } = render(
      <ArticleCardReact
        article={mockArticle}
        ontoggleBookmark={handleToggleBookmark}
      />
    );

    // wait for the shadowRoot to render
    const shadowRoot = await waitFor(() =>
      container.querySelector("article-card").shadowRoot
    );

    // simulate clicking the bookmark icon
    const bookmarkIcon = shadowRoot.querySelector(".icon .bi-bookmark-fill");
    fireEvent.click(bookmarkIcon);

    // verify the event was emitted with the correct article ID
    expect(handleToggleBookmark).toHaveBeenCalledTimes(1);
    expect(handleToggleBookmark).toHaveBeenCalledWith(
      expect.objectContaining({ detail: mockArticle.id })
    );
  });

  it("renders the correct background image", async () => {
    const { container } = render(<ArticleCardReact article={mockArticle} />);

    // wait for the shadowRoot to render
    const shadowRoot = await waitFor(() =>
      container.querySelector("article-card").shadowRoot
    );

    // verify the background image
    const cardElement = shadowRoot.querySelector(".card");
    expect(cardElement).toHaveStyle(
      `background-image: url('${mockArticle.img}')`
    );
  });
});
