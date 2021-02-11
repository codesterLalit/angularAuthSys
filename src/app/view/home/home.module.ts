import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostCardComponent } from './components/post-card/post-card.component';

@NgModule({
  declarations: [UserProfileComponent, PostCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
