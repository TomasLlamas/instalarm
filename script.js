var elements = document.getElementsByClassName('set');
for (i = 0 ; i < elements.length ; i++){
    elements[i].addEventListener("click", function () {setTimer(this.id)});
}

document.getElementById("stop").addEventListener("click", function () {
    current = false;
    document.getElementById("timer").innerHTML = "no timer set";
    audio.pause();
});

document.getElementById("select").addEventListener("change", function () {
    audio.pause();
    if(document.getElementById("select").value === "funk"){
        audio = funkyalarm;
    } else if (document.getElementById("select").value === "space"){
        audio = shortsoft;
    } else if (document.getElementById("select").value === "astronomia"){
        audio = astronomia;
    } else {
        audio = mysteriousforest;
    }
})

var shortsoft = new Audio('short soft.wav');
var mysteriousforest = new Audio('deep forest.wav');
var funkyalarm = new Audio('typical alarm.mp3');
var astronomia = new Audio('astronomia.mp3');
var audio = funkyalarm;

var soundEnabled = false;
var current = false;
var globalTimer = 0;

function setTimer(addedTime) {
    audio.pause();
    var timerEnd = new Date()
    array = addedTime.split(":");
    timerEnd.setTime(timerEnd.getTime() + (array[0] * 60 * 60 * 1000) + (array[1] * 60 * 1000) + (array[2] * 1000));
    globalTimer = timerEnd;
    soundEnabled = true;
    current = true;
}

var displayTimer = setInterval(function() {
    if(current){
    var timeNow = new Date().getTime();
    var time = globalTimer - timeNow;

    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);
    if(hours < 10){
        hours = hours.toString().padStart(2, "0");
    }
    if(minutes < 10){
        minutes = minutes.toString().padStart(2, "0");
    }
    if(seconds < 10){
        seconds = seconds.toString().padStart(2, "0");
    }
    if(seconds.toString().charAt(0) === "-"){
        document.getElementById("timer").innerHTML = "time's up";
    } else {
    document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds;
    }
    if (time < 0 && soundEnabled) {
    audio.play();
    }} else {
        document.getElementById("timer").innerHTML = "no timer set";
    }
}, 1000);

