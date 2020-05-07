import { Injectable } from "@angular/core";
import { AddAppComponent } from '../components/addapp';

@Injectable()
export class AppService {

    apps: Array<any> = [];
    currentApps: Array<any>;
    currentFolder: any;
    mode: string = 'Light';
    folderAnimationState: string = 'idle';

    constructor() {
        this.load();
        this.currentFolder = null;
        this.currentApps = this.apps; // root folder
    }

    load() {
        let storedApps = localStorage.getItem("apps");
        if (storedApps) this.apps = JSON.parse(storedApps);
        let mode = localStorage.getItem("mode");
        if (mode) this.mode = mode;
    }

    save() {
        localStorage.setItem("apps", JSON.stringify(this.apps));
        localStorage.setItem("mode", this.mode);
    }

    addApp(app: any) {
        this.currentApps.push(app);
        this.save();
    }

    removeApp(app: any) {
        let ix = this.findAppIndex(app);
        if (ix >= 0) this.apps.splice(ix,1);
        this.save();
    }

    findAppIndex(app: any): number {
        let found = -1;
        for (let i=0; i<this.apps.length; i++) {
            if (this.apps[i].id == app.id) found = i;
        }
        if (found < 0) {
            // fallback, search for same url (downward compatibility if no ID set)
            for (let i=0; i<this.apps.length; i++) {
                if (this.apps[i].url == app.url) found = i;
            }
        }
        return found;
    }

    setAllApps(apps: Array<any>): void {
        this.apps = apps;
        this.save();
    }

    get modeClass(): string {
        return 'mode' + this.mode;
    }

    toggleMode(): void {
        this.mode = this.mode == 'Light' ? 'Dark' : 'Light';
        this.save();
    }

    openFolder(folder: any) {
        this.currentFolder = folder;
        this.folderAnimationState = 'open';
    }

    closeFolder() {
        this.currentFolder = null;
        this.folderAnimationState = 'close';
    }

    folderAnimationDone(event) {
        if (event.toState != 'idle') {
            if (this.currentFolder) {
                this.currentApps = this.currentFolder.apps;
            } else {
                this.currentApps = this.apps;
            }
            this.folderAnimationState = 'idle';
        }
    }
}
