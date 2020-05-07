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

    touching: boolean = false;

    constructor(
        public application: AppService,
        public dialog: MatDialog
    ) { }

    touchStart() {
        this.touching = true;
    }

    touchEnd() {
        this.touching = false;
    }

    onClick() {
        if (this.app.url == 'folder://') {
            this.application.openFolder(this.app);
        } else {
            window.location.href = this.app.url;
        }
    }

    onLongClick() {
        this.touchEnd();
        this.edit();
    }

    get modeClass() {
        return this.application.modeClass + (this.touching ? 'Focus' : '');
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
