import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpBaseService {

    constructor (
        protected http: HttpClient
    ) {}

    requestOptions() {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return { headers: headers };
    }
    
    handleResponse(request: Observable<Object>): Promise<any> {
        return request.toPromise()
               .catch(err => this.handleError(err));
    }
    
    get(url): Promise<any>  {
        return this.handleResponse(this.http.get(url, this.requestOptions()));
    }

    post(url, data): Promise<any>  {
        return this.handleResponse(this.http.post(url, data, this.requestOptions()));
    }

    put(url, data): Promise<any>  {
        return this.handleResponse(this.http.put(url, data, this.requestOptions()));
    }

    delete(url): Promise<any>  {
        return this.handleResponse(this.http.delete(url, this.requestOptions()));
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', JSON.stringify(error)); // XXX for debugging purposes
        if (!error.status) error.message = "Could not reach " + environment.apiUrl;
        let errmsg: string = error.error.message || error.message || error;
        return Promise.reject(errmsg);
    }
}
