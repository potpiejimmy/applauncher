import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "edit-dialog",
    templateUrl: "editdialog.html"
})
export class EditDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
    
    cancel(): void {
        this.dialogRef.close();
    }
}
