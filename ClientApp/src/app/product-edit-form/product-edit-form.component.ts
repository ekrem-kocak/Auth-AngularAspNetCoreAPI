import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Model/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrls: ['./product-edit-form.component.scss']
})
export class ProductEditFormComponent implements OnInit, OnChanges {

  @Input() selectedProduct: Product | undefined;
  @Input() products: Product[] | undefined;

  productUpdateForm: FormGroup = new FormGroup({
    productId: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    price: new FormControl("", [Validators.required, Validators.min(0)]),
    isActive: new FormControl(),
  })

  constructor(private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedProduct) {
      this.productUpdateForm.controls.productId.setValue(this.selectedProduct.productId);
      this.productUpdateForm.controls.name.setValue(this.selectedProduct.name);
      this.productUpdateForm.controls.price.setValue(this.selectedProduct.price);
      this.productUpdateForm.controls.isActive.setValue(this.selectedProduct.isActive);
    }
  }

  ngOnInit(): void {
  }

  updateProduct() {
    let p = new Product(
      this.productUpdateForm.get('productId')?.value,
      this.productUpdateForm.get('name')?.value,
      this.productUpdateForm.get('price')?.value,
      this.productUpdateForm.get('isActive')?.value,
    )
    this.productService.updateProduct(p).subscribe(next => {
      this.products?.splice(this.products.findIndex(pr => pr.productId == p.productId), 1, p);
      this.selectedProduct = undefined;
    }, err => {
      console.log(err);
    })
  }

}
