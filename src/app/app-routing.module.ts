import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/helper/auth.guard';
import { NoAuthGuard } from './core/helper/noAuth.guard';
import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { NotFoundComponent } from './view/not-found/not-found.component';

const routes: Routes = [
  {path:'',
  redirectTo:'/',
  pathMatch:'full'
},
  {
    path:'',
    component:LandingPageComponent,
    canActivate:[NoAuthGuard]
  },
  {
    path:'auth',
    loadChildren: () => import("./view/main/main.module").then((m) => m.MainModule),
    canActivate:[NoAuthGuard]
  },
  {
    path:'home',
    loadChildren: () => import("./view/home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
   {path: '404', component: NotFoundComponent},
 {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
