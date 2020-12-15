import { Component, Input } from "@angular/core";
import { AppService } from "../services/app.service";

@Component({
    selector: "pwa-community-app",
    templateUrl: "pwa-communityapp.html"
})
export class PwaCommunityAppComponent {

    @Input()
    app: any;

    constructor(
        public application: AppService
    ) {}

}
