// Define the maximum points to end the game
const maxPoints = 5;

// Decalre constant for each choice
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
        [LIZARD]: "Rock crushes Lizard",
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

// Initialise a variable to keep track of the round number
let roundNumber = 1;

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function setUpGame() {

    let icons = document.getElementsByClassName("icon-option");

    for (let icon of icons) {
        icon.addEventListener("click", function iconClicked() {

            let userSelection = this.getAttribute("data-selection");

            runGame(userSelection);
        })
    }
}
);

// Add event listeners for toggle and restart button that call functions
document.getElementById("toggle-button").addEventListener("click", toggleRulesSection);
document.getElementById("restart-button").addEventListener("click", restartGame);

/**
 * Main function
 * Check if the game is over before starting a new one if not
 * get the user's and computer's selection then
 * update the icons in the result section
 * Check the winner and update the result
 */
function runGame(userSelection) {
    // Check if game is over
    if (checkGameOver()) {
        return;
    }

    let computerSelection = Math.floor(Math.random() * Object.keys(selection).length);
    updateSelectedIcon(userSelection, computerSelection);

    // Determine the result of the round by calling the function checkWinner
    let result = checkWinner(userSelection, computerSelection);

    incrementScore(result);
    updateGameStatus();
    updateRuleApplied(userSelection, computerSelection);
}

function checkGameOver() {
    let userScore = parseInt(document.getElementById("user-score").textContent);
    let computerScore = parseInt(document.getElementById("computer-score").textContent);

    if (userScore >= maxPoints || computerScore >= maxPoints) {
        return true
    } else {
        return false
    }
}

/**
 * Update the game status with round number or game result
 */
function updateGameStatus() {
    let gameStatus = document.getElementById("game-status-message");
    let userScore = parseInt(document.getElementById("user-score").textContent);
    let computerScore = parseInt(document.getElementById("computer-score").textContent);

    if (userScore >= maxPoints) {
        gameStatus.textContent = `You win!`;
    } else if (computerScore >= maxPoints) {
        gameStatus.textContent = `Kirk beat you!`
    } else {
        gameStatus.textContent = `Round ${roundNumber}`;
        roundNumber++;
    }
}

/**
 * Get the images element in result section and update to reflect the user's and the computer's selection
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
 * Determine the winner based on the rules scenarios
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
 * Update the message in the result section to display the rule applied 
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
 * Increment scores in the result section
 */
function incrementScore(result) {
    let userScore = document.getElementById("user-score");
    let computerScore = document.getElementById("computer-score");

    if (parseInt(userScore.textContent) >= maxPoints || parseInt(computerScore.textContent) >= maxPoints) {
        return;
    }

    if (result === "win") {
        userScore.textContent = parseInt(userScore.textContent) + 1;
    } else if (result === "lose") {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
}

/**
 * Toggle the visibility of the rules section
 */
function toggleRulesSection() {
    let toggleButton = document.getElementById("toggle-button");
    let rulesSection = document.getElementById("rules-section")

    if (rulesSection.style.display === "none") {
        rulesSection.style.display = "block";
        toggleButton.textContent = "Hide Rules";
    } else {
        rulesSection.style.display = "none";
        toggleButton.textContent = "View Rules";
    }
}

/**
 * Reset the game to default state
 */
function restartGame() {
    document.getElementById("user-score").innerText = 0;
    document.getElementById("computer-score").innerText = 0;

    document.getElementById("game-status-message").innerHTML = "Score"
    document.getElementById("rule-applied").innerHTML = "Let's Play!"

    let userImage = document.getElementById("user-selection");
    userImage.src = `assets/images/spockPortrait.jpg`;
    userImage.alt = `Spock image`;

    let computerImage = document.getElementById("computer-selection");
    computerImage.src = `assets/images/kirkPortrait.jpg`;
    computerImage.alt = `Kirk image`;

}