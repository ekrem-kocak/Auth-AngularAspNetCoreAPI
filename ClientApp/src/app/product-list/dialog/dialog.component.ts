import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/Model/Product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
  }

  deleteProduct(prd: Product) {
    this.productService.deleteProduct(prd).subscribe(() => {
      this.data.products.splice(this.data.products.findIndex((p: Product) => p.productId == prd.productId), 1);
    });
  }

}
