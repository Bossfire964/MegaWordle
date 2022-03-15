
const playButton = document.getElementById("playButton");
const classicButton = document.getElementById("classicButton");
const megaButton = document.getElementById("megaButton");

classicButton.addEventListener("click", function (e) {
    window.location.href="html/singlePlayer.html";
});

playButton.addEventListener("mouseover", function(e) {
    if(playButton.hidden == false) {
        playButton.hidden = true;
        classicButton.hidden = false;
        megaButton.hidden = false;
    }
});
playButton.addEventListener("mouseout", function(e) {
    if(playButton.hidden == true) {
        playButton.hidden = false;
        classicButton.hidden = true;
        megaButton.hidden = true;
    }
});


