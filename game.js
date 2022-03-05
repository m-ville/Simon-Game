var btnColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


var started = false;


$(document).keypress( function () {

    if(!started) {
        nextSequence();
        started = true;
    }

});




$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    $(this).addClass("pressed");
    setTimeout(function () { $("#"+ userChosenColour).removeClass("pressed") }, 100);

    



    //Check answer function call here
    checkAnswer(userClickedPattern.length-1);

});







//Check answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () { nextSequence(); }, 1000);
        }

    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over"); }, 200);

        $("h1").text("Game Over, Press Any Keyboard Key to Restart");
        
        startOver();
    }
}




function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text("level : " + " " + level);

    var randomNo = Math.floor(Math.random() * 4);
    var randomChosenColor = btnColor[randomNo];

    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


    

}




//Audio function 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}
