const audio = new Audio();

$("#streetBackground").off().on("load", function() {
    $("#streetBackground").css({
        "display" : "inline"
    });

    setTimeout(function () {
        $("#streetBackground").css({
            "position" : "relative"
        });
    }, 650);

    setTimeout(function () {
        $("#low_res").css({
            "display" : "none"
        });
    }, 650);

});

console.log('reset background')

setTimeout(function () {
    $("#streetBackground").css({
        "display" : "inline",
        "position" : "relative"
    });
    $("#low_res").css({
        "display" : "none"
    });
}, 1000);


let dragging = false;
// const header = document.getElementById("header");

function setDrag() {
    dragging = true;
    // header.style.color = "green";
}

function clearDrag() {
    dragging = false;
    // header.style.color = "red";
}

function playAudio(soundName) {
    if (dragging === true) {
        dragging = false;
        // header.style.color = "red";
    } else {
        //const audio = new Audio();
        if (!audio.paused){
            audio.pause();
        }
        audio.src = '/audio/street/' + soundName;
        audio.play();
    }
}

function selectCategory(categoryName) {
    if (dragging === true) {
        dragging = false;
        // header.style.color = "red";
    } else {
        if (!audio.paused){
            audio.pause();
        }
        audio.src = '/audio/categories/' + categoryName + '.mp3';

        audio.addEventListener("ended", function(){
            location.href= '/category/' + categoryName;
        });

        audio.play();
    }
}

function zooZoomIn(areaName, soundName) {
    if (dragging === true) {
        dragging = false;
    } else {
        if (!audio.paused){
            audio.pause();
        }
        audio.src = '/audio/street/' + soundName;

        audio.addEventListener("ended", function(){
            location.href= '/street/' + areaName;
        });

        audio.play();
    }
}

function zoomIn(areaName) {
    if (dragging === true) {
        dragging = false;
        // header.style.color = "red";
    } else {
        location.href= '/street/' + areaName;
    }
}

function zoomInwithAudio(areaName, soundName) {
    if (dragging === true) {
        dragging = false;
        // header.style.color = "red";
    } else {
        if (!audio.paused){
            audio.pause();
        }
        audio.src = '/audio/street/' + soundName;

        audio.addEventListener("ended", function(){
            location.href= '/street/' + areaName;
        });

        audio.play();
    }
}
