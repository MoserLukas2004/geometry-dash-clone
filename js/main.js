let player;
let entities = [];
let camera = {
    x: 0,
    y: 0
};
let state;
let nextState = null;
let assets = {
    backgroundImg: null,
    blockImg: null,
    playerImg: null,
    goalImg: null,
    // This is now an object where keys are the level's file name,
    // and values are the loaded level strings.
    levels: {},
};
let dt = 1.0;

function preload() {
    assets.blockImg = loadImage('images/Block.png');
    assets.playerImg = loadImage('images/Player.png');
    assets.goalImg = loadImage('images/Goal.png');

    const levelNames = ["level1.txt", "level2.txt", "level3.txt"];
    for (let i = 0; i < levelNames.length; i++) {
        const levelName = levelNames[i];
        const levelFile = "level/" + levelName;
        assets.levels[levelName] = loadStrings(levelFile);
    }
}

function setup() {
    createCanvas(SCREEN_SIZE.width, SCREEN_SIZE.height);
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    frameRate(FPS);

    setupStates();
    startMainMenu();
}

function update() {
    dt = deltaTime / (1000.0 / 60.0);

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
            checkFallInfinite(entities[i]); 
            checkGoal(entities[i]);
        }
        maybeSwitchState();
    }
}

function draw() {
    update();

    background(BG_COLOR);

    drawEntities();
}
