import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { CloudComponent } from './components/cloud';
import { MatDialog } from '@angular/material/dialog';
import { AddAppComponent } from './components/addapp';
import { ReorderComponent } from './components/reorder';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('folderAnim', [
            state('idle', style({
                transform: 'translateX(0)'
            })),
            state('open', style({
                transform: 'translateX(-100%)'
            })),
            state('close', style({
                transform: 'translateX(100%)'
            })),
            transition('idle => open', animate('.25s ease-in-out')),
            transition('idle => close', animate('.25s ease-in-out')),
            transition('* => idle', animate('0s'))
        ])
    ]
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
        window.location.href='https://youtube.com/redirect?q=applauncher.site';//'https://youtu.be/j8hGCA9rNKM';
    }

    get modeToggleIcon(): string {
        return this.app.mode == 'Light' ? 'nights_stay' : 'wb_sunny';
    }

    info() {
        window.location.href='https://www.youtube.com/channel/UC6h8aqlVqboag4CJjZ9qCCw/about';
    }

    cloud() {
        this.openDialog(CloudComponent, '60%');
    }

    add() {
        this.openDialog(AddAppComponent, '70%');
    }

    reorder() {
        this.openDialog(ReorderComponent, '75%');
    }

    openDialog(component, width) {
        const dialogRef = this.dialog.open(component, {
            width: width,
            maxWidth: '100vw !important',
            position: {'top': '1em'},
            data: {}
        });
      
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }
}
