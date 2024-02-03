var bg_img;
var playButton,aboutButton;
var gameState="wait";
var player,player_img1;
var enemy1img,enemy2img;
var enemyGroup;

function preload(){
    bg_img = loadImage("assets/Jungle.gif");
    bg1=loadImage("assets/background-4.jpg")
    player_img=loadImage("assets/bow.png")
    enemy1img=loadImage("assets/dragon.png")
    enemy2img=loadImage("assets/eagle.png")


}


function setup(){
    createCanvas(windowWidth,windowHeight)
    playButton = createImg("assets/play_button.png");
    playButton.position(220,470);
    playButton.size(300, 300);
    playButton.hide();

    aboutButton = createImg("assets/About_button.png");
    aboutButton.position(50, 470);
    aboutButton.size(300, 300);
    aboutButton.hide();

    player = createSprite(100, 400);
    player.addImage("main", player_img);
    player.scale=0.6;
    player.visible=false;

    enemyGroup = new Group();


}

function draw(){
    if (gameState=="wait"){
        background(bg_img)
        playButton.show()
        aboutButton.show()
        

        aboutButton.mousePressed(() => {
            playButton.hide();
            aboutButton.hide();
            gameState = "about";
        })

        playButton.mousePressed(() => {
            playButton.hide();
            aboutButton.hide();
            gameState = "play";
        })
    }

    if (gameState=="about"){
        aboutGame();
        
    }

    if (gameState=="play"){
        background(bg1);
        player.visible=true;
        spawnEnemies();

    }
    drawSprites()


}

function aboutGame() {
    swal({
        title: "About Game = How to Play!!",
        text: "Shoot the dangerous animals to win. \n Use Arrow keys to move.",
        textAlign: "center",
        imageUrl: "assets/Jungle.gif",
        imageSize: "250x250",
        confirmButtonText: "Let's kill the enemy!",
        confirmButtonColor: "brown",
    },
    function () {
        gameState = "wait"
    }
)
}

function spawnEnemies() {
    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 530))
        enemy = createSprite(width, randy);
        enemy.scale = 0.3
        enemy.velocityX = -6;
        //enemy.debug = true;

        //var randy1 = Math.round(random(0, 30))
        //var randx1 = Math.round(random(400, width))

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                //enemy.x = randx1;
                //enemy.y = randy1;
                enemy.addImage(enemy1img)
                //enemy.debug=true;
                //.velocityX = -10;
                //enemy.velocityY = 10;
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2img)
                //enemy.setCollider("rectangle", 0, 0, 100, 100)
                enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            default: break;

        }


        enemyGroup.add(enemy);



    }
}