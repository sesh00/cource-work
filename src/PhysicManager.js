import { gameManager, mapManager} from "./main.js";

export default class PhysicManager {

    getSpace(x_pos, y_pos, side, bias_x, bias_y, layer = 2){
        const topLeftCorner = mapManager.getTileSetIdx(x_pos + bias_x, y_pos + bias_y, layer);
        const topRightCorner = mapManager.getTileSetIdx(x_pos + side - bias_x, y_pos + bias_y, layer);
        const bottomLeftCorner = mapManager.getTileSetIdx(x_pos + bias_x, y_pos + side, layer);
        const bottomRightCorner = mapManager.getTileSetIdx(x_pos + side - bias_y, y_pos + side, layer);

        return {
            topLeftCorner: topLeftCorner,
            topRightCorner: topRightCorner,
            bottomLeftCorner: bottomLeftCorner,
            bottomRightCorner: bottomRightCorner
        };
    }

    getWall(x_pos, y_pos, side, bias_x = 20, bias_y = 20) {
        const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } = this.getSpace(x_pos, y_pos, side, bias_x, bias_y);
        return topLeftCorner === 0 && topRightCorner === 0 && bottomLeftCorner === 0 && bottomRightCorner === 0;
    }
    getReward(x_pos, y_pos, side, bias_x = 20, bias_y = 20) {
        const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } = this.getSpace(x_pos, y_pos, side, bias_x, bias_y, 1);
        return topLeftCorner === 83 && topRightCorner === 83 && bottomLeftCorner === 83 && bottomRightCorner === 83;

    }

    getWin(x_pos, y_pos, side, bias_x = 20, bias_y = 20) {
        const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } = this.getSpace(x_pos, y_pos, side, bias_x, bias_y, 1);
        return topLeftCorner === 15 && topRightCorner === 15 && bottomLeftCorner === 15 && bottomRightCorner === 15;

    }

    getLose(x_pos, y_pos, side, bias_x = 20, bias_y = 20) {
        const { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner } = this.getSpace(x_pos, y_pos, side, bias_x, bias_y, 0);
        return topLeftCorner === 94 || topRightCorner === 94 || bottomLeftCorner === 94 ||  bottomRightCorner === 94;

    }

    update(obj) {
        if (this.getReward(obj.pos_x, obj.pos_y, obj.size_x)) {
            mapManager.setTileSetByIdx(obj.pos_x + obj.size_x/2, obj.pos_y + obj.size_x/2, 85, 1);
            obj.reward_count++;
        }

        if (this.getWin(obj.pos_x, obj.pos_y, obj.size_x)) {
            if( obj.reward_count === mapManager.rewardCount){
                gameManager.win();
            }
        }

        if (this.getLose(obj.pos_x, obj.pos_y, obj.size_x)) {
            gameManager.lose();
        }

        if(!obj.isOnGround && !obj.is_jumping){
            obj.move_y = 1;
            obj.speed_y *= obj.g1;
        }

        if(obj.is_jumping && obj.isOnGround) {
            obj.move_y = -1;
            obj.speed_y = obj.jump_force;
        }

        const newX = obj.pos_x + Math.floor(obj.move_x * obj.speed_x);
        const newY = obj.pos_y + Math.floor(obj.move_y * obj.speed_y);


        while(this.getWall(obj.pos_x, obj.pos_y, obj.size_x)) {
            obj.pos_y = obj.pos_y + Math.floor(obj.move_y);
            if (obj.pos_y === newY) break;
        }

        obj.pos_y = obj.pos_y - Math.floor(obj.move_y);

        while(this.getWall(obj.pos_x, obj.pos_y, obj.size_x)) {
            obj.pos_x = obj.pos_x + Math.floor(obj.move_x);
            if (obj.pos_x === newX) break;
        }
        obj.pos_x = obj.pos_x - Math.floor(obj.move_x);

        obj.isOnGround = this.isOnGround(obj.pos_x, obj.pos_y, obj.size_x);

        if(obj.is_jumping && !obj.isOnGround) {
            obj.speed_y = Math.max(obj.speed_lim, obj.speed_y / obj.g2)

            if (obj.speed_y === obj.speed_lim){
                obj.is_jumping = false;
            }
        }

        if (!obj.is_jumping && obj.isOnGround){
            obj.speed_y = obj.speed_lim;
        }


    }

    isOnGround(x_pos, y_pos, side, bias_x = 20, bias_y = 20, delta = 1){
        const bottomLeftCorner = mapManager.getTileSetIdx(x_pos + bias_x, y_pos + side + delta);
        const bottomRightCorner = mapManager.getTileSetIdx(x_pos + side - bias_y, y_pos + side + delta);

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