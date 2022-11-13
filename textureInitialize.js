import { Animation, animate } from "./animate.js";
class Texture {
    constructor() {
        this.list = [];
        this.sheet = {};
        this.animations = {};
    }
    init(e,res) {
        loadImage(e.url,function(cb) {
            cb.size = e.size
            cb.collisionSize = e.collisionSize
            res.sheet[e.name] = cb;
            res.list.push(e.name)
            if(e.animated) {
                res.animations[e.name] = animate(cb,e);
            }
            console.log(true);
        }, (e) => {
            console.log(false);
        })
    }
}

export const texture = new Texture();
