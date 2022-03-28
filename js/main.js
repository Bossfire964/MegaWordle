
const playButton = document.getElementById("playButton");
const classicButton = document.getElementById("classicButton");
const megaButton = document.getElementById("megaButton");

var classicButtonAnimation = false;
const classicButtonFrames = 8;

const classicButtonSource = "assets/titlescreen/MegaWordleClassicButton.png";
const classicButtonSourceHover = "assets/titlescreen/MegaWordleClassicButtonHover.png";

classicButton.addEventListener("click", function (e) {
    window.location.href="html/classicGame.html";
});

megaButton.addEventListener("click", function (e) {
    window.location.href="html/megaGame.html";
});

classicButton.addEventListener("mouseover", function(e) {
    if (classicButton.src != classicButtonSourceHover) {
        classicButton.src = classicButtonSourceHover;
    }
    classicButtonAnimation = true;
    playClassicButtonAnimation(100);
});
classicButton.addEventListener("mouseout", function(e) {
    if (classicButton.src != classicButtonSource) {
        classicButton.src = classicButtonSource;
    }
    classicButtonAnimation = false;
});

function playClassicButtonAnimation(speed) {
    var i = 0;
    setInterval(function() {
        if (classicButtonAnimation && i < classicButtonFrames) {
            classicButton.src = "assets/titlescreen/ClassicButtonAnimation/animation" + i + ".png";
            i++;
        } else {
            return;
        }
    }, speed)
}


