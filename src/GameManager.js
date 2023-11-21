import {eventsManager, mapManager, spriteManager} from "./main.js";
import {Player, Enemy, Reward} from "./Entity.js";

export default class GameManager {
    constructor() {
        this.factory = {};
        this.entities = [];
        this.fireNum = 0;
        this.player = null;
        this.laterKill = [];
    }

    initPlayer(obj) {
        this.player = obj;
    }

    kill(obj) {
        this.laterKill.push(obj);
    }

    update() {
        if (this.player === null) {
            return;
        }

        this.player.move_x = 0;
        this.player.move_y = 0;

        if (eventsManager.action["up"]) {
            this.player.move_y = -1;
        }
        if (eventsManager.action["down"]) {
            this.player.move_y = 1;
        }
        if (eventsManager.action["left"]) {
            this.player.move_x = -1;
        }
        if (eventsManager.action["right"]) {
            this.player.move_x = 1;
        }

        if (eventsManager.action["fire"]) {
            this.player.fire();
        }

        this.entities.forEach((e) => {
            try {
                e.update();
            } catch (ex) {}
        });

        this.laterKill.forEach((kill) => {
            const idx = this.entities.indexOf(kill);
            if (idx > -1) {
                this.entities.splice(idx, 1);
            }
        });

        if (this.laterKill.length > 0) {
            this.laterKill.length = 0;
        }

        mapManager.draw(ctx);
        mapManager.centerAt(this.player.pos_x, this.player.pos_y);
        this.draw(ctx);
    }

    draw(ctx) { }

    loadAll() {
        mapManager.loadMap("tilemap.json");
        spriteManager.loadAtlas("atlas.json", "img/tankattack.png");

        this.factory['Player'] = Player;
        this.factory['Reward'] = Reward;
        this.factory['Enemy'] = Enemy;

        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventsManager.setup(canvas);
    }

    updateWorld(){
        this.update();
    }

    play() {
        setInterval(this.updateWorld, 100);
    }
}

