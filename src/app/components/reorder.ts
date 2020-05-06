import { Component, ViewChild, Inject } from "@angular/core";
import { AppService } from '../services/app.service';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from './editdialog';

@Component({
    selector: "reorder-apps",
    templateUrl: "reorder.html"
})
export class ReorderComponent {

    @ViewChild('appTable') table: MatTable<any>;
    displayedColumns: string[] = ['Reorder', 'Icon', 'Name', 'URL', 'Actions'];

    editingRow: number = -1;

    constructor(
        public dialogRef: MatDialogRef<ReorderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public app: AppService,
        public dialog: MatDialog
    ) {}

    async delete(row: number) {
        this.stopEditing();
        this.app.removeApp(row);
        this.table.renderRows();
    }

    dropTable(event: CdkDragDrop<any>) {
        this.stopEditing();
        const prevIndex = this.app.apps.findIndex(d => d.url === event.item.data.url);
        moveItemInArray(this.app.apps, prevIndex, event.currentIndex);
        this.table.renderRows();
        this.app.save();
    }

    editRow(row: number): void {
        this.editingRow = row;
        console.log("Editing: " + row);
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '67%',
            position: {'top': '1em'},
            disableClose: true,
            data: JSON.parse(JSON.stringify(this.app.apps[row]))
        });
      
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.app.apps[row] = result;
                this.table.renderRows();
            }
            this.stopEditing();
        });
    }

    stopEditing(): void {
        console.log("DONE");
        this.editingRow = -1;
    }
}
