import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = [];

  constructor(private authService: AuthService) { }

  addToCart(product) {
    console.log(this.authService.currentUser);
    if (this.authService.currentUser === undefined || this.authService.currentUser === null) {
      alert('You cannot add items in cart. Please log In');
    } else {
      if (this.cartItems.length == 0) {
        let obj = {
          id: product.id,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          qty: 1,
        };

        this.cartItems.push(obj);
      } else {
        var result = false;
        for (var i = 0; i < this.cartItems.length; i++) {
          if (this.cartItems[i].id === product.id) {
            result = true;
            this.cartItems[i].qty += 1;
            break;
          }
        }

        if (!result) {
          let obj = {
            id: product.id,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            qty: 1,
          };

          this.cartItems.push(obj);
        }
        
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }
}
