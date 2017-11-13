import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { MyBeersComponent } from './pages/my-beers/my-beers.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
    { path: '',         component: BeerListComponent},
    { path: 'login',    component: LoginComponent   },
    { path: 'signup',   component: SignupComponent  },
    { path: 'mybeers',  component: MyBeersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }