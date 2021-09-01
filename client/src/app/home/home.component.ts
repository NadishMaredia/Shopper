import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories = ['bread', 'diary', 'fruits', 'seasonings', 'vegetables'];
  products: any[] = [];
  filteredProducts: any[];
  category: string;
  cartItems = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      this.filteredProducts = this.category
        ? this.products.filter((p) => p.category === this.category)
        : this.products;
    });
  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProduct().subscribe((response) => {
      this.products = response;
      this.filteredProducts = this.products;
    });
  }
}
