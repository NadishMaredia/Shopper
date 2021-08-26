import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories = ['bread','diary','fruits','seasonings and spices','vegetables'];
  model: any = {};

  constructor(private productService: ProductService, private router: Router) { }

  saveProduct() {
    this.productService.addProduct(this.model)
      .subscribe(response => {
        alert(response);
        console.log(response);
        this.router.navigateByUrl('/');
      }, error => {
        alert(error);
        console.log(error)
      });
  }
}
