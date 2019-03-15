import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private isLoggedIn:boolean = false;

  private username: string;
  private password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    document.body.classList.add('log-reg-img');
  }

  public login(){
    console.log('Username from html = ' + this.username);
    console.log('Password from html = ' + this.password);
    this.loginService.login(this.username, this.password).subscribe(resp => {
      console.log(resp);
    });
  }
}
