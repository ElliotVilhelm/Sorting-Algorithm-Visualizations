var numbers = [11, 14, 16, 39, 17, 31, 32, 21,
               10, 35, 37, 23, 2, 20, 8, 15, 33,
               12, 27, 26, 38, 9, 29, 4, 22, 25, 5, 19, 1,
               18, 30, 13, 3, 36, 24, 34, 7, 40, 28, 6];

var WIDTH = 900;  // canvas width
var HEIGHT = 700;  // canvas height
var i;   // outer loop
var j;  // inner loop
var RED;
var YELLOW;
var GREEN;
var GREEN_SOUND;

function setup() {
    createCanvas(WIDTH, HEIGHT);

    // init color constants
    RED = color(240,128,128);
    YELLOW = color(255, 204, 0);
    GREEN = color(50,205,50);
    fill(YELLOW);  // init bars with yellow fill color
    i = 0;  // outer loop counter
    j = 0; // inner loop counter
    // frameRate(60);
    // load
    soundFormats('mp3', 'ogg');
    GREEN_SOUND = loadSound('s.ogg');
}

function draw() {
    clear();
    background(50);
    for (var k = 0; k < numbers.length; k++) {
        if (i === numbers.length) {  // last tile to green, all others should be green already
            fill(GREEN);
            rect(10, (17*k), numbers[k] * 20, 15);
            frameRate(0);  // stop rerender
        }
        else if (k === j) {
            fill(RED);  // paint dropping "bubble" red
        }
        else if (Math.abs(k-numbers.length + 1) < i) {
            fill(GREEN);  // change tile to green after its sorted
        }
        else {
            fill(YELLOW);
        }
        rect(10, (17*k), numbers[k] * 20, 15);
    }
    bubbleSortStep(numbers);
}

function bubbleSortStep(params) {
        if (params[j] > params[j+1]) {
            var temp = params[j];
            params[j] = params[j + 1];
            params[j + 1] = temp;
        }
        if (j < params.length - i - 1) {
            j++;
        }
        else {
            j = 0;
            GREEN_SOUND.play();
            i++;
        }
}
