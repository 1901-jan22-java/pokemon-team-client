import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PkUser } from '../models/PkUsers';

@Injectable({
  providedIn: 'root'
})
export class SpringCommService {

  constructor(private http: HttpClient) { }

  private getUsers():PkUser{
    
  }
}
