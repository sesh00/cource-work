import {physicManager, soundManager, spriteManager} from "./main.js";

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

        this.animation_hit_left = {0: "sprite106", 1:"sprite107", 2:"sprite106"}
        this.animation_hit_right = {0: "sprite37", 1:"sprite38", 2:"sprite37"}

        this.animmation_frame = 1;
        this.last_direction = 0

        this.is_jumping = false
        this.jump_force = 60;

        this.lastJumpTime = 0;
        this.jumpCooldown = 600;

        this.g1 = 1.25; // сила гравитации при прыжке
        this.g2 = 1.35;
        this.speed_lim = 13; // сила тяги вниз

        this.reward_count = 0;

        this.long_jump = false
        this.is_hitting = false;
        this.lastHitTime = 0;
        this.hitCooldown = 200;
    }

    draw(ctx) {
            if (this.move_x < 0){
                if(this.isOnGround){
                    if(this.is_hitting){
                        spriteManager.drawSprite(ctx, this.animation_hit_right[this.animmation_frame % 3], this.pos_x, this.pos_y);
                    } else {
                        spriteManager.drawSprite(ctx, this.animation_run_right[this.animmation_frame % 4], this.pos_x, this.pos_y);
                    }
                    this.animmation_frame++;
                } else {
                    spriteManager.drawSprite(ctx, "sprite41", this.pos_x, this.pos_y);
                }

                this.last_direction = 1;

            } else if(this.move_x > 0) {
                if(this.isOnGround) {
                    if(this.is_hitting) {
                        spriteManager.drawSprite(ctx, this.animation_hit_left[this.animmation_frame % 3], this.pos_x, this.pos_y);
                    } else {
                        spriteManager.drawSprite(ctx, this.animation_run_left[this.animmation_frame % 4], this.pos_x, this.pos_y);
                    }
                    this.animmation_frame++;
                } else {
                    spriteManager.drawSprite(ctx, "sprite102", this.pos_x, this.pos_y);
                }
                this.last_direction = 0;
            } else {
                if(this.isOnGround) {
                    if (this.last_direction === 0) {
                        if(this.is_hitting) {
                            spriteManager.drawSprite(ctx, this.animation_hit_left[this.animmation_frame % 3], this.pos_x, this.pos_y);
                            this.animmation_frame++;
                        } else {
                            spriteManager.drawSprite(ctx, "sprite97", this.pos_x, this.pos_y);
                            this.animmation_frame = 1;

                        }
                    } else {

                        if(this.is_hitting) {
                            spriteManager.drawSprite(ctx, this.animation_hit_right[this.animmation_frame % 3], this.pos_x, this.pos_y);
                            this.animmation_frame++;
                        } else {
                            spriteManager.drawSprite(ctx, "sprite46", this.pos_x, this.pos_y);
                            this.animmation_frame = 1;

                        }

                    }
                } else {
                    if (this.last_direction === 0) {
                        spriteManager.drawSprite(ctx, "sprite103", this.pos_x, this.pos_y);
                    } else {
                        spriteManager.drawSprite(ctx, "sprite40", this.pos_x, this.pos_y);
                    }

                }
            }
        }



    update() {
        if((this.move_x < 0 && this.last_direction === 0) || (this.move_x > 0 && this.last_direction ===1)) {
            return
        }
        physicManager.update(this);
    }

    hit() {
        const currentTime = Date.now();
        if ((currentTime - this.lastHitTime) >= this.jumpCooldown) {
            soundManager.play('../sounds/hit.mp3');
            this.is_hitting = true;
            this.lastHitTime = currentTime;
            physicManager.update(this);
        }



    }


    jump() {
        const currentTime = Date.now();
        if (!this.is_jumping && physicManager.isOnGround(this.pos_x, this.pos_y, this.size_x, 20, 20, 1)
            && (currentTime - this.lastJumpTime) >= this.jumpCooldown) {
            soundManager.play('../sounds/jump.mp3');
            this.is_jumping = true;
            this.lastJumpTime = currentTime;
            physicManager.update(this);
        }
    }

}


const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class Enemy extends Entity {
    constructor() {
        super();
        this.move_x = -1;
        this.move_y = 0;
        this.speed_x = 7;


        this.animation_run_right = {0: "sprite70", 1:"sprite71", 2:"sprite72", 3:"sprite73"}
        this.animation_run_left  = {0: "sprite146", 1:"sprite145", 2:"sprite144", 3:"sprite143"}

        this.animmation_frame = 1;
        this.last_direction = 0
    }

    draw(ctx){
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
                spriteManager.drawSprite(ctx, "sprite70", this.pos_x, this.pos_y);
            } else {
                spriteManager.drawSprite(ctx, "sprite146", this.pos_x, this.pos_y);
            }
            this.animmation_frame = 1;
        }
    }

    update() {
        if((this.move_x < 0 && this.last_direction === 0) || (this.move_x > 0 && this.last_direction ===1)) {
            return
        }
        physicManager.updateEnemy(this);
    }

}


