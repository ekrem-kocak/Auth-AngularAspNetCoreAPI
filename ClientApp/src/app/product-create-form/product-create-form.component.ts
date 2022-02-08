import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Model/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent implements OnInit {

  @Input() products: Product[] | undefined;

  productCreateForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    price: new FormControl("", [Validators.required, Validators.min(0)]),
    isActive: new FormControl(false),
  })

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  createProduct() {
    var p: Product = new Product(
      0,
      this.productCreateForm.get('name')?.value,
      this.productCreateForm.get('price')?.value,
      this.productCreateForm.get('isActive')?.value,
    );
    this.productService.createProduct(p).subscribe(next => {
      console.log(next);
      this.products?.push(next);
      this.productCreateForm.reset();
    }, err => {
      console.log(err);
    })
  }

}
