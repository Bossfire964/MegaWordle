//percents
const boxColumnStart = 23;
const boxColumnSpacing = 1;
const boxRowStart = 15;
const boxRowSpacing = 3;
const boxLength = 10;
//percents

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXY";
let minimunWordScore = 200;
let boxLetterFontConverstion = 75/2168;
let effects = true;

let wordleInformation = document.getElementById("informationLabel");
let wordleDiv = document.getElementById("wordleBox");


//vars
var currentColumn = 0;
var currentRow = 0;
var gameWord = "";
//vars

//making wordle word
function makeWordleWord() {
    httpGetAsync("https://api.datamuse.com/words?sp="+(alphabet[Math.floor(Math.random()*25)].toLowerCase())+"????", function(response) {
    var points = 0;
    var selection;
    if (JSON.parse(response).length == 0) {
        makeWordleWord();
        return;
    }
    while (gameWord.length != 5 && points < minimunWordScore) {
        selection = JSON.parse(response)[Math.floor(Math.random()*JSON.parse(response).length)];
        gameWord = selection.word;
        points = gameWord.score;
    }
    console.log("Game word is " + gameWord);
});
}
makeWordleWord();


function makeBoard() {
    for (var i2=0; i2<6;i2++) {
        for (var i = 0; i <5; i++) {
            var newBox = document.createElement("label");
            newBox.className = "letterBox";
            newBox.id = "box"+i+"row"+i2;
            //newBox.style.width = (window.screen.height*0.1)+'px'
            newBox.style.fontSize = Math.round(boxLetterFontConverstion*(window.innerHeight+window.innerWidth)) + 'px';
            console.log(Math.round(boxLetterFontConverstion*(window.innerHeight+window.innerWidth)) + 'px');
            newBox.style.left = (boxColumnStart + (i*boxLength)+(i*boxColumnSpacing)) + '%';
            newBox.style.top = (boxRowStart + (i2*boxLength) + (i2*boxRowSpacing)) + '%';
            wordleDiv.appendChild(newBox);
        }
    }
}
makeBoard();


document.addEventListener("keydown", function(e) {
    if (currentRow == 6) {
        window.location.href = "../index.html";
    }
    if (e.key == "Enter" && currentColumn == 5) {
        var word = "";
        for (var i = 0; i < 5; i++) {
            word += document.getElementById("box"+i+"row"+currentRow).innerHTML;
        }        
        checkWordleWord(word);
    } else if (e.key == "Backspace" && currentColumn != 0) {
        document.getElementById("box"+(currentColumn-1)+"row"+currentRow).innerHTML = "";
        currentColumn--;
    } else if (alphabet.includes(e.key.toUpperCase()) && currentColumn < 5) {
        document.getElementById("box"+currentColumn+"row"+currentRow).innerHTML = e.key;
        currentColumn ++;
    }
    
});

function checkWordleWord(guess) {
    var questions = "";
    for (var i = 0; i <guess.length-2; i++) {
        questions += "?";
    }
    httpGetAsync("https://api.datamuse.com/words?sp="+guess[0]+questions+guess[guess.length-1], function(response) {
       
    var results = JSON.parse(response); 
    console.log("https://api.datamuse.com/words?sp="+guess[0]+questions+guess[guess.length-1]);
        for (var i = 0; i < results.length; i++) {
            if (results[i].word == guess) {
                colorRow(currentRow, guess);
                currentRow++;
                currentColumn = 0;
                if (guess == gameWord) {
                    currentRow = 6;
                } else if (currentRow == 6) {
                    wordleInformation.innerHTML = "The Word Was " + gameWord;
                }
                return;
            }
        }
        console.log("Nope");
    });
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function colorRow(row, guess) {
    var remainingList = gameWord.split("");
    for (var i = 0; i < 5; i++) {
        if (guess[i] == gameWord[i]) {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'green';
            remainingList.splice(remainingList.indexOf(guess[i]), 1);
        } else if (remainingList.includes(guess[i])) {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'orange';
            remainingList.splice(remainingList.indexOf(guess[i]), 1);
        } else {
            document.getElementById("box"+i+"row"+row).style.backgroundColor = 'grey';
        }
        
    }
}

console.log(window.innerHeight+window.innerWidth);

//TODO
//Pop up for pratice mode to select between 2 and 15 letter words
//Adjust the size of the box and the font size for the bigger wordles
//Ask for row amount Min 1 and max 100

//Mega mode
//pop up for all the settings
//timer for each word input
//Coins for correct guesses
//Buy things with coins like time freeze, and hints