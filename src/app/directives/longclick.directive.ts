import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
    selector: "[long-click]"
})
export class LongClickDirective {

    duration: number = 1000;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    @Output() onLongClick: EventEmitter<any> = new EventEmitter();

    private pressing: boolean;
    private timeout: any;

    private startX: number = 0;
    private startY: number = 0;

    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
        if(event.which !== 1) return;

        this.startX = event.clientX;
        this.startY = event.clientY;

        this.pressing = true;

        this.timeout = setTimeout(() => this.endPress(this.onLongClick), this.duration);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event) {
        if (this.pressing) {
            const xThres = Math.abs(event.clientX - this.startX) > 10;
            const yThres = Math.abs(event.clientY - this.startY) > 10;
            if (xThres || yThres) this.endPress(null);
        }
    }

    @HostListener('mouseup')
    onMouseUp() {
        if (this.pressing) this.endPress(this.onClick);
    }

    endPress(emitter: EventEmitter<any>) {
        clearTimeout(this.timeout);
        this.pressing = false;
        if (emitter) emitter.emit(null);
    }
}
