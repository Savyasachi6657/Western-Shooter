//VARIABLES
var bg,bgIMG
var gun,gunIMG
var enemy_fireball,enemy_fireball_group,enemy_fireballIMG
var bullet,bullet_group,bulletIMG
var score=0
var gameState="play"
var edges
//FUNCTIONS
function preload() {
    bgIMG=loadImage("resources/desert_bg.png")
    gunIMG=loadImage("resources/gun.png")
    enemy_fireballIMG=loadImage("resources/enemy_fireball.png")
    bulletIMG=loadImage("resources/bullet.png")
}
function setup() {
    createCanvas(1600,700)
    bg=createSprite(800,350,1600,700)
    bg.scale=0.6
    bg.addImage(bgIMG)
    gun=createSprite(200,350)
    gun.scale=0.3
    gun.addImage(gunIMG)
    bullet_group=new Group()
    enemy_fireball_group=new Group()
}
function draw() {
    background(0)
    drawSprites()
    fill(255)
    textFont("bahnschrift")
    textSize(30)
    text("Score: "+score,50,50)
    if(gameState==="play") {
        if(keyDown(DOWN_ARROW)) {
            gun.y-=10
        } 
        if(keyDown(UP_ARROW)) {
            gun.y+=10
        }
        if(keyDown("space")) {
            shoot()
        }
        if(enemy_fireball_group.isTouching(gun)) {
            gameState="end"
        }
        bullet_group.isTouching(enemy_fireball_group,destroyEnemyFireball)
        spawnEnemyFireball()
        if(gameState==="end") {
            gameOver()
        }
    }

}
function spawnEnemyFireball() {
    if(frameCount%100===0) {
        var rand=Math.round(random(100,600))
        fireball=createSprite(1600,rand)
        fireball.velocity=-6
        fireball.lifetime=900
        enemy_fireball_group.add(fireball)
    }
}
function shoot() {
    bullet=createSprite(200,gun.position.y,60,5)
    bullet.addImage(bulletIMG)
    bullet.velocityX=15
    bullet.lifetime=900
    bullet_group.add(bullet)
}
function destroyEnemyFireball(fireball,_bullet) {
    fireball.destroy()
    bullet_group.destroyEach()
    score=+5
}
function gameOver() {
    enemy_fireball_group.destroyEach()
    swal({
        title:`Game Over!`,
        text:"Get Rekt L bozo! You lost the game",
        imageUrl:"resources/L.png",
        imageSize:"225x280",
        confirmButtonText:"Play Again",
        },
        function(isConfirm){
            if(isConfirm) {
            location.reload()
        }
    }
    )
}

    
