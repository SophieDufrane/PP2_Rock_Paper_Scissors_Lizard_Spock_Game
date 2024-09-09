// Define the maximum points to end the game
const MAX_POINTS = 5;

// Initialise a variable to keep track of the round number
let roundNumber = 1;

// Declare constants for each choice
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
const LIZARD = 3;
const SPOCK = 4;

// Map the constants to their corresponding string values
const selection = {
    [ROCK]: "rock",
    [PAPER]: "paper",
    [SCISSORS]: "scissors",
    [LIZARD]: "lizard",
    [SPOCK]: "spock"
};

// Define the rules of the game
const rules = {
    [ROCK]: {
        [SCISSORS]: "Rock crushes Scissors",
        [LIZARD]: "Rock crushes Lizard"
    },
    [PAPER]: {
        [ROCK]: "Paper covers Rock",
        [SPOCK]: "Paper disproves Spock"
    },
    [SCISSORS]: {
        [PAPER]: "Scissors cuts Paper",
        [LIZARD]: "Scissors decapitates Lizard"
    },
    [LIZARD]: {
        [SPOCK]: "Lizard poisons Spock",
        [PAPER]: "Lizard eats Paper"
    },
    [SPOCK]: {
        [SCISSORS]: "Spock smashes Scissors",
        [ROCK]: "Spock vaporizes Rock"
    }
};

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", setUpGame);

/**
 * Initializes the game by setting up event listeners for all interactive elements.
 * 
 * Adds click event listeners to each icon option, 
 * then selection is passed to the runGame function.
 * 
 * Adds event listeners to the 'View Rules' button and 'Restart Game' button.
 * These buttons respectively toggle the display of game rules and restart the game.
 */
function setUpGame() {
    let icons = document.getElementsByClassName("icon-option");

    for (let icon of icons) {
        icon.addEventListener("click", function iconClicked() {

            let userSelection = parseInt(this.getAttribute("data-selection"));

            runGame(userSelection);
        });
    }

    // Add event listeners for toggle and restart buttons that call the respective functions
    document.getElementById("toggle-button").addEventListener("click", toggleRulesSection);
    document.getElementById("restart-button").addEventListener("click", restartGame);
}

/**
 * Run the main game logic.
 * 
 * @param {number} userSelection - The user's choice, corresponding to the data-selection.
 * 
 * Checks if the game is over. If so, it does nothing.
 * Otherwise, updates the result section (scores, game status, selected icons and rules) for each round.
 */
function runGame(userSelection) {
    // Check if the game is over
    if (checkGameOver()) {
        return;
    }

    let computerSelection = Math.floor(Math.random() * Object.keys(selection).length);
    updateSelectedIcon(userSelection, computerSelection);

    // Determine the result of the round
    let result = checkWinner(userSelection, computerSelection);

    // Update result section
    incrementScore(result);
    updateGameStatus();
    updateRuleApplied(userSelection, computerSelection);
}

/**
 * Check if either the user or computer has reached maximum points.
 */
function checkGameOver() {
    let userScore = parseInt(document.getElementById("user-score").textContent);
    let computerScore = parseInt(document.getElementById("computer-score").textContent);

    return userScore >= MAX_POINTS || computerScore >= MAX_POINTS;
}

/**
 * Update the game status with round number or the outcome of the game if it is over.
 */
function updateGameStatus() {
    let gameStatus = document.getElementById("game-status-message");
    let userScore = parseInt(document.getElementById("user-score").textContent);
    let computerScore = parseInt(document.getElementById("computer-score").textContent);

    if (userScore >= MAX_POINTS) {
        gameStatus.textContent = `You win!`;
    } else if (computerScore >= MAX_POINTS) {
        gameStatus.textContent = `Kirk beat you!`;
    } else {
        gameStatus.textContent = `Round ${roundNumber}`;
        roundNumber++;
    }
}

/**
 * Update the images in result section to reflect the user's and the computer's selection.
 * 
 * @param {number} userSelection - The user's choice, corresponding to the data-selection.
 * @param {number} computerSelection - The computer's randomly selected choice.
 */
function updateSelectedIcon(userSelection, computerSelection) {
    let userImage = document.getElementById("user-selection");
    userImage.src = `assets/images/${selection[userSelection]}.png`;
    userImage.alt = `${selection[userSelection]} image`;

    let computerImage = document.getElementById("computer-selection");
    computerImage.src = `assets/images/${selection[computerSelection]}.png`;
    computerImage.alt = `${selection[computerSelection]} image`;
}

/**
 * Update the message in the result section to display the rule applied for the round.
 *
 * @param {number} userSelection - The user's choice, corresponding to the data-selection.
 * @param {number} computerSelection - The computer's randomly selected choice.
 */
function updateRuleApplied(userSelection, computerSelection) {
    let resultMessage = document.getElementById("rule-applied");

    if (userSelection === computerSelection) {
        resultMessage.textContent = "Mind match, draw!";
    } else if (rules[userSelection] && rules[userSelection][computerSelection]) {
        resultMessage.textContent = rules[userSelection][computerSelection];
    } else {
        resultMessage.textContent = rules[computerSelection][userSelection];
    }
}

/**
 * Determine the winner based on the rules.
 * 
 * @param {number} userSelection - The user's choice, corresponding to the data-selection.
 * @param {number} computerSelection - The computer's randomly selected choice.
 */
function checkWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "draw";
    } else if (rules[userSelection] && rules[userSelection][computerSelection]) {
        return "win";
    } else {
        return "lose";
    }
}

/**
 * Increment scores in the result section.
 * 
 * @param {string} result - The result of the round ("win", "lose" or "draw").
 */
function incrementScore(result) {
    let userScore = document.getElementById("user-score");
    let computerScore = document.getElementById("computer-score");

    if (parseInt(userScore.textContent) >= MAX_POINTS || parseInt(computerScore.textContent) >= MAX_POINTS) {
        return;
    }

    if (result === "win") {
        userScore.textContent = parseInt(userScore.textContent) + 1;
    } else if (result === "lose") {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
}

/**
 * Toggle the visibility of the rules section.
 */
function toggleRulesSection() {
    let toggleButton = document.getElementById("toggle-button");
    let rulesSection = document.getElementById("rules-section");

    if (rulesSection.style.display === "none") {
        rulesSection.style.display = "block";
        toggleButton.textContent = "Hide Rules";
    } else {
        rulesSection.style.display = "none";
        toggleButton.textContent = "View Rules";
    }
}

/**
 * Reset the game to its default state.
 */
function restartGame() {
    document.getElementById("user-score").innerText = 0;
    document.getElementById("computer-score").innerText = 0;

    document.getElementById("game-status-message").innerHTML = "Score";
    document.getElementById("rule-applied").innerHTML = "Let's Play!";

    let userImage = document.getElementById("user-selection");
    userImage.src = `assets/images/spockPortrait.jpg`;
    userImage.alt = `Spock image`;

    let computerImage = document.getElementById("computer-selection");
    computerImage.src = `assets/images/kirkPortrait.jpg`;
    computerImage.alt = `Kirk image`;

    roundNumber = 1;
}