let keepSettingsButton = document.getElementById("keepSettingsButton");
let settingsBox = document.getElementById("gameSettings");
let gameTimer = document.getElementById("gameTimer");
let eventTimer = document.getElementById("eventTimer");
let coinCount = document.getElementById("coinCount");



const randomEventsTable = ["timeFreeze", "randomWord", "allGreyLetters", "startOver", "newWord", "letterHint", "inputDelay", "responsiveColoring"];
const randomEventsTables = ["inputDelay"];


//temp
const gameTime = 180;
const eventTime = 10;
const startingCoins = 3;
//temp

var timeLeft = gameTime;
var eventTimeLeft = eventTime;
var timeFrozen = false;
var inputDelayed = false;

var coins = startingCoins;

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
    coinCount.hidden = false;
    coinCount.innerHTML = "Coins: " + coins;
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
            break;
        case "allGreyLetters":
            const boxData = getColorsOfBoxes();
            for (var i = 0; i < currentRow; i++) {
                for (var j=0; j<gameSpots; j++) {
                    document.getElementById("box"+j+"row"+i).style.backgroundColor = "grey";
                }
            }
            setTimeout(function() {
                setColorsOfBoxes(boxData);
            }, 5000);
            break;
        case "startOver":
            for (var i = 0; i < currentRow+1; i++) {
                for (var j=0; j<gameSpots; j++) {
                    document.getElementById("box"+j+"row"+i).innerHTML = "";
                    document.getElementById("box"+j+"row"+i).style.backgroundColor = "black";
                }
            }
            currentRow = 0;
            currentColumn = 0;
            break;
		case "newWord":
			getRandomWord(function(result) {
				gameWord = result
				for (var i = 0; i<currentRow; i++) {
				var guessWord = "";
				for (var j = 0; j<gameSpots; j++) {
					guessWord += document.getElementById("box"+j+"row"+i).innerHTML;
				}
				colorRow(i, guessWord);

			}
			})
			for (var i = 0; i<currentRow; i++) {
				var guessWord = "";
				for (var j = 0; j<gameSpots; j++) {
					guessWord += document.getElementById("box"+j+"row"+i).innerHTML;
				}
				colorRow(i, guessWord);

			}
			break;
		case "letterHint":
			const randomSpot = Math.floor(Math.random() * gameSpots-1);
			console.log("box"+currentRow+"row"+randomSpot);
			console.log(currentRow);
			const hintBox = document.getElementById("box"+randomSpot+"row"+currentRow);
			hintBox.style.backgroundColor = "green"
			hintBox.innerHTML = gameWord[randomSpot];
			
			break;
		case "inputDelay":
			inputDelayed = true;
			setTimeout(function() {
				inputDelayed = false;
			}, 10000);
			break;
    }
}

async function getRandomWord(callback) {
    const word = await makeWordleWord();
    callback(word);
}

//g is green
//o is orange
//b is nothing
//n is new row

function setColorsOfBoxes(data) {
    const rowData = data.split("n");
    for (var i = 0; i < currentRow; i++) {
        for (var j=0; j<gameSpots; j++) {
            var color = "";
            switch(rowData[i][j]) {
                case "g":
                    color = "green";
                    break;
                case "o":
                    color = "orange";
                    break;
                case "b":
                    color = "grey";
                    break;
            }
            document.getElementById("box"+j+"row"+i).style.backgroundColor = color;
        }
    }
}

function getColorsOfBoxes(){
    var returnString = "";
    for (var i = 0; i < currentRow; i++) {
        for (var j=0; j<gameSpots; j++) {
            switch(document.getElementById("box"+j+"row"+i).style.backgroundColor) {
                case "grey":
                    returnString += "b";
                    break;
                case "orange":
                    returnString += "o";
                    break;
                case "green":
                    returnString += "g";
                    break;
            }
        }
        returnString += "n"
    }
    return returnString;
}




//buying section

//slot machines
//speed wordle
//speed typing

//EDITED