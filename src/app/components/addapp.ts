import { Component, ViewChild, Inject } from "@angular/core";
import { AppService } from '../services/app.service';
import { AppsApi } from '../services/appsapi';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "add-app",
    templateUrl: "addapp.html"
})
export class AddAppComponent {
    
    @ViewChild('name') inpname;

    _url: string = "https://";
    sensitive: boolean;
    filterChange: Subject<any>;
    filteredSuggestions: Observable<any>;

    processing: boolean = false;

    suggestions = [{
            name: "A Better Routeplanner",
            icon: "https://abetterrouteplanner.com/icon/abrp_icon.png",
            url: "https://abetterrouteplanner.com"
        },{
            name: "Chargeprice",
            icon: "https://chargeprice.app/img/logos/android-chrome-192x192.png",
            url: "https://chargeprice.app"
        },{
            name: "Google Maps",
            icon: "https://maps.gstatic.com/mapfiles/maps_lite/pwa/icons/maps15_bnuw3a_round_192x192.png",
            url: "https://maps.google.com"
        },{
            name: "lunch.community",
            icon: "https://lunch.community/assets/icons/icon-72x72.png",
            url: "https://lunch.community"
        },{
            name: "PlugShare",
            icon: "https://plugshare.com/favicon.ico",
            url: "https://plugshare.com"
        },{
            name: "Tesla",
            icon: "https://tesla.com/themes/custom/tesla_frontend/assets/favicons/apple-touch-icon-57x57.png",
            url: "https://tesla.com"
        },{
            name: "TeslaFi.com",
            icon: "https://teslafi.com/favicon.png",
            url: "https://teslafi.com"
        },{
            name: "TeslaFi.com Firmware Tracker",
            icon: "/assets/www.png",
            url: "https://teslafi.com/firmware"
        },{
            name: "Tripadvisor",
            icon: "https://static.tacdn.com/favicon.ico?v2",
            url: "https://tripadvisor.com"
        },{
            name: "Yelp",
            icon: "https://s3-media0.fl.yelpcdn.com/assets/public/favicon.yelp_styleguide.yji-118ff475a341620f50dfbaddb83efb25.ico",
            url: "https://yelp.com"
        },{
            name: "YouTube",
            icon: "https://www.gstatic.com/youtube/img/branding/favicon/favicon_48x48.png",
            url: "https://m.youtube.com"
        },{
            name: "Zattoo",
            icon: "https://zattoo.com/projects/common/src/aura/image/favicon/192x192.png",
            url: "https://zattoo.com"
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<AddAppComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public app: AppService,
        private appsApi: AppsApi,
        private snackBar: MatSnackBar
    ) {
        this.filterChange = new Subject();
        this.filteredSuggestions = this.filterChange.pipe(
            startWith(''),
            map(urlpart => urlpart ? this._filteredSuggestions(urlpart) : [])
          );
    }
    
    private _filteredSuggestions(value: string): any {
        const filterValue = value.toLowerCase();
        return this.suggestions.filter(app => app.url.toLowerCase().indexOf(filterValue) >= 0);
    }

    get url() {
        return this._url;
    }

    set url(url: string) {
        this._url = url;
        this.filterChange.next(url.indexOf('://') > 0 ? url.substr(url.indexOf('://') + 3) : url);
    }

    close(): void {
        this.dialogRef.close();
    }

    async add() {
        this.processing = true;
        try {
            let url = this.url;
            this.url = "https://";
            console.log("Adding: " + url);
            let appInfo;
            if (this.sensitive) {
                appInfo = {
                    id: uuid(),
                    url: url,
                    name: url,
                    icon: '/assets/lock.png'
                }
            } else {
                appInfo = await this.appsApi.getAppInfo(url);
            }
            this.app.addApp(appInfo);
            this.close();
        } catch (err) {
            this.snackBar.open("Error", err, { duration: 10000 });
        } finally {
            this.processing = false;
        }
    }
}
