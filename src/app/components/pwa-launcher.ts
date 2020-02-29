import { Component, OnInit, Input } from '@angular/core';
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
//      protected http: HttpClient
    ) { }

    ngOnInit(): void {
//      let res = this.http.get(this.url).toPromise();
//      console.log(JSON.stringify(res));
    }
}
