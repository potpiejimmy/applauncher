import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCopy, faPaste } from '@fortawesome/free-solid-svg-icons';
import { AppsApi } from '../services/appsapi';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: "cloud-dialog",
    templateUrl: "cloud.html"
})
export class CloudComponent {

    // icons:
    faCopy = faCopy; faPaste = faPaste;

    backupId: string = '';
    backupDelete: boolean = false;
    backupDone: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<CloudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private appsApi: AppsApi,
        public app: AppService,
        private snackBar: MatSnackBar
        ) {
            this.backupId = localStorage.getItem("backupId");
    }

    cancel(): void {
        this.dialogRef.close();
    }

    copyBackupId(inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0,0);
    }

    async pasteBackupId() {
        this.backupId = await navigator.clipboard.readText();
    }

    async backup() {
        this.backupId = (await this.appsApi.backupApps(this.backupId, {
            v: 1, /* version */
            apps: this.app.apps
        })).id;
        this.backupDone = true;
        localStorage.setItem("backupId", this.backupId);
    }

    async restore() {
        let data = await this.appsApi.restoreApps(this.backupId, this.backupDelete);
        if (data) {
            this.app.setAllApps(data.apps);
            if (this.backupDelete) {
                this.backupId = null;
                localStorage.removeItem("backupId");
            }
            this.cancel();
            this.snackBar.open("OK", "Successfully restored from cloud.", { duration: 3000 });
        } else {
            this.snackBar.open("Error", "Sorry, backup with ID " + this.backupId + " not found.", { duration: 5000 });
        }
    }
}
