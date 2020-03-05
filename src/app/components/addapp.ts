import { Component, ViewChild } from "@angular/core";
import { AppService } from '../services/app.service';
import { AppsApi } from '../services/appsapi';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

@Component({
    selector: "add-app",
    templateUrl: "addapp.html"
})
export class AddAppComponent {
    
    @ViewChild('name') inpname;
    @ViewChild('appTable') table: MatTable<any>;
    displayedColumns: string[] = ['Reorder', 'Icon', 'Name', 'URL', 'Actions'];

    url: string = "https://";
    sensitive: boolean;

    constructor(
        public app: AppService,
        private appsApi: AppsApi,
        private snackBar: MatSnackBar
    ) {
        this.app.editingComponent = this;
    }

    edit() {
        this.app.editing = true;
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 500);
    }

    cancel() {
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
                    url: url,
                    name: url,
                    icon: '/assets/lock.png'
                }
            } else {
                appInfo = await this.appsApi.getAppInfo(url);
            }
            this.app.addApp(appInfo);
        } catch (err) {
            this.snackBar.open("Error", err, { duration: 10000 });
        }
    }

    async delete(row: number) {
        this.app.removeApp(row);
    }

    dropTable(event: CdkDragDrop<any>) {
        const prevIndex = this.app.apps.findIndex(d => d.url === event.item.data.url);
        moveItemInArray(this.app.apps, prevIndex, event.currentIndex);
        this.table.renderRows();
    }
}
