import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCopy, faPaste } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "cloud-dialog",
    templateUrl: "cloud.html"
})
export class CloudComponent {

    // icons:
    faCopy = faCopy; faPaste = faPaste;

    backupId: string = '';

    constructor(
        public dialogRef: MatDialogRef<CloudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
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
}
