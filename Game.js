class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }


    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }
        player1 = createSprite(10, 200);
        player1.scale = 1;
        player1.setCollider("rectangle", 0, 0)
        player1.debug = true;
        player1.velocityY = 1;
        player1.addImage("player1", player1_img);
        player2 = createSprite(10, 500);
        player2.scale = 1;
        player2.velocityY = 1;

        player2.setCollider("rectangle", 0, 0);
        player2.debug = true;

        player2.addImage("player2", player2_img);
        players = [player1, player2];
        invisibleGround1 = createSprite(100, 480, displayWidth * 5, 20);
        invisibleGround1.setCollider("rectangle", 0, 0);
        invisibleGround1.debug = true;

        invisibleGround2 = createSprite(100, 750, displayWidth * 5, 20);
        invisibleGround2.setCollider("rectangle", 0, 0);
        invisibleGround2.debug = true;


    }
    play() {
        form.hide();
        Player.getPlayerInfo();
        player.getPlayersAtEnd();
        spawnObstacles();
        spawnObstacles1();

        if (allPlayers !== undefined) {
            image(track, 0, -20, displayWidth * 5, displayHeight);

            var index = 0;
            var y = 140;
            var x = 50;


            player1.collide(invisibleGround1);
            player2.collide(invisibleGround2);


            for (var plr in allPlayers) {
                index = index + 1;


                y = y + 260;
                x = 360 - allPlayers[plr].distance;

                players[index - 1].x = x;
                players[index - 1].y = y;
                players[index - 1].velocityY = 1;
                players[index - 1].velocityY = 1;

                if (index === player.index) {
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    players[index - 1].shapeColor = "red";
                    camera.position.x = players[index - 1].x;
                    camera.position.y = players[index - 1].y;
                    player.x = x;
                    player.y = y;


                    if (keyDown("space")) {
                        players[index - 1].velocityY = -4;
                    }
                }

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
            }
        }


        if (player.distance == -4000) {
            gameState = 2;
            player.rank += 1
            Player.updatePlayersAtEnd(player.rank)
        }

        drawSprites();
    }

    end() {
        console.log("Game Ended");
        console.log(player.rank);
    }
}

function spawnObstacles() {
    var i = 0;
    if (frameCount % 100 === 0) {
        i = i + 1000
        var obstacle = createSprite(4000, 325);

        obstacle.velocityX = -7;
        obstacle.addImage(hurdle);

        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;
    }
}

function spawnObstacles1() {
    if (frameCount % 100 === 0) {

        var obstacle = createSprite(4000, 585);

        obstacle.velocityX = -7;
        obstacle.addImage(hurdle);
        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;

    }
}