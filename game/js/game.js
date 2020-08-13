var squareSizeOptions = [50, 100, 150, 200, 250, 300];
var fieldSize = 800;
var container = document.getElementsByClassName("container")[0];
var initialStateForm = document.getElementsByClassName("card")[0]; 
var tips = document.getElementsByClassName('tips')[0];
var square1, square2;
var intervalId1, intervalId2;
var gameOver = false;
initializeOptions();

function initializeOptions() {
    var squareSizeElements = document.getElementsByClassName("control-square-size");
    for (var i=0; i<squareSizeElements.length; i++) {
        for (var j=0; j<squareSizeOptions.length; j++) {
            var optionElem = document.createElement('option');
            optionElem.textContent = squareSizeOptions[j]+"x"+squareSizeOptions[j];
            squareSizeElements[i].appendChild(optionElem);
        }
    }
    document.getElementsByTagName("form")[0].addEventListener('submit', function(event) {
        preventPageReloading(event);
        initializeGame();
        startGame();
    });
}

function preventPageReloading(e) {
    e.preventDefault();
    return false;
}

function initializeGame() {
    square1 = initializeUser(1);
    square2 = initializeUser(2);
    square1.isSmaller = square1.size < square2.size;
    square2.isSmaller = square2.size < square1.size;
    container.removeChild(container.lastElementChild);

    var field = document.createElement('div');
    field.style.position = "relative";
    field.style.width = field.style.height = fieldSize + "px";
    field.style.background = "url(img/grass.jpg)";
    field.style.margin = "auto";
    field.appendChild(square1);
    field.appendChild(square2);
    container.appendChild(field);
    tips.style.display = 'block';
}

function initializeUser(userNum) {
    gameOver = false;
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

function startGame() {
    var user1KeyCodes = [ 87, 65, 83, 68 ];
    var user2KeyCodes = [ 38, 37, 40, 39 ];
    var pressedKeys = [];
    document.onkeydown = function(e) {
        if (pressedKeys.indexOf(e.keyCode) == -1) {
            pressedKeys.push(e.keyCode);
        }
    }
    document.onkeyup = function(e) {
        pressedKeys.splice(pressedKeys.indexOf(e.keyCode));
    }
    intervalId1 = setInterval(function() {
        for (var i=0; i<pressedKeys.length; i++) {
            handlePressedKey(square1, user1KeyCodes, pressedKeys[i]);
            updateCoords(square1);
            checkCoords(square1);            
        }
    }, getInterval(square1));

    intervalId2 = setInterval(function() {
        for (var i=0; i<pressedKeys.length; i++) {
            handlePressedKey(square2, user2KeyCodes, pressedKeys[i]);
            updateCoords(square2);
            checkCoords(square2);            
        }
    }, getInterval(square2));
}

function getInterval(square) {
    return 10 / (square.speed);
}

function handlePressedKey(square, keyCodes, key) {
    switch(key) {
        case keyCodes[0]:
            square.top--;
            break;
        case keyCodes[1]:
            square.left--;
            if (square.userNum == 1) {
                square.style.transform = 'scale(-1,1)';
            } else {
                square.style.transform = 'none';
            }
            break;
        case keyCodes[2]:
            square.top++;
            break;
        case  keyCodes[3]:
            square.left++;
            if (square.userNum == 2) {
                square.style.transform = 'scale(-1,1)';
            } else {
                square.style.transform = 'none';
            }
            break;       
    }
}

function checkCoords(square) {
    if (gameOver) return;
    var message;
    if (!cooridinatesInsideField(square.size, square.size, square.top, square.left)) {
        message = 'Игрок ' + square.userNum + ' проиграл!';
    } else if (usersFaced(square1, square2)) {
        if (!square1.isSmaller && !square2.isSmaller) {
            message = "Ничья!";
        } else {
            var winner = square1.isSmaller ? 2 : 1;
            message = 'Игрок ' + winner + ' победил!';
        }
    } else return;

    alert(message);
    clearInterval(intervalId1);
    clearInterval(intervalId2);
    gameOver = true;
    container.removeChild(container.lastElementChild);
    tips.style.display = 'none';
    container.appendChild(initialStateForm);
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
    return top > square.top
        && top < square.top + square.size
        && left > square.left
        && left < square.left + square.size
}

function updateCoords(square) {
    square.style.top = square.top + 'px';
    square.style.left = square.left + 'px';
}

