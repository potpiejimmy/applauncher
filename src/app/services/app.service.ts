import { Injectable } from "@angular/core";
import { AddAppComponent } from '../components/addapp';

@Injectable()
export class AppService {

    apps: Array<any> = [];
    currentApps: Array<any>;
    currentFolder: any;
    modes = ['Light','Dark','Auto'];
    mode: string = 'Auto';
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
        if (this.isFolder(app)) {
            // for now, do not allow folders in folder
            this.closeFolderImmediate();
        }
        this.currentApps.push(app);
        this.save();
    }

    removeApp(app: any) {
        let ix = this.findAppIndex(app);
        if (ix >= 0) this.currentApps.splice(ix,1);
        this.save();
    }

    findAppIndex(app: any): number {
        let found = this.currentApps.findIndex(i => i.id == app.id);
        if (found < 0) {
            // fallback, search for same url (downward compatibility if no ID set)
            found = this.currentApps.findIndex(i => i.url == app.url);
        }
        return found;
    }

    setAllApps(apps: Array<any>): void {
        this.apps = apps;
        this.closeFolderImmediate();
        this.save();
    }

    getFolders(): Array<any> {
        return this.apps.filter(app => this.isFolder(app));
    }

    isFolder(app: any): boolean {
        return app.url === 'folder://';
    }

    get modeClass(): string {
        if (this.mode == 'Auto') {
            let dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            return 'mode' + (dark ? 'Dark' : 'Light');
        } else {
            return 'mode' + this.mode;
        }
    }

    toggleMode(): void {
        let ix = this.modes.indexOf(this.mode);
        this.mode = this.modes[(ix + 1) % 3];
        this.save();
    }

    openFolder(folder: any) {
        this.currentFolder = folder;
        this.folderAnimationState = 'open';
    }

    openFolderImmediate(folder: any) {
        this.currentFolder = folder;
        this.currentApps = this.currentFolder.apps;
    }

    closeFolder() {
        this.currentFolder = null;
        this.folderAnimationState = 'close';
    }

    closeFolderImmediate() {
        this.currentFolder = null;
        this.currentApps = this.apps;
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
