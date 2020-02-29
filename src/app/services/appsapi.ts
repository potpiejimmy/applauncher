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
}
