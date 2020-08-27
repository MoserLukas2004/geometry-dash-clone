let player;
let entities = [];
let camera = {
    x: 0,
    y: 0
};
let img;
let state = "menu";
let assets = {
    backgroundImg: null,
    blockImg: null,
    playerImg: null,
    goalImg: null,
    levelOne: null
};

function preload() {
    assets.blockImg = loadImage('images/Block.png');
    assets.playerImg = loadImage('images/Player.png');
    assets.goalImg = loadImage('images/Goal.png');    
    assets.levelOne = loadStrings('level/level1.txt');
}

function setup() {
    createCanvas(SCREEN_SIZE.width, SCREEN_SIZE.height);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);

    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startGame);

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", startGame);

    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", startMenu);
}

function startGame() {
    loadLevel(assets.levelOne);
    state = "running";

    const menu = document.getElementById("menu");
    menu.classList.add("hidden");

    const deathscreen = document.getElementById("deathscreen");
    deathscreen.classList.add("hidden");
}

function startMenu() {
    entities = [];
    state = "menu";

    const menu = document.getElementById("menu");
    menu.classList.remove("hidden");

    const deathscreen = document.getElementById("deathscreen");
    deathscreen.classList.add("hidden");
}

function startDeathscreen() {
    entities = [];
    state = "deathscreen";

    const menu = document.getElementById("menu");
    menu.classList.add("hidden");

    const deathscreen = document.getElementById("deathscreen");
    deathscreen.classList.remove("hidden");
}

function update() {
    if(state === "running") {
        if(player) {
            player.update();
            camera.x = player.position.x - width / 2;
            camera.y = player.position.y - height / 2;
        } else {
            throw new Error("Player doesn't exist");
        }

        for(let i = 0; i < entities.length; i++) {
            applyGravity(entities[i]);
            moveEntity(entities[i]);
            checkJump(entities[i]);
            checkPlayerRotate(entities[i]);
            handleSpike(entities[i]);
            checkGameOverCollision(entities[i]);
            checkGoal(entities[i]);
        }
    } else if (state === "gameover") {
        startDeathscreen();
    } else if (state === "menu") {
        startMenu();
    }
}

function draw() {
    update();

    background(BG_COLOR);

    drawEntities();
}