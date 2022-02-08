import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../Model/Product.model';
import { ProductService } from '../services/product.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | undefined;
  selectedProductForDelete: Product | undefined;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(next => {
      this.products = next;
    });
  }

  DeleteProduct(prd: Product) {
    this.productService.deleteProduct(prd).subscribe(next => {
      var index = this.products.findIndex(p => p.productId == prd.productId);
      this.products.splice(index, 1);
    })
  }

  OnUpdateState(prd: Product): void {
    this.selectedProduct = prd;
  }

  openDialog(prd: Product) {
    this.selectedProductForDelete = prd;
    this.dialog.open(DialogComponent, {
      data:
      {
        selectedProduct: this.selectedProductForDelete,
        products: this.products,
      }
    });
  }

}
