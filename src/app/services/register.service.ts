import { PkUser } from './../models/PkUsers';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/jsom'})
};

@Injectable()
export class RegisterService {

  url = `http://localhost:8085`;
  constructor(private http: HttpClient) { }

  public addUser(user: PkUser) {
    return this.http.post(`${this.url}/users`, user, httpOptions);
  }
}
