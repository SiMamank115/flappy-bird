class Animate {
    constructor(sheet, data) {
        this.spritesheet = sheet;
        this.spritedata = data;
        this.animation = [];
        this.index = 0;
        if (sheet && data) {
            let frames = this.spritedata.frames;
            for (let i = 0; i < frames.length; i++) {
                let pos = frames[i].position;
                let img = this.spritesheet.get(pos.x, pos.y, pos.w, pos.h);
                this.animation.push(img);
            }
        } else {
            this.animation.push(this.spritesheet);
        }
    }
    get(i) {
        return this.animation[i];
    }
    timeLine(a) {
        if (a) {
            this.index += a;
        } else {
            this.index %= this.animation.length - 1;
        }
    }
    getTimeLine() {
        return this.index;
    }
}