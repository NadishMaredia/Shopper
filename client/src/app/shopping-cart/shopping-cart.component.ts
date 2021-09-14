import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: any;
  cartItem: String;
  totalBill = 0;

  constructor(private cartService: CartService, private router: Router) { 
    this.cartItem = localStorage.getItem('cartItems');
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.getTotalBill();
  }

  ngOnInit(): void {
  }

  getTotalBill() {

    if(this.cart !== null) {
      for(var i = 0;i<this.cart.length;i++) {
        this.totalBill = this.totalBill + +this.cart[i].price * +this.cart[i].qty;
      }
    }
  }

  clearCart() {
    this.cartService.clearCart();
    // localStorage.setItem('cart',JSON.stringify([]));
    // localStorage.setItem('cartItems', '0'.toString());
    this.cart = [];
    this.cartItem = "";
    this.totalBill = 0;
    this.router.navigateByUrl('/shopping-cart');
  }

}
