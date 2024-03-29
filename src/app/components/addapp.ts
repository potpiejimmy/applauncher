import { Component, ViewChild, Inject, AfterViewInit, ElementRef, OnInit } from "@angular/core";
import { AppService } from '../services/app.service';
import { AppsApi } from '../services/appsapi';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
    selector: "add-app",
    templateUrl: "addapp.html",
    styleUrls: ["addapp.scss"]
})
export class AddAppComponent implements OnInit, AfterViewInit {
    
    @ViewChild('inpurl') inpurl;
    @ViewChild('inpfilter') inpfilter;
    @ViewChild('inpfoldername') inpfoldername;

    _filter: string = '';
    _url: string = "https://";
    sensitive: boolean;
    community: boolean;

    folderName: string;

    communityApps: any = [];
    communityAppsFiltered = [];

    processing: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AddAppComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public app: AppService,
        private appsApi: AppsApi,
        private snackBar: MatSnackBar
    ) {}

    async ngOnInit() {
        this.communityApps = await this.appsApi.getCommunityApps();
        this.filterChanged();
    }

    ngAfterViewInit() {
        this.focus(this.inpfilter, 1000);
    }

    get filter() {
        return this._filter;
    }

    set filter(f: string) {
        this._filter = f;
        this.filterChanged();
    }

    filterChanged() {
        // filter client list:
        let lowfilter = this._filter.toLowerCase();
        this.communityAppsFiltered = this.communityApps.filter(c => 
            c.name.toLowerCase().indexOf(lowfilter)>=0 ||
            c.url.toLowerCase().indexOf(lowfilter)>=0);
    }

    get url() {
        return this._url;
    }

    set url(url: string) {
        this._url = url;
    }

    close(): void {
        this.dialogRef.close();
    }

    tabChanged(event: MatTabChangeEvent): void {
        if (event.index == 0) {
            this.focus(this.inpfilter);
        } else if (event.index == 1) {
            this.focus(this.inpurl);
        } else if (event.index == 2) {
            this.focus(this.inpfoldername);
        }
    }

    focus(element: ElementRef, delay: number = 500): void {
        setTimeout(()=>element.nativeElement.focus(), delay);
    }
    
    async addCommunityApp(app: any) {
        // simply copy community app:
        let appInfo = JSON.parse(JSON.stringify(app));
        appInfo.id = uuid();
        this.app.addApp(appInfo);
        this.close();
    }

    async addCustomApp() {
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
                appInfo = await this.appsApi.getAppInfo({
                    url: url,
                    suggestCommunity: this.community
                });
            }
            this.app.addApp(appInfo);
            this.close();
        } catch (err) {
            this.snackBar.open("Error", err, { duration: 10000 });
        } finally {
            this.processing = false;
        }
    }

    async addFolder() {
        let folder = {
            id: uuid(),
            url: "folder://",
            name: this.folderName,
            icon: '/assets/appfolder.png',
            apps: []
        };
        this.app.addApp(folder);
        this.app.openFolder(folder);
        this.close();
    }
}
