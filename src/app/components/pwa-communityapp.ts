import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppService } from "../services/app.service";

@Component({
    selector: "pwa-community-app",
    templateUrl: "pwa-communityapp.html"
})
export class PwaCommunityAppComponent {

    @Input()
    app: any;

    @Output()
    buttonClick: EventEmitter<void> = new EventEmitter();

    constructor(
        public application: AppService
    ) {}

}
