const tiles = {
    empty: "-",
    block: "#",
    spike: "S",
    spikeSmall: "s",
    player: "P",
    goal: "|"
}

const tile_size = {
    w: 32,
    h: 32
}

function loadLevel(rows) {
    entities = [];
    player = null;
    camera = {x: 0.0, y: 0.0};

    for(let y = 0; y < rows.length; y++) {
        let row = rows[y];
        for(let x = 0; x < row.length; x++) { 
            let tile = row[x];
            const pos = {x: x * tile_size.w, y: y * tile_size.h};
            switch(tile) {
                case tiles.empty:
                    break;
                case tiles.block:
                    entities.push(new Block(pos.x, pos.y));
                    break;
                case tiles.spike:
                    entities.push(new Spike(pos.x, pos.y));
                    break;
                case tiles.spikeSmall:
                    entities.push(new SpikeSmall(pos.x, pos.y));
                    break;
                case tiles.player:
                    player = new Player(pos.x, pos.y);
                    entities.push(player);
                    break;
                case tiles.goal:
                    entities.push(new Goal(pos.x, pos.y));
                    break;
                default:
                    console.log("Level-character is wrong: " + tile);
            }
        }
    }

    if(player) {
        camera = {
            x: player.position.x,
            y: player.position.y
        }
    }
    
    for(let i = 0; i < entities.length; i++) {
        entities[i].id = i;
    }
}
