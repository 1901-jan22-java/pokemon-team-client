import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private isLoggedIn:boolean = false;

  private id: number;
  private username: string;
  private password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    document.body.classList.add('log-reg-img');
  }

  public login(){
    this.loginService.login(this.username, this.password).subscribe(resp => {
      if(resp != null){
        console.log(resp);
        this.id = resp['id'];
        this.username = resp['username'];
        this.isLoggedIn = true;
      }
    });
    console.log(this.username);
    console.log(this.id);
    
  }
}
