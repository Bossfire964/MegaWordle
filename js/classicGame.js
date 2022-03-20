let keepSettingsButton = document.getElementById("keepSettingsButton");
let settingsBox = document.getElementById("gameSettings");

keepSettingsButton.addEventListener("click", function(e) {
    gameSpots = document.getElementById("rowTextInput").value;
    gameAttempts = document.getElementById("attemptsTextInput").value;
    if (gameSpots <= 15) {
        let wordleScript = document.createElement("script");
        gameSpots = document.getElementById("rowTextInput").value;
        gameAttempts = document.getElementById("attemptsTextInput").value;
        wordleScript.src = "../js/wordleGame.js"
        document.body.appendChild(wordleScript);
        settingsBox.hidden = true;
    }
    
   
});