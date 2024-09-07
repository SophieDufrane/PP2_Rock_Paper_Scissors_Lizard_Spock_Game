// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function setUpGame() {

    let icons = document.getElementsByClassName("icon-option");

    for (let icon of icons) {
        icon.addEventListener("click", function () { // Add event listener to get attribute of the button selected

            let userSelection = this.getAttribute("data-selection");
            console.log("The user selection is", userSelection);

            // Call the rungame function
            runGame(userSelection);
        })
    }
}
);

// Add event listeners to the toggle button and the restart button
document.getElementById("toggle-button").addEventListener("click", toggleRulesSection);
document.getElementById("restart-button").addEventListener("click", restartGame);

// Define an array containing the choices
let choices = ["rock", "paper", "scissors", "lizard", "spock"];

// Object to define the winning rules based on possible combinations
const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"]
};

// Main function of the game that take the user selection as a parameter, create the computer's one with random number, then call functions to update the icons and check who win the round
function runGame(userSelection) {
    // Define the computer selection with random number
    let computerSelection = choices[Math.floor(Math.random()*choices.length)];

    // Call the function updateSelectedIcon with user and computer selection
    updateSelectedIcon(userSelection, computerSelection);

    // Call the function checkWinner with user and computer selection
    checkWinner(userSelection, computerSelection);
}

// Update the icons in result section to reflect the user's and the computer's selection
function updateSelectedIcon(userSelection, computerSelection) {
    let userImage = document.getElementById("user-selection");
    userImage.src = `assets/images/${userSelection}.png`;
    userImage.alt = `${userSelection} image`;

    let computerImage = document.getElementById("computer-selection");
    computerImage.src = `assets/images/${computerSelection}.png`;
    computerImage.alt = `${computerSelection} image`;
}

// Function that checks who is the winner, passes 2 arguments: the user and computer selection, then verifies within the rulesConditions wich scenario applies
function checkWinner(userSelection, computerSelection) {
    let result;
    
    if (userSelection === computerSelection) {
        result = "draw";
    } else if (rules[userSelection].includes(computerSelection)) {
        result = "win";
    } else {
        result = "lose";
    }

    udpateRuleApplied(result);
}

function udpateRuleApplied(result) {
    let resultMessage = document.getElementById("rule-applied");
    
    if (result === "draw") {
        resultMessage.textContent = "Mind match, draw!";
    } else if (result === "win") {
        resultMessage.textContent = "You Win!";
    } else {
        resultMessage.textContent = "Kirk beat you!";
    }
}   

function updateRoundNumber() {

}

function updateAndIncrementScore() {

}

function restartGame() {
    console.log("Restart is clicked!"); // TO BE REMOVED!
}

// Function to toggle the visibility of the rules section when clicking on the button
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