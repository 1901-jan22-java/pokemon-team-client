import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpringCommService } from './spring-comm.service';
import { PkmnTeam } from '../models/PkmnTeam';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LoginService {

  url: string = "http://localhost:8080/pokemon-team";
  constructor(private http: HttpClient,
              private sCommService: SpringCommService) {}

  public login(uname:string, pass:string) : Observable<PkmnTeam>{
    let trainer = {
      username: uname, 
      password: pass
    };
    
    return this.http.post<PkmnTeam>(`${this.url}/login`, trainer, httpOptions);
  }

  private getUsers(){
    this.sCommService.getUsers().subscribe(resp => {
      if (resp != null){
        console.log(resp);
      }
      else
      {
        console.error("Error loading Users. Null value loaded");
      }
    });
  }
}
