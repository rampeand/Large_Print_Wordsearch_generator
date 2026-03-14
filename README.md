# Large Print Wordsearch Generator

**Live Demo:** [wordsearch.andre.systems](https://wordsearch.andre.systems)

A sleek, modern web application designed to generate highly customizable, large-print Word Search puzzles dynamically. Built specifically with printable, Letter-sized PDF generation in mind, it guarantees high-contrast output for easy reading.

## Features

- **Dynamic Word Themes**: Choose from a variety of built-in themes like Animals, Space, and Cooking.
- **Discover New Themes**: Generate brand new, random themes on the fly. The app will automatically find a theme with enough words to generate a puzzle.
- **API-Powered**: Theme words are fetched on-demand from the Datamuse API, ensuring fresh and relevant word lists.
- **Customizable Grids**: Adjust rows, columns, and the number of words per puzzle to fine-tune the difficulty.
- **Accessibility Focused**: Both the hidden grid words and the resulting word list can have their font sizes individually tuned via sliding scales. 
- **Bulk Generation**: Generate up to 10 unique puzzles from a single theme at once.
- **Flawless Printing**: The UI cleanly vanishes, allowing your browser's "Save to PDF" or print functions to produce perfectly formatted, letter-sized pages.

## Technology Stack

- **Vanilla JavaScript**: Pure ES6 modules, zero heavy framework overhead.
- **Vite**: Blazing fast HMR and optimized production bundling.
- **Docker & Nginx**: The production app is served from a lightweight, multi-stage Nginx container.
- **GitHub Actions**: A full CI/CD pipeline automatically builds, tests, and deploys the Docker image.
- **CSS3 Variables**: Clean, dark-mode inspired design for the web interface and high-contrast styles for print.

## Getting Started

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/rampeand/large-print-wordsearch-generator.git
   ```
2. Navigate into the project directory:
   ```bash
   cd large-print-wordsearch-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local Vite server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local address provided (usually `http://localhost:5173`).

### Running with Docker

Once the image is pushed to Docker Hub by the CI/CD pipeline, you can run the production application easily.

1. Pull the latest image from Docker Hub (replace `rampeand` with the correct Docker Hub username if different):
   ```bash
   docker pull rampeand/large-print-wordsearch-generator:latest
   ```
2. Run the container, mapping your local port 8080 to the container's port 80:
   ```bash
   docker run -p 8081:80 rampeand/large-print-wordsearch-generator:latest
   ```
3. Open your browser to `http://localhost:8081`.

## CI/CD Pipeline

This project uses GitHub Actions to automate the build, test, and deployment of the Docker container. On every push to the `main` branch, the workflow will:
1.  Build the Docker image.
2.  Run the container in a test environment.
3.  Verify the container is serving content correctly.
4.  If the tests pass, tag and push the image to Docker Hub.

**IMPORTANT**: For the final push to Docker Hub to succeed, you must configure the following secrets in your GitHub repository settings under **Settings > Secrets and variables > Actions**:
- `DOCKERHUB_USERNAME`: Your Docker Hub username.
- `DOCKERHUB_TOKEN`: An access token generated from your Docker Hub account settings.
