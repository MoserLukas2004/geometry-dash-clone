class Block {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y,
        };
        this.size = {
            w: 32,
            h: 32,
        };
        this.color = [255, 0, 0];
        this.solid = true;
        this.img = assets.blockImg;
    }
}