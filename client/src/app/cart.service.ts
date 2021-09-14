import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = [];
  itemCount = 0;

  constructor(private authService: AuthService) { }

  addToCart(product) {
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

        this.itemCount++;
        this.cartItems.push(obj);
      } else {
        var result = false;
        for (var i = 0; i < this.cartItems.length; i++) {
          if (this.cartItems[i].id === product.id) {
            result = true;
            this.itemCount++;
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
          this.itemCount++;
          this.cartItems.push(obj);
        }
        
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      localStorage.setItem('cartItems', this.itemCount.toString());
    }
  }

  getQty(id) {
    if (this.cartItems.find(p => p.id === id)) {
      for(var i = 0;i<this.cartItems.length;i++) {
        if (this.cartItems[i].id === id) {
          return this.cartItems[i].qty;
        }
      }
    } else {
      return 0;
    }
  }

  removeFromCart(product) {
    
    for(var i = 0;i<this.cartItems.length;i++) {
      if(this.cartItems[i].id === product.id) {
        this.itemCount--;
        this.cartItems[i].qty--;
        break;
      }
    }

    localStorage.removeItem('cart');
    localStorage.removeItem('cartItems');
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    localStorage.setItem('cartItems', this.cartItems.length.toString());

  }

  getTotalCartItems() {
    let totalCount = localStorage.getItem('cartItems');
    return totalCount;
  }

  clearCart() {
    localStorage.removeItem('cart');
    localStorage.removeItem('cartItems');
    this.cartItems = [];
    this.itemCount = 0;
  }
}
