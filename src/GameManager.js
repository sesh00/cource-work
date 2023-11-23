import {canvas, ctx, eventsManager, mapManager, spriteManager} from "./main.js";
import {Player, Enemy, Reward} from "./Entity.js";

export default class GameManager {
    constructor() {
        this.factory = {};
        this.entities = [];
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
        if (eventsManager.action["jump"]) {
            this.player.jump();
        }
        if (eventsManager.action["left"]) {
            this.player.move_x = -1;
        }
        if (eventsManager.action["right"]) {
            this.player.move_x = 1;
        }



        this.entities.forEach((e) => {
            try {
                e.update();
            } catch (ex) {
                console.log(ex)
            }


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

    draw(ctx) {
        for(let e = 0; e < this.entities.length; e++)
            this.entities[e].draw(ctx);
    }

    loadAll() {
        mapManager.loadMap("../tiles/level1.json");
        spriteManager.loadAtlas("../tiles/characters.json", "../tiles/all-characters.png");

        this.factory['Player'] = Player;
        this.factory['Reward'] = Reward;
        this.factory['Enemy'] = Enemy;

        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventsManager.setup(canvas);
    }


    play() {
        setInterval(this.update.bind(this), 40);

    }
}

