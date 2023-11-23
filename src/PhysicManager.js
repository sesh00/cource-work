import {gameManager, mapManager} from "./main.js";

export default class PhysicManager {
    update(obj) {
        const newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        let newY = obj.pos_y + Math.floor(obj.velocityY * obj.speed);
        let ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y / 2);
        const e = this.entityAtXY(obj, newX, newY);


        if (ts === 0 && e === null) {
            obj.pos_x = newX;
            obj.pos_y = newY;
        } else {
            obj.pos_y = newY;
        }

        if (!this.isOnGround(obj)) {
            obj.velocityY += obj.gravity; // не на земле начинаем тянуть
            if (obj.velocityY > 0) obj.velocityY = 1;
        } else {
            obj.velocityY = 0; // на земле не тянем никуда
        }

    }

    isOnGround(obj) {
        const currentX = obj.pos_x;
        const currentY = obj.pos_y + mapManager.tSize.y;
        const ts = mapManager.getTilesetIdx(currentX, currentY);
        return ts !== 0
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