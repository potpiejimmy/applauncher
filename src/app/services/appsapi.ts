import { Injectable } from "@angular/core";
import { HttpBaseService } from './httpbase';
import { environment } from '../../environments/environment';

@Injectable()
export class AppsApi extends HttpBaseService {

    getAppInfo(url: string): Promise<any> {
        return this.post(environment.apiUrl+"apps", {
            url: url
        });
    }

    backupApps(id: string, data: any): Promise<any> {
        return this.post(environment.apiUrl+"backup", {
            id: id,
            data: data
        });
    }

    restoreApps(id: string, remove: boolean): Promise<any> {
        return this.get(environment.apiUrl+"backup/"+encodeURIComponent(id)+(remove?"?delete=1":""));
    }
}
