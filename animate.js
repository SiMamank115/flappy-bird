const animate = (sheet,data) => {
    if (!sheet || !data) return;
    let res = [];
    for (let i = 0; i < data.frames.length; i++) {
        let pos = data.frames[i].position;
        let img = sheet.get(pos.x, pos.y, pos.w, pos.h);
        res.push(img);
    }
    return new Animation(res,data.size,data.collisionSize);
};
class Animation {
    constructor(a,s,c) {
        this.size = s
        this.collisionSize = c
        this.animation = a
    }
    get(e) {
        return this.animation[e]
    }
}