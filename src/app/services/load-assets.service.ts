import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class LoadAssetsService {

  constructor(private http: Http) { }

  load() {
    return new Promise((resolve, reject) => {
        this.http
            .get('https://api.icndb.com/jokes/random')
            .subscribe(response => {
                resolve(response);
            })
    })
}
}
