let startGameButton = document.getElementById("startGameButton");
let settingsBox = document.getElementById("gameSettings");
let gameTimer = document.getElementById("gameTimer");
let eventTimer = document.getElementById("eventTimer");
let coinCount = document.getElementById("coinCount");
let megaLogo = document.getElementById("megaLogo");



const randomEventsTable = ["timeFreeze", "randomWord", "allGreyLetters", "startOver", "newWord", "letterHint", "inputDelay", "responsiveColoring"];
const randomEventsTables = ["responsiveColoring"];

//images
let startGameButtonSource = "../assets/settingscreen/MegaWordleSettingsStartButton.png";
let startGameButtonSourceHover = "../assets/settingscreen/MegaWordleSettingsStartButtonHover.png";

let settingsBackButtonSource = "../assets/settingscreen/MegaWordleSettingsBackButton.png";
let settingsBackButtonSourceHover = "../assets/settingscreen/MegaWordleSettingsBackButtonHover.png";
//images 

//temp
const startingCoins = 3;
//temp

var timeLeft = gameTime;
var eventTimeLeft = eventTime;
var timeFrozen = false;
var inputDelayed = false;
var responsiveColoring = false;

var coins = startingCoins;

let wordLenthInput = document.getElementById("megaRowTextInput");
let gameTimeInput = document.getElementById("megaGameTime");
let eventTimerInput = document.getElementById("megaEventTimer");
let minimumWordScoreInput = document.getElementById("megaMinimumWordScore");

//setting defualts
wordLenthInput.value = gameSpots;
gameTimeInput.value = gameTime;
eventTimerInput.value = eventTime;
minimumWordScoreInput.value = minimumWordScore;
//setting defualts



startGameButton.addEventListener("click", function(e) {
    gameSpots = wordLenthInput.value; //START HERE to change settings
    gameTime = gameTimeInput.value;
    eventTime = eventTimerInput.value;
    minimumWordScore = minimumWordScoreInput.value;
    let wordleScript = document.createElement("script");
    wordleScript.src = "../js/wordleGame.js"
    document.body.appendChild(wordleScript);
    settingsBox.hidden = true;
    runEventTimers();
    megaLogo.style.left = "83%";
    megaLogo.style.top = "0%";
    megaLogo.style.height = "5%";
    megaLogo.style.width = "15%";
    
   
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
    var event = randomEventsTable[Math.floor(Math.random() * randomEventsTable.length)];
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
            makeWordleRow();
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
			const randomSpot = Math.floor(Math.random() * (gameSpots-1));
			console.log("box"+randomSpot+"row"+currentRow);
			const hintBox = document.getElementById("box"+randomSpot+"row"+currentRow);
			hintBox.style.backgroundColor = "green"
			hintBox.innerHTML = gameWord[randomSpot];
			
			break;
		case "inputDelay":
			inputDelayed = true;
			setTimeout(function() {
				inputDelayed = false;
			}, 5000);
			break;
        case "responsiveColoring":
            responsiveColoring = true;
            setTimeout(function() {
				responsiveColoring = false;
                for (var i=0; i<gameSpots; i++) {
                    var item = document.getElementById("box"+i+"row"+currentRow).style.backgroundColor;
                    if (item == "orange" || item == "rgb(0, 129, 0)") {
                        document.getElementById("box"+i+"row"+currentRow).style.backgroundColor = "black";
                    }
                }
			}, 5000);
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


//Buttons for selection

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




//buying section

//slot machines
//speed wordle
//speed typing
