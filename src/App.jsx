import React, { useState } from "react";
import { createComponent } from "@lit/react";
import {
  Container,
  Row,
  Col,
  Button,
  Fade,
} from "react-bootstrap";
import FilterChips from "./components/FilterChips";
import ArticleCard from "./components/ArticleCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const FilterChipsReact = createComponent({
  react: React,
  tagName: "filter-chips",
  elementClass: FilterChips,
  events: {
    oncategorySelected: "category-select",
  },
});

const ArticleCardReact = createComponent({
  react: React,
  tagName: "article-card",
  elementClass: ArticleCard,
  events: {
    ontoggleBookmark: "toggle-bookmark",
  },
});

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [articles, setArticles] = useState([
    {
      id: 1,
      title:
        "Ignition Podcast: Innovation, Agility, Talent, Workplace, Culture, and more",
      category: "Workplace",
      bookmarked: false,
      img: `/images/rocket.jpg`,
    },
    {
      id: 2,
      title: "Threat Briefing",
      category: "Training",
      bookmarked: false,
      img: `/images/helmet.jpg`,
    },
    {
      id: 3,
      title: "SSC Telework Portal",
      category: "Productivity",
      bookmarked: false,
      img: `/images/computer.jpg`,
    },
    {
      id: 4,
      title: "AIR FORCE Virtual Education",
      category: "Education",
      bookmarked: false,
      img: `/images/education.jpg`,
    },
    {
      id: 5,
      title: "Guide to DigitalU",
      category: "Education",
      bookmarked: false,
      img: `/images/digital.jpg`,
    },
    {
      id: 6,
      title: "How to Build a Collaborative Team Environment",
      category: "Workplace",
      bookmarked: false,
      img: `/images/collab.jpg`,
    },
  ]);
  const [fade, setFade] = useState(true);

  const fadeTimeout = 300;

  const handleCategorySelected = (category) => {
    setFade(false);
    setTimeout(() => {
      setSelectedCategory(category);
      setFade(true)
    }, fadeTimeout)
    //timeout should be the same as Fade component timeout for smoother transitions
  };

  const toggleBookmark = (id) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, bookmarked: !article.bookmarked }
          : article
      )
    );
  };

  const filteredArticles =
    selectedCategory === "ALL"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <Container className="mt-0 pt-0 app-container">
      <Row className="mb-0 align-items-start">
      {/* icons div comes 2nd on md screen sizes and up */}
      <Col
        xs={12}
        md={{ span: 6, order: 2 }}
        className="d-flex justify-content-end align-items-start mb-3 mb-md-0"
      >
        <i className="bi bi-pencil me-3 header-icon"></i>
        <i className="bi bi-plus-lg me-3 header-icon"></i>
        <i className="bi bi-list-ul me-3 header-icon"></i>
        <i className="bi bi-sort-up-alt header-icon"></i>
      </Col>

      <Col
        xs={12}
        md={{ span: 6, order: 1 }}
        className="text-start"
      >
        <h2 className="fw-bold mb-4" style={{ color: "#1a487a" }}>
          Your Resources
        </h2>
        <p
          className="text-muted"
          style={{ color: "black", marginTop: "2rem" }}
        >
          You may add more or edit your existing resources
        </p>
      </Col>
    </Row>

      <Row className="mb-3 align-items-center text-start">
        <Col
          xs={12}
          md={12}
          lg={12}
          className="d-flex flex-nowrap align-items-center gap-2"
        >
          <FilterChipsReact
            categories={[
              "ALL",
              "Acquisition",
              "Communication",
              "Engineering",
              "Education",
              "Productivity",
              "Training",
              "Workplace",
            ]}
            selectedCategory={selectedCategory}
            oncategorySelected={(e) => handleCategorySelected(e.detail)}
          />
        </Col>
      </Row>

      <Fade in={fade} timeout={fadeTimeout}>
      <Row className="g-5" style={{ minHeight: "600px" }}>
        {filteredArticles.map((article) => (
          <Col key={article.id} xs={12} md={12} lg={6} xl={6} xxl={4}>
            <ArticleCardReact
              article={article}
              ontoggleBookmark={(e) => toggleBookmark(e.detail)}
            />
          </Col>
        ))}

        {/* Add placeholders to maintain grid layout */}
        {Array.from({ length: 3 - (filteredArticles.length % 3 || 3) }).map(
          (_, idx) => (
            <Col
              key={`placeholder-${idx}`}
              xs={12}
              md={12}
              lg={6}
              xl={6}
              xxl={4}
              className="invisible"
            >
              {/* Invisible placeholder with same dimensions as an Article Card */}
              <div style={{width: 400, height: 200}} />
            </Col>
          )
        )}
      </Row>
      </Fade>

      <Row className="mt-4 justify-content-center">
        <Button
          variant="outline-primary"
          className="rounded-pill show-more"
        >
          <i
            className="bi bi-arrow-down-circle"
            style={{ paddingRight: 10 }}
          ></i>{" "}
          Show More
        </Button>
      </Row>
    </Container>
  );
};

export default App;
