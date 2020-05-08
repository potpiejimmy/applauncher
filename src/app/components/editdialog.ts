import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../services/app.service';

@Component({
    selector: "edit-dialog",
    templateUrl: "editdialog.html"
})
export class EditDialogComponent {

    folderOptions: Array<any>;

    constructor(
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public app: AppService) {
            this.folderOptions = this.app.getFolders();
            this.folderOptions.unshift({id: 0, name: '<Root folder>'});
    }
}
