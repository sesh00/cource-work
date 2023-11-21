import MapManager from "./MapManager.js";
import EventsManager from "./EventsManager.js";
import GameManager from "./GameManager.js";
import PhysicManager from "./PhysicManager.js";
import SpriteManager from "./SpriteManager.js";

let canvas = document.getElementById("canvasId");
let ctx = canvas.getContext("2d");
export let mapManager = new MapManager();
export let spriteManager = new SpriteManager();
export let gameManager = new GameManager();
export let physicManager = new PhysicManager();
export let eventsManager = new EventsManager();


mapManager.loadMap("../tiles/platform.json");
spriteManager.loadAtlas("../tiles/characters.json", "../tiles/all-characters.png");
mapManager.parseEntities();
mapManager.draw(ctx);