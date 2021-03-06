import { Injectable } from "@angular/core";
import { HttpBaseService } from './httpbase';
import { environment } from '../../environments/environment';

@Injectable()
export class AppsApi extends HttpBaseService {

    getAppInfo(data: any): Promise<any> {
        return this.post(environment.apiUrl+"apps", data);
    }

    getCommunityApps(): Promise<any> {
        return this.get(environment.apiUrl+"apps/community");
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
