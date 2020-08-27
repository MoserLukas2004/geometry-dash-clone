let currentLevel = null;

function setupStates() {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startLevelSelector);

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", function () {
        if(currentLevel) {
            startLevel(currentLevel);
        }
    });

    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", startMainMenu);

    const level1Button = document.getElementById("level1");
    level1Button.addEventListener("click", function () {
        currentLevel = assets.levelOne;
        startLevel(assets.levelOne);
    });

    const level2Button = document.getElementById("level2");
    level2Button.addEventListener("click", function () {
        currentLevel = assets.levelTwo;
        startLevel(assets.levelTwo);
    });
}

function startMainMenu() {
    entities = [];
    state = "mainMenu";

    hideAllMenus();

    document.getElementById("mainMenu").classList.remove("hidden");
}

function startGameOver() {
    entities = [];
    state = "gameover";

    hideAllMenus();

    document.getElementById("gameover").classList.remove("hidden");
}

function startLevelSelector() {
    entities = [];
    state = "levelSelector";

    hideAllMenus();

    document.getElementById("levelSelector").classList.remove("hidden");
}

function startLevel(level) {
    loadLevel(level);    
    state = "running";

    hideAllMenus();
}

function hideAllMenus() {
    const menus = document.getElementsByClassName("menu");
    for(let i = 0; i < menus.length; i++) {
        menus[i].classList.add("hidden");
    }
}

function maybeSwitchState() {
    if(nextState) {
        state = nextState;
        switch (nextState) {
            case "mainMenu":
                startMainMenu();
                break;
            case "gameover":
                startGameOver();
                break;
            case "levelSelector":
                startLevelSelector();
                break;
                
        }
        nextState = null;
    }
}