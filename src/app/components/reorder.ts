import { Component, ViewChild, Inject } from "@angular/core";
import { AppService } from '../services/app.service';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "reorder-apps",
    templateUrl: "reorder.html",
    styleUrls: ["reorder.scss"]
})
export class ReorderComponent {

    @ViewChild('appTable') table: MatTable<any>;
    displayedColumns: string[] = ['Reorder', 'Icon', 'Name', 'URL'];

    constructor(
        public dialogRef: MatDialogRef<ReorderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public app: AppService
    ) {}

    dropTable(event: CdkDragDrop<any>) {
        const prevIndex = this.app.findAppIndex(event.item.data);
        moveItemInArray(this.app.currentApps, prevIndex, event.currentIndex);
        this.table.renderRows();
        this.app.save();
    }
}
