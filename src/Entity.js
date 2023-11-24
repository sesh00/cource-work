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
        this.move_x = 0;
        this.move_y = 0;
        this.speed_x = 16;
        this.speed_y = 16;

        this.animation_run_left = {0: "sprite97", 1:"sprite98", 2:"sprite99", 3:"sprite100"}
        this.animation_run_right = {0: "sprite46", 1:"sprite45", 2:"sprite44", 3:"sprite43"}

        this.animmation_frame = 1;
        this.last_direction = 0

        this.is_jumping = false
        this.jump_force = 100;

        this.lastJumpTime = 0;
        this.jumpCooldown = 500;

        this.g1 = 1.2;
        this.g2 = 1.45;
        this.speed_lim = 16;
    }

    draw(ctx) {

        if (this.move_x < 0){
            spriteManager.drawSprite(ctx, this.animation_run_right[this.animmation_frame % 4], this.pos_x, this.pos_y);
            this.animmation_frame++;
            this.last_direction = 1;
        } else if(this.move_x > 0) {

            spriteManager.drawSprite(ctx, this.animation_run_left[this.animmation_frame % 4], this.pos_x, this.pos_y);
            this.animmation_frame++;
            this.last_direction = 0;
        } else {
            if (this.last_direction === 0) {
                spriteManager.drawSprite(ctx, "sprite97", this.pos_x, this.pos_y);
            } else {
                spriteManager.drawSprite(ctx, "sprite46", this.pos_x, this.pos_y);
            }
            this.animmation_frame = 1;
        }

    }

    update() {
        if((this.move_x < 0 && this.last_direction === 0) || (this.move_x > 0 && this.last_direction ===1)) {
            return
        }
        physicManager.update(this);
    }

    onTouchEntity(obj) {


    }

    kill() { }

    jump() {
        const currentTime = Date.now();
        if (!this.is_jumping && physicManager.isOnGround(this.pos_x, this.pos_y, this.size_x, 20, 20, 1)
            && (currentTime - this.lastJumpTime) >= this.jumpCooldown) {
            this.is_jumping = true;
            this.lastJumpTime = currentTime;
            physicManager.update(this);
        }
    }

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
