import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../services/app.service';
import { EditDialogComponent } from './editdialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'pwa-launcher',
    templateUrl: './pwa-launcher.html',
    styleUrls: ['./pwa-launcher.scss']
})
export class PwaLauncherComponent {

    @Input()
    app: any;

    constructor(
        public application: AppService,
        public dialog: MatDialog
    ) { }

    onClick() {
        window.location.href = this.app.url;
    }

    onLongClick() {
        this.edit();
    }

    edit(): void {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '67%',
            position: {'top': '1em'},
            disableClose: true,
            data: JSON.parse(JSON.stringify(this.app))
        });
      
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
                this.application.removeApp(this.app);
            } else if (result) {
                this.app.name = result.name;
                this.app.url = result.url;
                this.app.icon = result.icon;
                this.application.save();
            }
        });
    }

}
