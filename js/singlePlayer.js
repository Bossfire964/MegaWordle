let keepSettingsButton = document.getElementById("keepSettingsButton");
let settingsBox = document.getElementById("gameSettings");

keepSettingsButton.addEventListener("click", function(e) {
    let wordleScript = document.createElement("script");
    console.log("hel");
    wordleScript.src = "../js/wordleGame.js"
    document.body.appendChild(wordleScript);
    settingsBox.hidden = true;

});