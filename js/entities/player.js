class Player {
    constructor(posX, posY) {
        this.position = {
            x: posX,
            y: posY,
        };
        this.size = {
            w: 16,
            h: 32,
        };
        this.velocity = {
            x: SPEED,
            y: 0,
        };
        this.gravity = GRAVITY;
        this.solid = true;
        this.canJump = true;
        this.img = assets.playerImg;
        this.rotate = 0;
        this.player = true;
    }

    update() {
        this.velocity.x = SPEED;
    }
}