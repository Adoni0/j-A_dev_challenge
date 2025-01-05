import { html, css, LitElement } from "lit";

class FilterChips extends LitElement {
  static properties = {
    selectedCategory: { type: String },
    categories: { type: Array },
  };

  static styles = css`
    .chip {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #cbe5fe;
      border-radius: 25px;
      cursor: pointer;
      background-color: white;
      color: #3b5872;
      transition: background-color 0.3s, color 0.3s;
    }
    .chip:hover {
      background-color: #cbe5fe;
      color: #3b5872;
    }
    .chip.selected {
      background-color: #cbe5fe;
      color: #3b5872;
      font-weight: bold;
    }
    button i {
      font-size: 1rem;
    }
  `;

  handleClick(category) {
    this.dispatchEvent(
      new CustomEvent("category-select", { detail: category })
    );
  }

  getIcon(category) {
    if (this.selectedCategory === category) {
      return html`<i class="bi bi-check-lg"></i>`;
    }
    return null;
  }

  render() {
    return html`
      <style>
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");
      </style>
      <div>
        ${this.categories.map(
          (category) => html`
            <button
              class="chip ${this.selectedCategory === category
                ? "selected"
                : ""}"
              @click=${() => this.handleClick(category)}
            >
              ${this.getIcon(category)} ${category}
            </button>
          `
        )}
      </div>
    `;
  }
}

customElements.define("filter-chips", FilterChips);

export default FilterChips;
