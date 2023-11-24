import {gameManager, mapManager} from "./main.js";

export default class PhysicManager {

    getSpace(x_pos, y_pos, side, bias_x, bias_y){
        const topLeftCorner = mapManager.getTilesetIdx(x_pos + bias_x, y_pos + bias_y);
        const topRightCorner = mapManager.getTilesetIdx(x_pos + side - bias_x, y_pos + bias_y);
        const bottomLeftCorner = mapManager.getTilesetIdx(x_pos + bias_x, y_pos + side);
        const bottomRightCorner = mapManager.getTilesetIdx(x_pos + side - bias_y, y_pos + side);

        console.log(`topLeftCorner ${topLeftCorner}`);
        console.log(`topRightCorner ${topRightCorner}`);
        console.log(`bottomLeftCorner ${bottomLeftCorner}`);
        console.log(`bottomRightCorner ${bottomRightCorner}`);

        return topLeftCorner === 0 && topRightCorner === 0 && bottomLeftCorner === 0 && bottomRightCorner === 0
    }

    update(obj) {

        if(!obj.isOnGround && !obj.is_jumping){ // не на земле не прыгаем
            obj.move_y = 1;
        }

        if(obj.is_jumping && obj.isOnGround) { // прыгаем на земле
            obj.move_y = -1;
            obj.speed_y = obj.jump_force;
        }

        const newX = obj.pos_x + Math.floor(obj.move_x * obj.speed_x);
        const newY = obj.pos_y + Math.floor(obj.move_y * obj.speed_y);


        while(this.getSpace(obj.pos_x, obj.pos_y, obj.size_x,20, 20 )) {
            obj.pos_x = obj.pos_x + Math.floor(obj.move_x);
            obj.pos_y = obj.pos_y + Math.floor(obj.move_y);

            if (obj.pos_x === newX && obj.pos_y === newY) {
                break
            }
        }


        obj.pos_x = obj.pos_x - Math.floor(obj.move_x);
        obj.pos_y = obj.pos_y - Math.floor(obj.move_y);

        while(this.getSpace(obj.pos_x, obj.pos_y, obj.size_x,20, 20 )) {
            obj.pos_y = obj.pos_y + Math.floor(obj.move_y);

            if (obj.pos_y === newY) break;

        }

        obj.pos_y = obj.pos_y - Math.floor(obj.move_y);
        obj.isOnGround = this.isOnGround(obj.pos_x, obj.pos_y, obj.size_x,20, 20 , 1);

        if(obj.is_jumping && !obj.isOnGround) {
            obj.is_jumping = false;
            obj.speed_y = obj.default_speed;

        }


    }

    isOnGround(x_pos, y_pos, side, bias_x, bias_y, delta){
        const bottomLeftCorner = mapManager.getTilesetIdx(x_pos + bias_x, y_pos + side + delta);
        const bottomRightCorner = mapManager.getTilesetIdx(x_pos + side - bias_y, y_pos + side + delta);

        return bottomRightCorner !== 0 || bottomLeftCorner !== 0;
    }

    entityAtXY(obj, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            const e = gameManager.entities[i];
            if (e.name !== obj.name) {
                if (
                    x + obj.size_x < e.pos_x ||
                    y + obj.size_y < e.pos_y ||
                    x > e.pos_x + e.size_x ||
                    y > e.pos_y + e.size_y
                ) {
                    continue;
                }
                return e;
            }
        }
        return null;
    }
}