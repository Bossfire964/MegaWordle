//percents
const boxColumnStart = classic ? 23:5;//23
const boxColumnSpacing = 1;
const boxRowStart = 15;
const boxRowSpacing = 3;
const boxLength = 10;
//percents

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXY";
let minimunWordScore = 800;
let boxLetterFontConverstion = 75/2168;
let effects = true;

let wordleInformation = document.getElementById("informationLabel");
let wordleDiv = document.getElementById("wordleBox");


//vars
var currentColumn = 0;
var currentRow = 0;
var gameWord = "";
//vars

const badChars = [" ", "-"];
function includesBadChars(string) {
    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < badChars.length; j++) {
            if (string[i] == badChars) {
                return true;
            }
        }
    }
    return false;
}

//making wordle word
async function makeWordleWord() {
    var gameword = "";
    var questionMarks = "";
    for (var i = 0; i < gameSpots-1; i++) {questionMarks += "?"}
    const response = await httpGetAsync("https://api.datamuse.com/words?sp="+(alphabet[Math.floor(Math.random()*25)].toLowerCase())+questionMarks);
    var points = 0;
    var selection;
    if (JSON.parse(response).length == 0) {
        return makeWordleWord();
    }
    while (gameword.length != gameSpots || points < minimunWordScore || includesBadChars(gameword)) {
        selection = JSON.parse(response)[Math.floor(Math.random()*JSON.parse(response).length)];
        gameword = selection.word;
        points = selection.score;
    }
    console.log(gameword);
    return gameword;
}

async function makeGameWord() {
    gameWord = await makeWordleWord();
    console.log("Game word " + gameWord);
}
makeGameWord();


function makeBoard() {
    if (classic) {
        for (var i2=0; i2<gameAttempts;i2++) {
            makeWordleRow(i2)
        }
    } else {
        makeWordleRow(0)
    }
}
makeBoard();


function makeWordleRow(row) {
    for (var i = 0; i <gameSpots; i++) {
        var newBox = document.createElement("label");
        newBox.className = "letterBox";
        newBox.id = "box"+i+"row"+row;
        //newBox.style.width = (window.screen.height*0.1)+'px'
        newBox.style.fontSize = Math.round(boxLetterFontConverstion*(window.innerHeight+window.innerWidth)) + 'px';
        console.log(Math.round(boxLetterFontConverstion*(window.innerHeight+window.innerWidth)) + 'px');
        newBox.style.left = (boxColumnStart + (i*boxLength)+(i*boxColumnSpacing)) + '%';
        newBox.style.top = (boxRowStart + (row*boxLength) + (row*boxRowSpacing)) + '%';
        wordleDiv.appendChild(newBox);
    }
}

document.addEventListener("keydown", function(e) {
    var delay = 0;
	if (currentRow == gameAttempts && classic) {
        window.location.href = "../index.html";
    } else if (currentRow == gameAttempts && !classic) {
        while(wordleDiv.firstChild) {
            wordleDiv.removeChild(wordleDiv.firstChild);
        }
        makeGameWord();
        currentRow = 0;
        currentColumn = 0;
        makeWordleRow(currentRow);
    }
    if (!classic) {
		if (inputDelayed) {
			delay = 1000;
		}
	}
	setTimeout(function()
	{
		if (e.key == "Enter" && currentColumn == gameSpots) {
            var word = "";
            for (var i = 0; i < gameSpots; i++) {
                word += document.getElementById("box"+i+"row"+currentRow).innerHTML;
            }        
            checkWordleWord(word);
		} else if (e.key == "Backspace" && currentColumn != 0) { 
			//console.log("box"+currentColumn+"row"+currentRow);
			currentColumn--;
            if (currentColumn != gameSpots) {
				while (document.getElementById("box"+currentColumn+"row"+currentRow).style.backgroundColor == "green" && currentColumn != 0) {
					currentColumn--;
				}
			}
            if (document.getElementById("box"+currentColumn+"row"+currentRow).style.backgroundColor != "green") {
                document.getElementById("box"+currentColumn+"row"+currentRow).innerHTML = "";
            }
		} else if (alphabet.includes(e.key.toUpperCase()) && currentColumn < gameSpots) {
			if (currentColumn != gameSpots) {
				while (document.getElementById("box"+currentColumn+"row"+currentRow).style.backgroundColor == "green" && currentColumn != gameSpots-1) {
						currentColumn++;
				}
				if (document.getElementById("box"+currentColumn+"row"+currentRow).style.backgroundColor != "green") {
                    document.getElementById("box"+currentColumn+"row"+currentRow).innerHTML = e.key;
				    currentColumn++;
                }
                	
			}
			
		}
	}, delay);
    
});

async function checkWordleWord(guess) {
    var questions = "";
    for (var i = 0; i <guess.length-2; i++) {
        questions += "?";
    }
    const response = await httpGetAsync("https://api.datamuse.com/words?sp="+guess[0]+questions+guess[guess.length-1]);
    var results = JSON.parse(response); 
        for (var i = 0; i < results.length; i++) {
            if (results[i].word == guess) {
                colorRow(currentRow, guess);
                currentRow++;
                currentColumn = 0;
                if (guess == gameWord) {
                    currentRow = gameAttempts;
                } else if (currentRow == gameAttempts && classic) {
                    wordleInformation.innerHTML = "The Word Was " + gameWord;
                } else {
                    makeWordleRow(currentRow);
                }
                return;
            }
        }
        console.log("Nope");
}

function httpGetAsync(theUrl, callback)
{
    return new Promise(resolve => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                resolve(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    });

}

function colorRow(row, guess) {
    var orangeAmount = 0;
    var remainingList = gameWord.split("");
    for (var i = 0; i < gameSpots; i++) {
        if (guess[i] == gameWord[i]) {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'green';
            remainingList.splice(remainingList.indexOf(guess[i]), 1);
            if (!classic) {
                coins += 1;
            }
        } else if (remainingList.includes(guess[i])) {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'orange';
            remainingList.splice(remainingList.indexOf(guess[i]), 1);
            orangeAmount += 1;
            if (!classic && orangeAmount >=3) {
                coins += 1;
            }
        } else {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'grey';
        }
        
    }
    if (!classic) {
        document.getElementById("coinCount").innerHTML = "Coins: " + coins;
    }
}

//Mega mode
//pop up for all the settings
//overall timer for
//Coins for correct guesses
//event happens after every clock event
//Buy things with coins like time freeze, and hints
