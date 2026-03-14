# Large Print Wordsearch Generator

> **Live Demo:** [wordsearch.andre.systems](https://wordsearch.andre.systems)

---

Generate beautifully formatted, large-print Word Search puzzles — ready to print or save as PDF. Built for accessibility, with individually tunable font sizes, high-contrast output, and support for bulk puzzle generation.

---

## Features

| | |
|---|---|
| **10 Built-in Themes** | Animals, Space, Cooking, Geography, Technology, Weather, Music, Sports, Art, and History |
| **Discover New Themes** | Generates a random theme on the fly, validated against live word data before presenting |
| **API-Powered Words** | Words fetched on-demand from the [Datamuse API](https://www.datamuse.com/api/) for fresh, relevant results |
| **Customizable Grids** | Adjust rows (8–35), columns (8–35), and max words per puzzle |
| **Dual Font Controls** | Independently tune grid and word list font sizes via sliders |
| **Bulk Generation** | Create up to 10 unique puzzles from a single theme in one click |
| **Print-Ready** | UI cleanly hides on print — outputs perfectly formatted, letter-sized pages |

---

## Technology Stack

```
Vanilla JS (ES6 Modules)  ──  Zero framework overhead
Vite 7                    ──  Fast HMR, optimized production builds
Docker + Nginx            ──  Multi-stage container, lightweight alpine image
GitHub Actions            ──  CI/CD: build → test → push to Docker Hub
CSS3 Variables            ──  Dark UI + high-contrast print styles
```

---

## Getting Started

### Run Locally (Dev)

```bash
git clone https://github.com/rampeand/Large_Print_Wordsearch_generator.git
cd Large_Print_Wordsearch_generator
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Run with Docker

```bash
docker pull rampeand/large-print-wordsearch-generator:latest
docker run -p 8081:80 rampeand/large-print-wordsearch-generator:latest
```

Open `http://localhost:8081` in your browser.

---

## CI/CD Pipeline

Every push to `main` automatically:

1. Builds the Docker image
2. Runs the container and verifies it responds on port 8081
3. Pushes the image to Docker Hub on success

**Required GitHub secrets** (`Settings > Secrets and variables > Actions`):

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Access token from Docker Hub account settings |
