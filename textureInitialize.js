class Texture {
    constructor() {
        this.list = [];
        this.sheet = {};
        this.animations = {};
    }
    init(e) {
        loadImage(e.url,function(cb) {
            cb.size = e.size
            cb.collisionSize = e.collisionSize
            texture.sheet[e.name] = cb;
            texture.list.push(e.name)
            if(e.animated) {
                texture.animations[e.name] = animate(cb,e);
            }
        })
    }
}

const texture = new Texture();
