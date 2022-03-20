let keepSettingsButton = document.getElementById("keepSettingsButton");
let settingsBox = document.getElementById("gameSettings");
let gameTimer = document.getElementById("gameTimer");
let eventTimer = document.getElementById("eventTimer");


const randomEventsTable = ["timeFreeze", "randomWord", "allGreyLetters", "startOver", "newWord", "letterHint", "inputDelay", "responsiveColoring"];
const randomEventsTables = ["allGreyLetters"];


//temp
const gameTime = 30;
const eventTime = 5;
//temp

var timeLeft = gameTime;
var eventTimeLeft = eventTime;
var timeFrozen = false;

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
        if (!timeFrozen) {
            timeLeft--;
            eventTimeLeft--;
        }
        if (timeLeft == 0) {
            //game over
            window.location.href = "../index.html";
        }
        if (eventTimeLeft == 0) {
            randomEvent();
            eventTimeLeft = eventTime;
        }
        gameTimer.innerHTML = "Time Left: " + timeLeft;
        eventTimer.innerHTML = "Event At: " + eventTimeLeft;
    }, 1000)
}

function randomEvent() {
    var event = randomEventsTables[Math.floor(Math.random() * randomEventsTables.length)];
    console.log(event);
    switch (event) {
        case "timeFreeze":    
            timeFrozen = true;
            setTimeout(function() {
                timeFrozen = false;
            }, 5000);
            break;
        case "randomWord":
            getRandomWord(function(word) {
                for (var i = 0; i < gameSpots; i++) {
                    document.getElementById("box"+i+"row"+currentRow).innerHTML = word[i];
                }
                colorRow(currentRow, word);
                currentRow++;
                currentColumn = 0;
            });
    }
}

async function getRandomWord(callback) {
    const word = await makeWordleWord();
    callback(word);
}

//work on grey letters