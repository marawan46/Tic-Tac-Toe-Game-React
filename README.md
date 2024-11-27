# Tic-Tac-Toe Game with React

This is a React-based implementation of the classic Tic-Tac-Toe game. The project is designed to showcase fundamental React concepts, including state management, conditional rendering, and handling user interactions.

## Features

- **Two-Player Mode**: Players X and O take turns to play.
- **Winner Highlighting**: Highlights the winning combination when a player wins.
- **Game History**: Navigate to previous moves to review or replay the game.
- **Draw Detection**: The game detects and declares a draw when no moves are possible.
- **Mode Selection**: Allows players to select a specific mode for gameplay (future feature expansion).

---

## Project Structure

- **`Square` Component**: Represents each cell in the game board.
  - Props:
    - `value`: The value of the square (X, O, or null).
    - `onSquareClick`: Function to handle click events.
    - `win`: Boolean indicating whether this square is part of the winning combination.

- **`Board` Component**: Represents the game board and handles game logic.
  - Props:
    - `turn`: Indicates the current player's turn (X or O).
    - `squares`: Array representing the state of the board.
    - `onPlay`: Callback to update the board state.
  - Local State:
    - `winnerSquares`: Array to track the winning squares.
    - `mode`: Tracks the selected game mode.

- **`Game` Component**: Parent component managing game state and history.
  - State:
    - `history`: Tracks all board states for navigation.
    - `currentMove`: Tracks the current move index.
    - `turn`: Tracks the current player's turn.

---

## Key Functions

### `handleClick(i)`
Handles user clicks on a square, updates the board state, and toggles the turn.

### `calculateWinner(squares)`
Determines if there's a winner and returns the winning symbol along with the indices of the winning squares.

### `checkDraw(squares, mode)`
Checks if the game ends in a draw.

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

---

## Future Improvements

- Implement additional game modes (e.g., single-player with AI).
- Add animations for better user experience.
- Improve UI for mobile responsiveness.

---

Feel free to modify the sections to suit your specific project!