class MapManager {
    constructor() {
        this.imgLoadCount = 0;
        this.imgLoaded = false;
        this.jsonLoaded = false
        this.mapData = null;
        this.tLayer = [];
        this.xCount = 0;
        this.yCount = 0;
        this.tSize = {x: 16, y: 16};
        this.mapSize = {x: 30, y: 15};
        this.tilesets = [];
    }

    parseMap(tilesJSON) {
        this.mapData = JSON.parse(tilesJSON);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount * this.tSize.x;
        this.mapSize.y = this.yCount * this.tSize.y;

        const loadImage = (tileset) => {
            const img = new Image();
            img.onload = () => {
                this.imgLoadCount++;
                if (this.imgLoadCount === this.mapData.tilesets.length) {
                    this.imgLoaded = true;
                    this.draw(ctx);
                }
            };

            img.src = `../tiles/${tileset.image}`;
            return img;
        };

        for (let i = 0; i < this.mapData.tilesets.length; i++) {
            const t = this.mapData.tilesets[i];
            const img = loadImage(t);
            const ts = {
                firstgid: t.firstgid,
                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth / this.tSize.x),
                yCount: Math.floor(t.imageheight / this.tSize.y)
            };

            this.tilesets.push(ts);
        }
        this.jsonLoaded = true;
    }

    loadMap(path) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                this.parseMap(request.responseText);
            }
        };
        request.open("GET", path, true);
        request.send();
    }

     getTileSet(tileIndex) {
        for (let i = this.tilesets.length - 1; i >= 0; i--)
            if (this.tilesets[i].firstgid <= tileIndex) {
                return this.tilesets[i];
            }
        return null;
    }


    getTile(tileIndex) {
        let tile = {
            img: null,
            px: 0, py: 0
        };

        let tileSet = this.getTileSet(tileIndex);

        if (tileSet && tileSet.image.complete) {
            tile.img = tileSet.image;
            let id = tileIndex - tileSet.firstgid;
            let x = id % tileSet.xCount;
            let y = Math.floor(id / tileSet.xCount);
            tile.px = x * this.tSize.x;
            tile.py = y * this.tSize.y;
        }

        return tile;
    }



    draw(ctx) {
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(() => this.draw(ctx), 100);
        } else {

            if (this.tLayer.length === 0) {
                for (let id = 0; id < this.mapData.layers.length; id++) {
                    const layer = this.mapData.layers[id];
                    if (layer.type === "tilelayer") {
                        this.tLayer.push(layer);
                    }
                }
            }

            for(let j = 0; j < this.tLayer.length; j++) {
                for (let i = 0; i < this.tLayer[j].data.length; i++) {
                    if (this.tLayer[j].data[i] !== 0) {
                        const tile = this.getTile(this.tLayer[j].data[i]);
                        const pX = (i % this.xCount) * this.tSize.x;
                        const pY = Math.floor(i / this.xCount) * this.tSize.y;

                        if (tile.img instanceof HTMLImageElement) {
                            ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, pX, pY, this.tSize.x, this.tSize.y);
                        } else {
                            console.error("Invalid tile.img type:", tile.img);
                        }
                    }
                }
            }
        }
    }



    //  parseEntities() {
    //     if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
    //         setTimeout(function () { mapManager.parseEntities(); }, 100);
    //     } else
    //         for (let j = 0; j < this.mapData.layers.length; j++)
    //
    //             if(this.mapData.layers[j].type === 'objectgroup') {
    //                 let entities = this.mapData.layers[j];
    //
    //                 for (let i = 0; i < entities.objects.length; i++) {
    //                     let e = entities.objects[i];
    //                     try {
    //                         let obj = Object.create(gameManager.factory[e.type]);
    //
    //                         obj.name = e.name;
    //                         obj.pos_x = e.x;
    //                         obj.pos_y = e.y;
    //                         obj.size_x = e.width;
    //                         obj.size_y = e.height;
    //
    //                         gameManager.entities.push(obj);
    //                         if(obj.name === "player")
    //
    //                             gameManager.initPlayer(obj);
    //                     } catch (ex) {
    //                         console.log("Error while creating: [" + e.gid + "] " + e.type +
    //                             ", " + ex);
    //                     }
    //                 }
    //             }
    // }


}
