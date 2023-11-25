import {canvas, ctx, eventsManager, mapManager, recordManager, spriteManager} from "./main.js";
import {Player, Enemy} from "./Entity.js";

export default class GameManager {
    constructor() {
        this.factory = {};
        this.entities = [];
        this.player = null;
        this.laterKill = [];
        this.time_loop = null;

        this.startTime = null;
        this.endTime = null;
        this.elapsedTime = 0;
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

        if (eventsManager.action["hit"]) {
            this.player.hit();
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

    loadAll(levelPath) {
        mapManager.loadMap(levelPath);
        spriteManager.loadAtlas("../tiles/characters.json", "../tiles/all-characters.png");

        this.factory['Player'] = Player;
        this.factory['Enemy'] = Enemy;

        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventsManager.setup(canvas);
    }


    play() {
        this.startTime = Date.now();
        this.time_loop = setInterval(this.update.bind(this), 60);
    }
    stop(){
        if(this.time_loop!== null) clearInterval(this.time_loop);
    }

    win() {
        this.endTime = Date.now();
        this.elapsedTime = (this.endTime - this.startTime) / 1000; // Преобразование в секунды

        let savedUsername = localStorage.getItem('username');
        if (savedUsername !== null) {
            if (savedUsername.length > 0) {
                recordManager.addRecord(savedUsername, this.elapsedTime);
            }
        }

        this.stop();
        alert('You Win');
        window.location.href = 'index.html';
    }
    lose() {
        this.stop();
        alert('Game Over');
        window.location.href = 'index.html';

    }
}

