import { LitElement, html, css } from "lit";

class ArticleCard extends LitElement {
  static properties = {
    article: { type: Object },
  };

  static styles = css`
    .card {
      position: relative;
      border-radius: 12px;
      width: 400px;
      height: 200px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 1rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #000; /* Fallback in case image is missing */
    }

    .category-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }

    .category-info i {
      font-size: 1.2rem;
    }

    .title {
      font-size: 1rem;
      font-weight: bold;
      margin-top: 0.3rem;
      text-align: start;
    }

    .icons {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
    }

    .icons i {
      font-size: 1.2rem;
    }

    .icon {
      width: 35px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      font-size: 1.5rem;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transition: color 0.3s ease, background 0.3s ease;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .checked {
      color: #64ddb5;
    }

    .unchecked {
      color: white;
    }
  `;

  handleToggleBookmark() {
    this.dispatchEvent(
      new CustomEvent("toggle-bookmark", { detail: this.article.id })
    );
  }

  render() {
    return html`
      <style>
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");
      </style>
      <div class="card" style="background-image: url('${this.article.img}');">
        <div class="icons">
          <div
            class="icon"
            @click=${this.handleToggleBookmark}
            role="button"
            aria-label="Toggle Bookmark"
          >
            <i
              class="bi bi-bookmark-fill ${this.article.bookmarked
                ? "checked"
                : "unchecked"}"
            ></i>
          </div>

          <div class="icon">
            <i class="bi bi-three-dots-vertical"></i>
          </div>
        </div>
        <div class="content">
          <div class="category-info">
            <i class="bi bi-lightbulb"></i>
            <span>${this.article.category} • Resources</span>
          </div>
          <div class="title">${this.article.title}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("article-card", ArticleCard);

export default ArticleCard;
