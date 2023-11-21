import {physicManager, spriteManager} from "./main.js";

class Entity {
    constructor() {
        this.name = "";
        this.pos_x = 0;
        this.pos_y = 0;
        this.size_x = 0;
        this.size_y = 0;
    }
}

export class Player extends Entity {
    constructor() {
        super();
        this.lifetime = 100;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 1;
    }

    draw(ctx) {
        spriteManager.drawSprite(ctx, "sprite97", this.pos_x, this.pos_y);
    }

    update() {
        physicManager.update(this);
    }

    onTouchEntity(obj) { }

    kill() { }

    fire() { }
}



export class Enemy extends Entity {
    constructor() {
        super();
        this.lifetime = 100;
        this.move_x = 0;
        this.move_y = -1;
        this.speed = 1;
    }

    draw(ctx) { }

    update() { }

    onTouchEntity(obj) { }

    kill() { }

    fire() { }
}



export class Reward extends Entity {
    constructor() {
        super();
    }

    draw(ctx) { }

    kill() { }
}
