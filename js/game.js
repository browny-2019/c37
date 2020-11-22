class Game{
    constructor(){

    } 

    getGameState(){
        console.log("hello")
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val()
        })
        console.log(gameState);

    }
    updateGameState(state){
        //ref(/)is a reference to the main car racing database 

        database.ref('/').update({
            gameState:state
        })

    }
    start(){
        console.log(gameState);
        if (gameState===0){
            form = new Form();
            form.display();
            player = new Player();
            player.getPlayerCount();

        }
        car1 = createSprite(100,200);
        car2 = createSprite(300,200);

        car1.addImage(car1Image);
        car2.addImage(car2Image);

        cars = [car1,car2];
    }
    play(){
        //this function calls when all the four players have logged in.
        form.hide();
       var index = 0;
       var x = 350;
       var y ;
        Player.getPlayerInfo();

        if (allPlayers!==undefined){
            background(198,135,103);
            image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);
          
            for(var plr in  allPlayers){
                index = index+1;
                x = x+200;
                y = displayHeight-allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
               if (index===player.index){
                   stroke(10);
                   fill("yellow");
                   ellipse(x,y,60,60);
                   cars[index-1].shapeColor = "red";
                   camera.position.x = displayWidth/2;
                   camera.position.y = cars[index-1].y

               }
               
            }
            if (keyIsDown(UP_ARROW)&&player.index!==null){
                player.distance = player.distance+10;
                player.update();


            }
            if(player.distance>3900){
                gameState = 2;
                console.log("Game Ended");

            }
            drawSprites();

        }
    }
}