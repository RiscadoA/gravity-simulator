import * as PIXI from 'pixi.js';

const TIME_SCALE = 0.001;

export class App {
    private app: PIXI.Application;

    constructor(parent: HTMLElement, width: number, height: number) {
        this.app = new PIXI.Application({ width, height, backgroundColor: 0x000000 });
        parent.replaceChild(this.app.view, parent.lastElementChild!);
        parent.appendChild(this.app.view);
    }
}
