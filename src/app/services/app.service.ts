import { Injectable } from "@angular/core";
import { AddAppComponent } from '../components/addapp';

@Injectable()
export class AppService {

    editing: boolean = false;
    apps: Array<any> = [];
    editingComponent: AddAppComponent;
    mode: string = 'Light';

    constructor() {
        this.load();
        if (!this.apps || !this.apps.length) {
            setTimeout(()=>this.startEditing(), 1000);
        }
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
        this.apps.push(app);
        this.save();
    }

    removeApp(i: number) {
        this.apps.splice(i,1);
        this.save();
    }

    startEditing() {
        if (this.editingComponent) this.editingComponent.edit();
    }

    get modeClass(): string {
        return 'mode' + this.mode;
    }

    toggleMode(): void {
        this.mode = this.mode == 'Light' ? 'Dark' : 'Light';
        this.save();
    }
}
