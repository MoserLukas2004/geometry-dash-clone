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

    document.querySelector("#gameover .back-button").addEventListener("click", startLevelSelector);

    document.querySelector("#levelSelector .back-button").addEventListener("click", startMainMenu);

    document.getElementById("level1").addEventListener("click", function () {
        currentLevel = assets.levelOne;
        startLevel(currentLevel);
    });

    document.getElementById("level2").addEventListener("click", function () {
        currentLevel = assets.levelTwo;
        startLevel(currentLevel);
    });

    document.getElementById("level3").addEventListener("click", function () {
        currentLevel = assets.levelThree;
        startLevel(currentLevel);
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