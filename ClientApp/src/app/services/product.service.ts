import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly apiUrl = "http://localhost:5000/myapi/"
  private readonly token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  private readonly headerOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  })

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + "products");
  }

  createProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + "products", p,
      {
        headers: this.headerOptions
      }
    );
  }

  deleteProduct(p: Product): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "products/" + p.productId, { headers: this.headerOptions });
  }

  updateProduct(p: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + "products/" + p.productId, p, { headers: this.headerOptions });
  }
}
