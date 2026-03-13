import { WordSearchGenerator } from './generator.js';
import { themes } from './themes.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme');
  const rowsInput = document.getElementById('rows');
  const colsInput = document.getElementById('cols');
  const fontSizeInput = document.getElementById('fontSize');
  const fontSizeDisplay = document.getElementById('fontSizeDisplay');
  const wordListFontSizeInput = document.getElementById('wordListFontSize');
  const wordListFontSizeDisplay = document.getElementById('wordListFontSizeDisplay');
  const maxWordsInput = document.getElementById('maxWords');
  const generateBtn = document.getElementById('generateBtn');
  const printBtn = document.getElementById('printBtn');
  const generateThemeBtn = document.getElementById('generateThemeBtn');

  const numPuzzlesInput = document.getElementById('numPuzzles');
  const previewWrapper = document.getElementById('previewWrapper');

  // Populate themes
  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme.id;
    option.textContent = theme.name;
    themeSelect.appendChild(option);
  });

  // Event listeners
  fontSizeInput.addEventListener('input', (e) => {
    fontSizeDisplay.textContent = e.target.value;
    document.documentElement.style.setProperty('--cell-font-size', `${e.target.value}px`);
  });

  wordListFontSizeInput.addEventListener('input', (e) => {
    wordListFontSizeDisplay.textContent = e.target.value;
    document.documentElement.style.setProperty('--list-font-size', `${e.target.value}px`);
  });

  generateBtn.addEventListener('click', () => generatePuzzles());
  generateThemeBtn.addEventListener('click', generateNewTheme);

  printBtn.addEventListener('click', () => {
    window.print();
  });

  async function fetchWordsForTheme(theme) {
    try {
      const response = await fetch(`https://api.datamuse.com/words?rel_trg=${theme}&max=150`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const words = data.map(item => item.word.toUpperCase());
      // Filter out words that might be too long to fit and contain non-alpha characters
      const rows = parseInt(rowsInput.value);
      const cols = parseInt(colsInput.value);
      const maxLength = Math.max(rows, cols);
      return words.filter(word => word.length > 2 && word.length <= maxLength && /^[A-Z]+$/.test(word));
    } catch (error) {
      console.error("Error fetching words:", error);
      return []; // Return empty array on error
    }
  }

  async function generateNewTheme() {
    generateThemeBtn.disabled = true;
    generateThemeBtn.textContent = 'Discovering...';

    let newTheme = null;
    let wordsToUse = [];
    const minWordsRequired = parseInt(maxWordsInput.value) < 10 ? 10 : parseInt(maxWordsInput.value);


    while (wordsToUse.length < minWordsRequired) {
      let newWord = null;
      let isDuplicate = true;

      // 1. Find a unique theme name
      while (isDuplicate) {
        try {
          const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
          if (!response.ok) throw new Error('Failed to fetch random word.');
          const data = await response.json();
          newWord = data[0];
          isDuplicate = themes.some(theme => theme.id === newWord);
        } catch (error) {
          console.error("Error fetching random word:", error);
          alert('Could not discover a new theme. Please try again.');
          generateThemeBtn.disabled = false;
          generateThemeBtn.textContent = 'Discover New Theme';
          return;
        }
      }

      // 2. Fetch words for the new theme to validate it
      wordsToUse = await fetchWordsForTheme(newWord);

      if (wordsToUse.length >= minWordsRequired) {
        newTheme = {
          id: newWord,
          name: newWord.charAt(0).toUpperCase() + newWord.slice(1)
        };
      }
    }

    // 3. Add the validated theme to the UI
    themes.push(newTheme);
    const option = document.createElement('option');
    option.value = newTheme.id;
    option.textContent = newTheme.name;
    themeSelect.appendChild(option);

    // 4. Select it and generate the puzzle
    themeSelect.value = newTheme.id;
    await generatePuzzles(wordsToUse);

    generateThemeBtn.disabled = false;
    generateThemeBtn.textContent = 'Discover New Theme';
  }

  async function generatePuzzles(prefetchedWords = null) {
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    const selectedThemeId = themeSelect.value;
    const theme = themes.find(t => t.id === selectedThemeId);

    const rows = parseInt(rowsInput.value) || 15;
    const cols = parseInt(colsInput.value) || 15;
    const maxWords = parseInt(maxWordsInput.value) || 15;
    const numPuzzles = parseInt(numPuzzlesInput.value) || 1;

    let wordsToUse;
    if (prefetchedWords) {
      wordsToUse = prefetchedWords;
    } else {
      wordsToUse = await fetchWordsForTheme(selectedThemeId);
    }

    if (wordsToUse.length < maxWords) {
      alert(`Could not find enough words for the theme "${theme.name}" to meet the 'Max Words' setting. Please try another theme or lower the 'Max Words' setting.`);
      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate Puzzle(s)';
      // Clear the preview if a puzzle can't be generated
      if (!prefetchedWords) { // Only clear if it wasn't a pre-validated theme
          previewWrapper.innerHTML = '<div class="placeholder">Select a theme and generate a puzzle.</div>';
      }
      return;
    }

    // Shuffle words
    for (let i = wordsToUse.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsToUse[i], wordsToUse[j]] = [wordsToUse[j], wordsToUse[i]];
    }

    // Clear previous puzzles
    previewWrapper.innerHTML = '';

    let usedWordsIndex = 0;

    for (let p = 0; p < numPuzzles; p++) {
      let puzzleWords = [];
      for (let w = 0; w < maxWords; w++) {
        if (usedWordsIndex >= wordsToUse.length) {
          usedWordsIndex = 0;
        }
        puzzleWords.push(wordsToUse[usedWordsIndex]);
        usedWordsIndex++;
      }

      const generator = new WordSearchGenerator(rows, cols, puzzleWords);
      const result = generator.generate();

      if (result.placedWords.length < puzzleWords.length) {
        console.warn("Not all words could be placed. Consider a larger grid or fewer/shorter words.");
      }
      
      renderPuzzlePage(theme.name, result.grid, result.placedWords, rows, cols, p + 1);
    }

    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Puzzle(s)';
  }

  function renderPuzzlePage(title, grid, words, rows, cols, pageNum) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'page-content';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'header';
    const h2 = document.createElement('h2');
    h2.textContent = `${title} (Puzzle ${pageNum})`;
    headerDiv.appendChild(h2);

    const gridWrapperDiv = document.createElement('div');
    gridWrapperDiv.className = 'grid-wrapper';
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-cols', cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = grid[r][c];
        gridContainer.appendChild(cell);
      }
    }
    gridWrapperDiv.appendChild(gridContainer);

    const wordListWrapperDiv = document.createElement('div');
    wordListWrapperDiv.className = 'word-list-wrapper';
    const wordList = document.createElement('div');
    wordList.className = 'word-list';

    words.sort().forEach(word => {
      const span = document.createElement('span');
      span.className = 'word-item';
      span.textContent = word;
      wordList.appendChild(span);
    });
    wordListWrapperDiv.appendChild(wordList);

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(gridWrapperDiv);
    contentDiv.appendChild(wordListWrapperDiv);
    pageDiv.appendChild(contentDiv);

    previewWrapper.appendChild(pageDiv);
  }

  // Initialize CSS vars on document element
  document.documentElement.style.setProperty('--cell-font-size', `${fontSizeInput.value}px`);
  document.documentElement.style.setProperty('--list-font-size', `${wordListFontSizeInput.value}px`);

  // Generate initial puzzles
  generatePuzzles();
});
