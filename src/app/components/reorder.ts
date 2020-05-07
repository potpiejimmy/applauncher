import { Component, ViewChild, Inject } from "@angular/core";
import { AppService } from '../services/app.service';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "reorder-apps",
    templateUrl: "reorder.html"
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
        const prevIndex = this.app.apps.findIndex(d => d.url === event.item.data.url);
        moveItemInArray(this.app.apps, prevIndex, event.currentIndex);
        this.table.renderRows();
        this.app.save();
    }
}
