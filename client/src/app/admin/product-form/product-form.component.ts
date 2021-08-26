import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories = ['bread','diary','fruits','seasonings and spices','vegetables'];
  model: any = {};
  editMode = false;

  constructor(private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) { 

      let id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.productService.getProductById(id)
          .subscribe(p => {
            this.model = p;
            this.editMode = true;
          });
      }

    }

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

  editProduct() {
    this.productService.editProduct(this.model)
      .subscribe(response => {
        alert(response);
        this.router.navigateByUrl('admin/products');
      })
  }

  deleteProduct() {
    this.productService.deleteProduct(this.model.id)
      .subscribe(response => {
        alert(response.toString());
        this.router.navigateByUrl('admin/products');
      })
  }
}
