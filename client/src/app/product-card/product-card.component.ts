import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: any = {};
  showActions = true;

  constructor(private cartService: CartService) { }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.showActions = false;
  }

  getQty(id) {
    return this.cartService.getQty(id);
  }

  removeFromCart(product) {
    if(this.getQty(product.id) === 1) {
      this.showActions = true;
    }

    this.cartService.removeFromCart(product);
  }
}
