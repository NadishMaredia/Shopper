import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { LoginModel } from '../models/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  currentUser: any;

  constructor(private authService: AuthService, private router: Router, public cartService: CartService) {
    this.fetchUser();
   }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(response => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        this.fetchUser();
        // this.authService.setAdmin(JSON.stringify(response));
      }, err => {
        console.log(err);
      })
  }

  fetchUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.currentUser = user;
      this.authService.setCurrentUser(this.model);
      this.authService.setAdmin(localStorage.getItem('user'));
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
    this.authService.removeCurrentUser();
    this.authService.removeAdmin();
    this.router.navigateByUrl('/');
  }

}
