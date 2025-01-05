# j-A_dev_challenge: React, Lit

This is a Vite-powered React project designed to demonstrate efficient and modern web development workflows. Below, you'll find instructions to set up and run the project, assumptions made during development, and additional information about the tools and decisions behind the implementation.

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your computer. [Download Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js.

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Adoni0/j-A_dev_challenge.git
   cd j-A_dev_challenge
2. **Install Dependencies**
    Run the following command to install all required dependencies:
    npm install
3. **Start the Dev Server**
    To start the dev server run:
    npm run dev
    Note: You may be prompted to install Vite globally if it's not already installed. Follow the on-screen instructions to complete the installation.
4. **Access the Project**
    Open the browser and navigate to:
    http://localhost:3000


## Why I use Vite?
- **Faster Development**: Faster spin up of the development server and faster build times
- **Modern Tooling**: Leverages ES modules for better performance and a leaner setup.
- **Better Bundle Splitting**: Efficiently handles large applications by splitting code into smaller bundles.
- **Lightweight Configuration**: Easier to configure compared to alternatives.

## Assumptions
During the development of this project, the following assumptions were made:

- A maximum of 3 ArticleCard components are displayed per row on larger screens.
- Article Card images from the assignment did not have to match the exact images shown in the provided design.
- Fonts and icons were assumed to differ slightly but still maintain a consistent, clean design aesthetic.

## Additional Information
- **Styling**: The project uses react-bootstrap for a responsive and modern design framework.
- **Testing**: Includes unit tests leveraging @testing-library/react and Jest for component validation.
- **Custom Components**: This project incorporates Lit components like ArticleCard and FilterChips, integrated with React using @lit/react.