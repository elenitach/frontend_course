var squareSizeOptions = [50, 100, 150, 200, 250, 300];
var fieldSize = 800;
var container = document.getElementsByClassName("container")[0];
var initialStateForm = document.getElementsByClassName("card")[0]; 
var square1, square2;
main();

function main() {
    initializeOptions();
}

function initializeOptions() {
    var squareSizeElements = document.getElementsByClassName("control-square-size");
    for (var i=0; i<squareSizeElements.length; i++) {
        for (var j=0; j<squareSizeOptions.length; j++) {
            var optionElem = document.createElement('option');
            optionElem.textContent = squareSizeOptions[j]+"x"+squareSizeOptions[j];
            squareSizeElements[i].appendChild(optionElem);
        }
    }
    document.getElementsByClassName("btn")[0].onclick = initializeGame;
    document.getElementsByTagName("form")[0].onsubmit = preventPageReloading;
}

function preventPageReloading(e) {
    e.preventDefault();
    return false;
}

function initializeGame() {
    square1 = initializeUser(1);
    square2 = initializeUser(2);
    if (square1.size > square2.size) {
        square1.isSmaller = false;
        square2.isSmaller = true;
    } else {
        square1.isSmaller = true;
        square2.isSmaller = false;
    }
    removeChildren(container);

    var field = document.createElement('div');
    field.style.position = "relative";
    field.style.width = field.style.height = fieldSize + "px";
    field.style.background = "url(img/grass.jpg)";
    field.style.margin = "auto";
    field.appendChild(square1);
    field.appendChild(square2);
    container.appendChild(field);
    document.onkeydown = move;
}

function removeChildren(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function initializeUser(userNum) {
    var offest = 10;
    var square = document.createElement('img');
    var size = squareSizeOptions[document.getElementById("square-size-"+userNum).selectedIndex];
    var speed = Number(document.getElementById("speed-"+userNum).value);
    square.size = size;
    square.speed = speed;
    square.userNum = userNum;
    square.style.width = square.style.height = size + "px";
    square.style.position = "absolute";
    square.top = userNum == 1 ? offest : (fieldSize - size - offest);
    square.left = square.top;
    updateCoords(square);
    square.src = userNum == 1 ? "img/man.gif" : "img/cat.gif";
    square.style.border = "1px solid white";
    return square;
}

function move(event) {
    var user1KeyCodes = [ 87, 65, 83, 68 ]
    var user2KeyCodes = [ 38, 37, 40, 39 ];

    var myKeyCodes;
    var square;
    if (user1KeyCodes.indexOf(event.keyCode) != -1) {
        myKeyCodes = user1KeyCodes;
        square = square1;
    } else if (user2KeyCodes.indexOf(event.keyCode) != -1) {
        myKeyCodes = user2KeyCodes;
        square = square2;
    } else {
        return;
    }

    switch(event.keyCode) {
        case myKeyCodes[0]:
            square.top -= square.speed;
            updateCoords(square);
            break;
        case myKeyCodes[1]:
            square.left -= square.speed;
            updateCoords(square);
            break;
        case myKeyCodes[2]:
            square.top += square.speed;
            updateCoords(square);
            break;
        case myKeyCodes[3]:
            square.left += square.speed;
            updateCoords(square);
            break;
    }
    if (!cooridinatesInsideField(square.size, square.size, square.top, square.left)) {
        alert('Игрок ' + square.userNum + ' проиграл!');
        removeChildren(container);
        container.appendChild(initialStateForm);
    } else if (usersFaced(square1, square2)) {
        var winner = square1.isSmaller ? 2 : 1;
        alert('Игрок ' + winner + ' победил!')
        removeChildren(container);
        container.appendChild(initialStateForm);
    }        
    
}

function cooridinatesInsideField(width, height, top, left) {
    return top > 0 
        && left > 0 
        && top + height < fieldSize
        && left + width < fieldSize           
}

function usersFaced(square1, square2) {
    return pointInSquare(square1.top, square1.left, square2)
        || pointInSquare(square1.top + square1.size, square1.left, square2)
        || pointInSquare(square1.top, square1.left + square1.size, square2)
        || pointInSquare(square1.top + square1.size, square1.left + square1.size, square2)
}

function pointInSquare(top, left, square) {
    return top >= square.top
        && top <= square.top + square.size
        && left >= square.left
        && left <= square.left + square.size
}

function updateCoords(square) {
    square.style.top = square.top + 'px';
    square.style.left = square.left + 'px';
}

