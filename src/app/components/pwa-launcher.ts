import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../services/app.service';
//import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'pwa-launcher',
    templateUrl: './pwa-launcher.html',
    styleUrls: ['./pwa-launcher.scss']
})
export class PwaLauncherComponent implements OnInit {

    @Input()
    app: any;

    constructor(
        public application: AppService
    ) { }

    ngOnInit(): void {
//      let res = this.http.get(this.url).toPromise();
//      console.log(JSON.stringify(res));
    }

    onClick() {
        window.location.href = this.app.url;
    }

    onLongClick() {
        alert("LONG CLICK");
    }
}
