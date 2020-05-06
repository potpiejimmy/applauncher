import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { CloudComponent } from './components/cloud';
import { MatDialog } from '@angular/material/dialog';
import { AddAppComponent } from './components/addapp';
import { ReorderComponent } from './components/reorder';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'App Launcher';

    constructor(
        public app: AppService,
        public dialog: MatDialog
    ) {
    }

    async ngOnInit() {
    }

    fullscreen() {
        window.location.href='https://youtu.be/j8hGCA9rNKM';//'https://youtube.com/redirect?q=applauncher.site';
    }

    get modeToggleIcon(): string {
        return this.app.mode == 'Light' ? 'nights_stay' : 'wb_sunny';
    }

    info() {
        window.location.href='https://twitter.com/potpiejimmy';
    }

    cloud() {
        this.openDialog(CloudComponent);
    }

    add() {
        this.openDialog(AddAppComponent);
    }

    reorder() {
        this.openDialog(ReorderComponent);
    }

    openDialog(component) {
        const dialogRef = this.dialog.open(component, {
            width: '67%',
            position: {'top': '1em'},
            data: {}
        });
      
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }
}
