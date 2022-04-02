//percents
const boxColumnStart = classic ? 23:5;//23
const boxColumnEnd = classic ? 23:40;
const boxColumnSpacing = 1;
const boxRowStart = 15;
const boxRowSpacing = 3;
const boxLength = 10;
const keyboardColumnSpacing = 2.6;
const keyboardRowSpacing = 4;
const keyboardStartRow = 1;
const keyboardKeySize = 3;
//percents

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let qwerty = "QWERTYUIOPASDFGHJKLZXCVBNM";
let boxLetterFontConverstion = 75/2168;
let effects = true;

let wordleInformation = document.getElementById("informationLabel");
let wordleDiv = document.getElementById("wordleBox");
let keyboardGrid = document.getElementById("keyboard");
let redX = document.getElementById("redX");
let revealBackground = document.getElementById("revealBackground");
redX.style.width = (100-boxColumnStart-boxColumnEnd) + "%";
redX.style.height = "70%";
redX.style.left = boxColumnStart + "%";
redX.style.top = boxRowStart + "%";

//vars
var currentColumn = 0;
var currentRow = 0;
var gameWord = "";
var gameWordSearchIndex = 0;
var gameOver = false;
//vars

const badChars = [" ", "-"];
function includesBadChars(string) {
    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < badChars.length; j++) {
            //console.log(string)
            if (string[i] == badChars[j]) {
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
    if (JSON.parse(response).length == 0 || JSON.parse(response)[0].score < minimumWordScore) {
        console.log("trying again");
        gameWordSearchIndex++;
        if (gameWordSearchIndex > 30) {
            window.location.reload();
        } else {
            return makeWordleWord();
        }
    }
    while (gameword.length != gameSpots || points < minimumWordScore || includesBadChars(gameword)) {
        selection = JSON.parse(response)[Math.floor(Math.random()*JSON.parse(response).length)];
        gameword = selection.word;
        points = selection.score;
    }
    console.log(gameword);
    gameWordGOOD = true;
    return gameword;
}

async function makeGameWord() {
    gameWordSearchIndex = 0;
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
    const boxWorkingWidth = 100-boxColumnStart-boxColumnEnd;
    const boxWorkingBoxWidth = boxWorkingWidth-(boxColumnSpacing*gameSpots);
    for (var i = 0; i <gameSpots; i++) {
        var newBox = document.createElement("label");
        newBox.className = "letterBox";
        newBox.id = "box"+i+"row"+row;
        if (gameSpots > 4) {
            newBox.style.height = boxWorkingBoxWidth/gameSpots + "%";
            newBox.style.fontSize = (boxWorkingBoxWidth/gameSpots)*0.5 + 'vw';
        } else {
            newBox.style.height = boxWorkingBoxWidth/5 + "%";
            newBox.style.fontSize = (boxWorkingBoxWidth/5)*0.5 + 'vw';
        }
        newBox.style.width = boxWorkingBoxWidth/gameSpots + "%";
        //newBox.style.width = (window.screen.height*0.1)+'px'
        //newBox.style.fontSize = Math.round(boxLetterFontConverstion*(window.innerHeight+window.innerWidth)) + 'px';
        //console.log(Math.round(boxLetterFontConverstion*(window.innerHeight+window.innerWidth)) + 'px');
        /*newBox.style.left = (boxColumnStart + (i*boxLength)+(i*boxColumnSpacing)) + '%';
        newBox.style.top = (boxRowStart + (row*boxLength) + (row*boxRowSpacing)) + '%';*/
        newBox.style.left = (boxColumnStart + (i*(boxWorkingBoxWidth/gameSpots))+(i*boxColumnSpacing)) + '%';
        newBox.style.top = (boxRowStart + (row*boxLength) + (row*boxRowSpacing)) + '%';
        wordleDiv.appendChild(newBox);
    }
}

//making keybord
function showKeyboard() {
    for (var i = 0; i < qwerty.length; i++) {
        var newKey = document.createElement("label");
        newKey.className = "keyboardKey";
        newKey.id = "key"+qwerty[i];
        newKey.innerHTML = qwerty[i];
        newKey.style.height = keyboardKeySize + "%";
        newKey.style.width = keyboardKeySize + "%";
        if (i < 10) {
            newKey.style.left = boxColumnStart + (i*keyboardColumnSpacing) + (i*keyboardKeySize) + "%";
            newKey.style.top = keyboardStartRow + "%";
        } else if (i >= 10 && i < 19) {
            newKey.style.left = (keyboardColumnSpacing/2) + boxColumnStart + ((i-10)*keyboardColumnSpacing) + ((i-10)*keyboardKeySize) + "%";
            newKey.style.top = (keyboardStartRow + keyboardRowSpacing) + "%";
        } else {
            newKey.style.left = (keyboardColumnSpacing/0.5) + boxColumnStart + ((i-19)*keyboardColumnSpacing) + ((i-19)*keyboardKeySize) + "%";
            newKey.style.top = (keyboardStartRow + (keyboardRowSpacing*2)) + "%";
        }
        /*newKey.style.left = boxColumnStart + ((i-((Math.ceil(i/8)-1)*8))*keyboardColumnSpacing) + "%";
        newKey.style.top = (keyboardStartRow + (Math.ceil(i/8)-1)*keyboardRowSpacing) + "%";*/
        keyboardGrid.appendChild(newKey);
    }
}

showKeyboard();

function resetKeyboard() {
    for (var i=0; i<keyboardGrid.childNodes.length; i++) {
        keyboardGrid.childNodes[i].style.backgroundColor = "grey";
    }
}


document.addEventListener("keydown", function(e) {
    var delay = 0;
	if (gameOver) {
        window.location.href = "../index.html";
    } else if (currentRow == -1 && !classic) {
        console.log("start over");
        resetKeyboard();
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
	if (!gameOver) {
        setTimeout(function()
        {
            for (var i=0; i<gameSpots; i++) {
                var item = document.getElementById("box"+i+"row"+currentRow).style.backgroundColor;
                //console.log(item);
                if (item == "orange" || item == "rgb(0, 129, 0)") {
                    document.getElementById("box"+i+"row"+currentRow).style.backgroundColor = "black";
                }
            }
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
                        if (!classic) {
                            if (responsiveColoring) {
                                // 0,129,0 is green for responsive coloring
                                if (gameWord[currentColumn] == document.getElementById("box"+currentColumn+"row"+currentRow).innerHTML) {
                                    document.getElementById("box"+currentColumn+"row"+currentRow).style.backgroundColor = "rgb(0,129,0)";
                                } else if (gameWord.split("").includes(document.getElementById("box"+currentColumn+"row"+currentRow).innerHTML)) {
                                    document.getElementById("box"+currentColumn+"row"+currentRow).style.backgroundColor = "orange";
                                }
                            }
                        }
                        currentColumn++;
                    }
                        
                }
                
            }
        }, delay);
    }
    
    
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
                    if (classic) {
                        currentRow = gameAttempts;
                        gameOver = true;
                    } else {
                        currentRow = -1;
                    }
                } else if (classic) {
                    if (currentRow == gameAttempts) {
                        playWordRevealAnimation(50);
                        gameOver = true;
                    }
                } else {
                    console.log("trying this");
                    makeWordleRow(currentRow);
                }
                return;
            }
        }
        console.log("Nope");
        flashRedX();

}

