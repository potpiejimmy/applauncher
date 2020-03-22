import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "cloud-dialog",
    templateUrl: "cloud.html"
})
export class CloudComponent {

    constructor(
        public dialogRef: MatDialogRef<CloudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
