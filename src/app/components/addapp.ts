import { Component, ViewChild } from "@angular/core";
import { AppService } from '../services/app.service';
import { AppsApi } from '../services/appsapi';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { Subject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './editdialog';

@Component({
    selector: "add-app",
    templateUrl: "addapp.html"
})
export class AddAppComponent {
    
    @ViewChild('name') inpname;
    @ViewChild('appTable') table: MatTable<any>;
    displayedColumns: string[] = ['Reorder', 'Icon', 'Name', 'URL', 'Actions'];

    _url: string = "https://";
    sensitive: boolean;
    filterChange: Subject<any>;
    filteredSuggestions: Observable<any>;

    editingRow: number = -1;

    suggestions = [{
            name: "A Better Routeplanner",
            icon: "https://abetterrouteplanner.com/icon/abrp_icon.png",
            url: "https://new.abetterrouteplanner.com"
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
        public app: AppService,
        private appsApi: AppsApi,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {
        this.app.editingComponent = this;
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

    edit() {
        this.app.editing = true;
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 500);
    }

    save() {
        this.app.save();
        this.app.editing = false;
    }

    async add() {
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
            this.table.renderRows();
        } catch (err) {
            this.snackBar.open("Error", err, { duration: 10000 });
        }
    }

    async delete(row: number) {
        this.stopEditing();
        this.app.removeApp(row);
        this.table.renderRows();
    }

    dropTable(event: CdkDragDrop<any>) {
        this.stopEditing();
        const prevIndex = this.app.apps.findIndex(d => d.url === event.item.data.url);
        moveItemInArray(this.app.apps, prevIndex, event.currentIndex);
        this.table.renderRows();
    }

    editRow(row: number): void {
        this.editingRow = row;
        console.log("Editing: " + row);
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '67%',
            position: {'top': '1em'},
            disableClose: true,
            data: JSON.parse(JSON.stringify(this.app.apps[row]))
        });
      
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.app.apps[row] = result;
                this.table.renderRows();
            }
            this.stopEditing();
        });
    }

    stopEditing(): void {
        console.log("DONE");
        this.editingRow = -1;
    }
}
