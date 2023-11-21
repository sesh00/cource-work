export class SpriteManager {
    constructor() {
        this.image = new Image();
        this.sprites = [];
        this.imgLoaded = false;
        this.jsonLoaded = false;
    }
    loadAtlas(atlasJson, atlasImg) {
        let request = new XMLHttpRequest();
       
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                this.parseAtlas(request.responseText);
               
            }
        };
        request.open("GET", atlasJson, true);
        request.send();
        this.loadImg(atlasImg);
    }

    parseAtlas(responseText) {
        
    }

    loadImg(atlasImg) {
        
    }
}
