import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = ['bread','diary','fruits','seasonings','vegetables'];
  products: any[] = [];
  filteredProducts: any[];
  category: string;
  cartItems = [];

  constructor(private productService: ProductService, 
    private route: ActivatedRoute) {
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
  }
  ngOnInit(): void {
    this.getProducts(); 
  }

  getProducts() {
    this.productService.getProduct()
      .subscribe(response => {
        this.products = response;
        this.filteredProducts = this.products;
      })
  }

  addToCart(product) {
    if(this.cartItems.length == 0) {
      let obj = {
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        qty: 1
      };

      this.cartItems.push(obj);
    } else {
      var result = false;
      for(var i = 0;i<this.cartItems.length;i++) {
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
          qty: 1
        };
  
        this.cartItems.push(obj);
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

}
