// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByClassName("icon-option");
   
    for (let button of buttons) {
        button.addEventListener("click", function() {
        let userSelection = this.getAttribute("data-selection"); // Add event listener to get attribute of the icon selected
        console.log(userSelection);
        })
    }
}

);

function toggleRulesSection() {

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

}
