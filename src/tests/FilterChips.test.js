import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { createComponent } from "@lit/react";
import FilterChips from "../components/FilterChips";
import "@testing-library/jest-dom";

const FilterChipsReact = createComponent({
  react: React,
  tagName: "filter-chips",
  elementClass: FilterChips,
  events: {
    oncategorySelected: "category-select",
  },
});

describe("FilterChips React Wrapper", () => {
  it("renders the correct categories", async () => {
    const categories = ["ALL", "Workplace", "Training"];
    const { container } = render(
      <FilterChipsReact
        categories={categories}
        selectedCategory="ALL"
        oncategorySelected={() => {}}
      />
    );

    // Wait for the shadowRoot to render
    const shadowRoot = await waitFor(() =>
      container.querySelector("filter-chips").shadowRoot
    );

    // Verify the categories are displayed
    categories.forEach((category) => {
      const chip = Array.from(shadowRoot.querySelectorAll(".chip")).find((chip) =>
        chip.textContent.includes(category)
      );
      expect(chip).toBeInTheDocument();
    });
  });

  it("dispatches a category-select event with the correct category", async () => {
    const categories = ["ALL", "Workplace", "Training"];
    const handleCategorySelected = jest.fn();
    const { container } = render(
      <FilterChipsReact
        categories={categories}
        selectedCategory="ALL"
        oncategorySelected={handleCategorySelected}
      />
    );

    // Wait for the shadowRoot to render
    const shadowRoot = await waitFor(() =>
      container.querySelector("filter-chips").shadowRoot
    );

    // Simulate clicking the "Workplace" chip
    const workplaceChip = Array.from(shadowRoot.querySelectorAll(".chip")).find((chip) =>
      chip.textContent.includes("Workplace")
    );
    fireEvent.click(workplaceChip);

    // Verify the event was dispatched with the correct detail
    expect(handleCategorySelected).toHaveBeenCalledWith(
      expect.objectContaining({ detail: "Workplace" })
    );
  });
});
