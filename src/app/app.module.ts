import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { MaterializeModule } from 'angular2-materialize';

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
import { MyBeersComponent } from './pages/my-beers/my-beers.component';
import { BeerFormComponent } from './components/beer-form/beer-form.component';
import { BeerDetailsComponent } from './pages/beer-details/beer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BeerListComponent,
    LoginComponent,
    SignupComponent,
    MyBeersComponent,
    BeerFormComponent,
    BeerDetailsComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
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
