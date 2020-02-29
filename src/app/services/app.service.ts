import { Injectable } from "@angular/core";

@Injectable()
export class AppService {

    editing: boolean = false;
    apps: Array<any> = [];

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
}
