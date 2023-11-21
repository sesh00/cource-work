export default class EventsManager {
    constructor() {
        this.bind = [];
        this.action = [];
    }

    setup(canvas) {
        this.bind[87] = 'up';
        this.bind[65] = 'left';
        this.bind[83] = 'down';
        this.bind[68] = 'right';
        this.bind[32] = 'fire';
        
        document.body.addEventListener("keydown", this.onKeyDown.bind(this));
        document.body.addEventListener("keyup", this.onKeyUp.bind(this));
    }


    onKeyDown(event) {
        const action = this.bind[event.keyCode];
        if (action) {
            this.action[action] = true;
        }
    }

    onKeyUp(event) {
        const action = this.bind[event.keyCode];
        if (action) {
            this.action[action] = false;
        }
    }
}