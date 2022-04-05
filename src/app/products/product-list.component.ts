import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css',]
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}
  
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  private _filterItem: string = '';
  get filterItem() {
    return this._filterItem;
  }
  set filterItem(value: string) {
    this._filterItem = value;
    console.log(this._filterItem);
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => { 
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}