import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../environments/environment';



@Injectable()
export class AppService {
  data: any = {};
  private url = '';
  envUrl = environment.apiUrl;
  path = 'api/statistics';

  constructor(private http: Http) { }


  getData(id) {
    this.url = this.envUrl + this.path + '/' + id;
    return this.http.get(this.url).map(response => {
      return this.handleSuccess(response);
    }).catch(this.handleError);
  }


  postData(data) {
    this.url = this.envUrl + this.path + '/';
    return this.http.post(this.url, data).map(response => {
      console.dir(response);
      return response.json();
    }).catch(this.handleError);
  }

  private handleSuccess(response) {
    try {
      return response.json();
    } catch (e) {
      return response;
    }
  }

  private handleError(error: any) {
    try {
      return Observable.throw(error.json());
    } catch (e) {
      return Observable.throw(error);
    }
  }


}
