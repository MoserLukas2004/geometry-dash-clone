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

    // For every level select button (buttons with class `level-button`)
    // add an event listener for starting its level.
    // Each button knows which level it should start by its `data-level` HTML attribute.
    const levelButtons = document.getElementsByClassName("level-button");
    for (let i = 0; i < levelButtons.length; i++) {
        const levelButton = levelButtons[i];
        const levelName = levelButton.getAttribute("data-level");

        if (!levelName) {
            throw new Error("Level select button needs a \"data-level\" attribute.");
        }
        if (!assets.levels[levelName]) {
            throw new Error("Level not loaded: " + levelName);
        }

        levelButton.addEventListener("click", function () {
            currentLevel = assets.levels[levelName];
            startLevel(currentLevel);
        });
    }
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
