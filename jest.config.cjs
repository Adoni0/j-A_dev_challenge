module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@lit/react|lit)/", // Allow @lit/react and lit to be transformed
  ],
  testEnvironment: "jest-environment-jsdom",
};
