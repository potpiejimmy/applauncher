import { Component, ViewChild } from "@angular/core";
import { AppService } from '../services/app.service';
import { AppsApi } from '../services/appsapi';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: "add-app",
    templateUrl: "addapp.html"
})
export class AddAppComponent {
    
    @ViewChild('name') inpname;
    displayedColumns: string[] = ['Icon', 'Name', 'URL', 'Actions'];

    url: string;
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
            let url = 'https://' + this.url;
            this.url = "";
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
}
