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

}
