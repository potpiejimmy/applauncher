import { Injectable } from "@angular/core";
import { AddAppComponent } from '../components/addapp';

@Injectable()
export class AppService {

    editing: boolean = false;
    apps: Array<any> = [];
    editingComponent: AddAppComponent;

    constructor() {
        this.load();
    }

    load() {
        let storedApps = localStorage.getItem("apps");
        if (storedApps) this.apps = JSON.parse(storedApps);
    }

    save() {
        this.apps = JSON.parse(JSON.stringify(this.apps)); // change detection Angular
        localStorage.setItem("apps", JSON.stringify(this.apps));
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
}
