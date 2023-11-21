import MapManager from "./MapManager.js";
import EventsManager from "./EventsManager.js";
import GameManager from "./GameManager.js";
import PhysicManager from "./PhysicManager.js";
import SpriteManager from "./SpriteManager.js";

export let canvas = document.getElementById("canvasId");
export let ctx = canvas.getContext("2d");
export let mapManager = new MapManager();
export let spriteManager = new SpriteManager();
export let gameManager = new GameManager();
export let physicManager = new PhysicManager();
export let eventsManager = new EventsManager();

gameManager.loadAll();
gameManager.play();
