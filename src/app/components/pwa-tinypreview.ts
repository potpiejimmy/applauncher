import { Component, Input } from "@angular/core";
import { AppService } from '../services/app.service';

@Component({
    selector: "pwa-tiny-preview",
    templateUrl: "pwa-tinypreview.html"
})
export class PwaTinyPreviewComponent {

    @Input()
    app: any;

    constructor(
        public application: AppService
    ) {}
}
