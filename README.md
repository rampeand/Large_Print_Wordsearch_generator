# Large Print Word Search Generator

A sleek, modern web application designed to generate highly customizable, large-print Word Search puzzles dynamically. Built specifically with printable, Letter-sized PDF generation in mind, it guarantees high-contrast output with zero repeated words—perfect for casual puzzle solvers, teachers, or care facility coordinators.

## Features

- **Massive Word Themes**: Choose from deep categories like Animals, Space Exploration, World Geography, and Cooking, each packed with over 500 unique words.
- **Customizable Grids**: Adjust rows, columns, and the number of words per puzzle to fine-tune the difficulty. Scaling all the way up to dense 35x35 arrays!
- **Accessibility Focused**: Both the hidden grid words and the resulting word list can have their font sizes individually tuned via sliding scales. 
- **Bulk Generation**: Generate up to 10 unique, non-repeating puzzles from a single theme at once.
- **Flawless Printing**: The UI cleanly vanishes and applies strict `-webkit-print-color-adjust` logic so standard browser "Save to PDF" tools or direct Letter printing produces perfectly isolated pages with default margins.

## Technology Stack

- **Vanilla JavaScript**: Pure ES6 modules, zero heavy framework overhead.
- **Vite**: Blazing fast HMR and optimized production bundling.
- **CSS3 Variables**: Clean, dark-mode inspired glassmorphism design for the web interface and high-contrast toggles for print media queries.
- **Google Fonts**: Utilizes the modern `Outfit` font for stellar readability.

## Getting Started

### Prerequisites

You need Node.js installed on your machine to use Vite for the local development server.

### Installation

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

## Usage

1. Select a **Theme** from the dropdown menu in the sidebar.
2. Customize your **Rows** and **Columns** for the desired density.
3. Use the sliders to adjust the **Puzzle Font Size** and **Word List Font Size**.
4. Define the **Max Words per Puzzle** and the **Number of Puzzles** you wish to generate in bulk.
5. Click **Generate Puzzle(s)**.
6. Once satisfied with the layout preview, click the **Save as PDF / Print** button to open your browser's native print dialog.

## License

This project is open-source and free to use.
