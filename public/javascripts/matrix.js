//hiding nav bar function

var ele = document.getElementsByClassName("navigation__link");
for (var i = 0; i < ele.length; i++) {
    ele[i].style.display = "none";
}



var che = document.getElementById("navi-toggle");
che.addEventListener("change", function () {
    var bo = che.checked;
    if (bo) {
        for (var j = 0; j < ele.length; j++) {
            ele[j].style.display = "inline-block";
        }
    }
    else {
        setTimeout(function() { for (var j = 0; j < ele.length; j++) { ele[j].style.display = "none";}}, 900);
    }
});



var c = document.getElementById("c");
var ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = window.innerWidth;
//chinese characters - taken from the unicode charset
var chinese = "wearemis@twearemist#wearemist!wearemist(wearemist);wearemist;wearemist";
// var chinese = "gonephising!sudowearemist";

//converting the string into an array of single characters
chinese = chinese.split("");
var font_size = 10;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
for (var x = 0; x < columns; x++)
    drops[x] = 1;
//drawing the characters
function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffe400"; //yellow text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        var text = chinese[Math.floor(Math.random() * chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(draw, 60);