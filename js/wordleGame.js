//percents
const boxColumnStart = 23;
const boxColumnSpacing = 1;
const boxRowStart = 2
const boxRowSpacing = 3;
const boxLength = 10;
//percents

//vars
var currentColumn;
var currentRow = 0;
//vars

const wordleDiv = document.getElementById("wordleBox");

for (var i2=0; i2<6;i2++) {
    for (var i = 0; i <5; i++) {
        var newBox = document.createElement("label");
        newBox.className = "letterBox";
        newBox.id = "box"+i+"row"+i2;
        //newBox.style.width = (window.screen.height*0.1)+'px'
        newBox.style.left = (boxColumnStart + (i*boxLength)+(i*boxColumnSpacing)) + '%';
        newBox.style.top = (boxRowStart + (i2*boxLength) + (i2*boxRowSpacing)) + '%';
        wordleDiv.appendChild(newBox);
    }
}

document.addEventListener("keydown", function(e) {
    document.getElementById("box3row3").innerHTML = e.key;
});
