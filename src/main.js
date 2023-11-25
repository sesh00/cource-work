import MapManager from "./MapManager.js";
import EventsManager from "./EventsManager.js";
import GameManager from "./GameManager.js";
import PhysicManager from "./PhysicManager.js";
import SpriteManager from "./SpriteManager.js";
import RecordManager from "./RecordManager.js";


export let canvas = document.getElementById("canvasId");
export let ctx = canvas.getContext("2d");
export let mapManager = new MapManager();
export let spriteManager = new SpriteManager();
export let gameManager = new GameManager();
export let physicManager = new PhysicManager();
export let eventsManager = new EventsManager();
export let recordManager = new RecordManager();

export const levelPaths = {
    level1: "../tiles/level1.json",
    level2: "../tiles/level2.json",
};


export function recreateAllManagers() {
    canvas = document.getElementById("canvasId");
    ctx = canvas.getContext("2d");

    mapManager = new MapManager();
    spriteManager = new SpriteManager();
    gameManager = new GameManager();
    physicManager = new PhysicManager();
    eventsManager = new EventsManager();
    recordManager = new RecordManager();

    gameManager.loadAll(levelPaths.level1);
    gameManager.play();
}

recreateAllManagers();
