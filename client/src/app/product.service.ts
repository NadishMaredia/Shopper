import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://localhost:5001/api/product';

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get(this.baseUrl);
  }

  addProduct(model: any) {
    return this.http.post(this.baseUrl +'/add', model);
  }
}
