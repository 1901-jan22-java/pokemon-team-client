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
      if(resp.trainer != null && resp.id != null){
        this.id = resp.trainer['id'];
        this.username = resp.trainer['username'];
        this.isLoggedIn = true;
      }
    });
    console.log(this.username);
    console.log(this.id);
    
  }
}
