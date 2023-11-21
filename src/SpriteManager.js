import {mapManager} from "./main.js";

export default class SpriteManager {
    constructor() {
        this.image = new Image();
        this.sprites = [];
        this.imgLoaded = false;
        this.jsonLoaded = false;
    }

    loadAtlas(atlasJson, atlasImg) {
        let request = new XMLHttpRequest();

        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                this.parseAtlas(request.responseText);
            }
        };

        request.open("GET", atlasJson, true);
        request.send();
        this.loadImg(atlasImg);
    }

    parseAtlas(atlasJSON) {
        let atlas = JSON.parse(atlasJSON);
        for (let name in atlas.frames) {
            let frame = atlas.frames[name].frame;
            this.sprites.push({ name: name, x: frame.x, y: frame.y, w: frame.w, h: frame.h });
        }
        this.jsonLoaded = true;
    }

    loadImg(imgName) {
        this.image.onload = () => {
            this.imgLoaded = true;
        };
        this.image.src = imgName;
    }
    


    drawSprite(ctx, name, x, y) {
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(() => this.drawSprite(ctx, name, x, y), 100);
        } else {
            let sprite = this.getSprite(name);
            if (!mapManager.isVisible(x, y, sprite.w, sprite.h))
                return;

            x -= mapManager.view.x;
            y -= mapManager.view.y;

            ctx.drawImage(this.image, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
        }
    }

    getSprite(name) {
        for (let i = 0; i < this.sprites.length; i++) {
            let s = this.sprites[i];
            if (s.name === name)
                return s;
        }
        return null;
    }
}
