let startGameButton = document.getElementById("startGameButton");
let settingsBox = document.getElementById("gameSettings");
let classicLogo = document.getElementById("classicLogo");
let settingsBackButton = document.getElementById("settingsBackButton");

let rowTextInput = document.getElementById("rowTextInput");
let attemptsTextInput = document.getElementById("attemptsTextInput");
let wordScoreTextInput = document.getElementById("wordScoreTextInput");

let startGameButtonSource = "../assets/settingscreen/MegaWordleSettingsStartButton.png";
let startGameButtonSourceHover = "../assets/settingscreen/MegaWordleSettingsStartButtonHover.png";

let settingsBackButtonSource = "../assets/settingscreen/MegaWordleSettingsBackButton.png";
let settingsBackButtonSourceHover = "../assets/settingscreen/MegaWordleSettingsBackButtonHover.png";

document.getElementById("rowTextInput").value = gameSpots;
document.getElementById("attemptsTextInput").value = gameAttempts;
document.getElementById("wordScoreTextInput").value = minimunWordScore;

startGameButton.addEventListener("click", function(e) {
    gameSpots = rowTextInput.value;
    gameAttempts = attemptsTextInput.value;
    minimunWordScore = wordScoreTextInput.value;
    let wordleScript = document.createElement("script");
    wordleScript.src = "../js/wordleGame.js"
    document.body.appendChild(wordleScript);
    settingsBox.hidden = true;
    classicLogo.style.left = "0%";
    classicLogo.style.top = "0%";
    classicLogo.style.height = "5%";
    classicLogo.style.width = "15%";
    
   
});

startGameButton.addEventListener("mouseover", function() {
    if (startGameButton.src != startGameButtonSourceHover) {
        startGameButton.src = startGameButtonSourceHover;
    }
});

startGameButton.addEventListener("mouseout", function() {
    if (startGameButton.src != startGameButtonSource) {
        startGameButton.src = startGameButtonSource;
    }
});

settingsBackButton.addEventListener("mouseover", function() {
    if (settingsBackButton.src != settingsBackButtonSourceHover) {
        settingsBackButton.src = settingsBackButtonSourceHover;
    }
});

settingsBackButton.addEventListener("mouseout", function() {
    if (settingsBackButton.src != settingsBackButtonSource) {
        settingsBackButton.src = settingsBackButtonSource;
    }
});

settingsBackButton.addEventListener("click", function() {
    window.location.href = "../index.html";
});

rowTextInput.addEventListener("change", function() {
    if (rowTextInput.value <= 0) {
        rowTextInput.value = 1;
    } else if (rowTextInput.value > 15) {
        rowTextInput.value = 15;
    } else if (!isNumeric(rowTextInput.value)) {
        rowTextInput.value = gameSpots;
    }
});

attemptsTextInput.addEventListener("change", function() {
    if (attemptsTextInput.value <= 0) {
        attemptsTextInput.value = 1;
    } else if (!isNumeric(attemptsTextInput.value)) {
        attemptsTextInput.value = gameAttempts;
    }
});

wordScoreTextInput.addEventListener("change", function() {
    if (wordScoreTextInput.value <= 0) {
        wordScoreTextInput.value = 1;
    } else if (!isNumeric(wordScoreTextInput.value)) {
        wordScoreTextInput.value = minimunWordScore;
    }
});

function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && 
           !isNaN(parseFloat(str)) 
}