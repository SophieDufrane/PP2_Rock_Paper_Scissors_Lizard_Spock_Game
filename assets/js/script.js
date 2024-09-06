// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByClassName("icon-option");
   
    for (let button of buttons) {
        button.addEventListener("click", function() { // Add event listener to get attribute of the icon selected
        let userSelection = this.getAttribute("data-selection");
        console.log(userSelection); // TO BE REMOVED!
        })
    }
}
);

// Add event listeners to to the toggle button and the restart button
document.getElementById("toggle-button").addEventListener("click", toggleRulesSection);
document.getElementById("restart-button").addEventListener("click", restartGame);


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

function runGame() {

}

function checkWinner() {
    
}

function updateSelectedIcon() {

}

function udpateRuleApplied() {

}

function updateRoundNumber() {

}

function updateAndIncrementScore() {

}

function restartGame() {
    console.log("Restart is clicked!"); // TO BE REMOVED!
}
