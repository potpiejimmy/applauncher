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
            this.app.addApp(await this.appsApi.getAppInfo(url));
        } catch (err) {
            this.snackBar.open("Error", err, { duration: 7000 });
        }
    }

    async delete(row: number) {
        this.app.removeApp(row);
    }
}
