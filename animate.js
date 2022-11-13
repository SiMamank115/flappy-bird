export function animate(sheet,data) {
    if (!sheet || !data) return;
    let res = [];
    if(data.frames.length > 0) {
        for (let i = 0; i < data.frames.length; i++) {
            let pos = data.frames[i].position;
            let img = sheet.get(pos.x, pos.y, pos.w, pos.h);
            res.push(img);
        }
    } else {
        res = [sheet];
    }
    return new Animation(res,data.size,data.collisionSize);
};
export class Animation {
    constructor(a,s,c) {
        this.size = s
        this.collisionSize = c
        this.animation = a
    }
    get(e) {
        return this.animation[e]
    }
}