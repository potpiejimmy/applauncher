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
        if (this.application.isFolder(this.app)) {
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
        let appCopy = JSON.parse(JSON.stringify(this.app));
        let oldFolderId = this.application.currentFolder && this.application.currentFolder.id || 0;
        appCopy.currentFolderId = oldFolderId;
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '67%',
            position: {'top': '1em'},
            disableClose: true,
            data: appCopy
        });
      
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
                this.application.removeApp(this.app);
            } else if (result) {
                this.app.name = result.name;
                this.app.url = result.url;
                this.app.icon = result.icon;
                if (result.currentFolderId != oldFolderId) {
                    // folder was changed - remove and re-add to new folder:
                    this.application.removeApp(this.app);
                    if (!result.currentFolderId) {
                        // move to root folder:
                        this.application.closeFolderImmediate();
                    } else {
                        this.application.openFolderImmediate(this.application.apps.find(i => i.id == result.currentFolderId));
                    }
                    this.application.addApp(this.app);
                }
                this.application.save();
            }
        });
    }

}
