import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/jsom'})
};

@Injectable()
export class LoginService {

  url: string = `http://localhost:8085`;
  constructor(private http: HttpClient) {

  }
}
