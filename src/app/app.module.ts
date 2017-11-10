import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

//Add Services -> Make sure they are in providers too
import { BeerApiService } from './services/beer-api.service';
import { AuthApiService } from './services/auth-api.service';

//Automatically Added Components 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BeerListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    BeerApiService,
    AuthApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
