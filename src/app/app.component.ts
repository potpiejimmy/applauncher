import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'App Launcher';

    constructor(
        public app: AppService
    ) {
    }

    async ngOnInit() {
    }

    fullscreen() {
        window.location.href='https://youtube.com/redirect?q=applauncher.site';
    }
}
