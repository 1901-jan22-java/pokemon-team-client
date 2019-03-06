// General imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componement imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
<<<<<<< HEAD
=======
import { AppRoutingModule } from './app-routing.module';

// Services imports
import { LoginService } from './services/login.service';

>>>>>>> 2c4c06522462242181a19be703750a3f6f1a67f4

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
