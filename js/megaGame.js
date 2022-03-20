let keepSettingsButton = document.getElementById("keepSettingsButton");
let settingsBox = document.getElementById("gameSettings");
let gameTimer = document.getElementById("gameTimer");
let eventTimer = document.getElementById("eventTimer");


//temp
const gameTime = 30;
const eventTime = 5;
//temp

var timeLeft = gameTime;
var eventTimeLeft = eventTime;

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
        runEventTimers();
    }
    
   
});


function runEventTimers() {
    gameTimer.hidden = false;
    eventTimer.hidden = false;
    gameTimer.innerHTML = "Time Left: " + gameTime;
    setInterval(function() {
        timeLeft--;
        eventTimeLeft--;
        if (timeLeft == 0) {
            //game over
            window.location.href = "../index.html";
        }
        if (eventTimeLeft == 0) {
            //do random event
            eventTimeLeft = eventTime;
        }
        gameTimer.innerHTML = "Time Left: " + timeLeft;
        eventTimer.innerHTML = "Event At: " + eventTimeLeft;
    }, 1000)
}