var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players = [];
var player1, player2;

var track, player1_img, player2_img, hurdle, invisibleGround1, invisibleGround2;

function preload() {
    hurdle = loadImage("4.png");
    track = loadImage("track.jpg");
    player1_img = loadImage("1.png");
    player2_img = loadImage("2.png");
}

function setup() {
    canvas = createCanvas(displayWidth, window.innerHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}


function draw() {
    if (playerCount === 2) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
}