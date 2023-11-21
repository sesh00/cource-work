import {gameManager, mapManager} from "./main.js";

export default class PhysicManager {
    update(obj) {
        if (obj.move_x === 0 && obj.move_y === 0) {
            return "stop";
        }

        const newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        const newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);
        console.log(obj.pos_y);
        console.log(obj.pos_x);

        const ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y / 2);
        const e = this.entityAtXY(obj, newX, newY);
/*
        if (e !== null && obj.onTouchEntity) {
            obj.onTouchEntity(e);
        }

        if (ts !== 7 && obj.onTouchMap) {
            obj.onTouchMap(ts);
        }*/

      //  if (ts === 7 && e === null) {
        obj.pos_x = newX;
        obj.pos_y = newY;

        console.log(obj.pos_y);
        console.log(obj.pos_x);
       /* } else {
            return "break";
        }*/

        return "move";
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