function playWordRevealAnimation(speed) {
    document.getElementById("revealBackgroundContainer").hidden = false;
    const textWriting = "The Word Was...";
    var index = 0;
    const typing = setInterval(function() {
        if (index == textWriting.length+1) {
            revealWordAnimation(speed, textWriting);
            clearInterval(typing);
        } else {
            document.getElementById("revealBackgroundShade").innerHTML = textWriting.substring(0, index);
            index++;
        }
    }, speed)
}

function revealWordAnimation(speed, textWriting) {
    setTimeout(function() {
        console.log(gameWord);
        var index = 0;
        const wordType = setInterval(function() {
            if (index == gameWord.length+1) {
                clearInterval(wordType);
            } else {
                document.getElementById("revealBackgroundShadeWord").innerHTML = gameWord.substring(0, index);
                //console.log(document.getElementById("revealBackgroundShade").innerHTML);
                index++;
            }
        }, speed);
    }, 1000)
}


function flashRedX() {
    redX.hidden = false;
    setTimeout(function() {
        redX.hidden = true;
        setTimeout(function() {
            redX.hidden = false;
            setTimeout(function() {
                redX.hidden = true;
            }, 150);
        }, 150);
    }, 150);
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
            document.getElementById("key"+guess[i].toUpperCase()).style.backgroundColor = 'green';
            remainingList.splice(remainingList.indexOf(guess[i]), 1);
            if (!classic) {
                coins += 1;
            }
        } else if (remainingList.includes(guess[i])) {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'orange';
            document.getElementById("key"+guess[i].toUpperCase()).style.backgroundColor = 'orange';
            remainingList.splice(remainingList.indexOf(guess[i]), 1);
            orangeAmount += 1;
            if (!classic && orangeAmount >=3) {
                coins += 1;
            }
        } else {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'grey';
            if (document.getElementById("key"+guess[i].toUpperCase()).style.backgroundColor != "green" && document.getElementById("key"+guess[i].toUpperCase()).style.backgroundColor != "orange") {
                document.getElementById("key"+guess[i].toUpperCase()).style.backgroundColor = 'black';
            }
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


//Work on keyboard for classic mode and messages like normal wordle

