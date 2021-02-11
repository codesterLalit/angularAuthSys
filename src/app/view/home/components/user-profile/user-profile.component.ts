import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user:string;
  posts:any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  this.user = this.authService.getUserInfo().email;
  this.authService.getEvents().subscribe(res=>{
     console.log(res);
    this.posts = res;
  },
  err=>{
    console.log(err)
  })
  }

}
