import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/productService';
import { UserService } from 'src/app/services/userService';
import { SaleDetailService } from 'src/app/services/saleDetailServoce';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Sale_Detail } from 'src/app/models/sale_detail';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  providers: [ProductService, UserService],
})
export class CardProductComponent implements OnInit {
  @Input() product: any;
  @Output() updateProducts: EventEmitter<void> = new EventEmitter();
  public identity: any;
  public url: any;
  public token: any;
  public cart: any;

  constructor(
    private _userService: UserService,
    @Inject(ProductService) private _productService: ProductService,
    private _router: Router,
    private _saleDetailService: SaleDetailService
  ) {
    this.url = environment.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.cart = new Sale_Detail(1, 1, 1, 1);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.identity == null || this.identity == '') {
      this._router.navigate(['/login']);
    } else if (this.identity) {
      this.cart.idProduct = this.product.id;
      this._saleDetailService.create(this.token, this.cart).subscribe(
        (response) => {
          if (response.status == 'success') { 
            this._saleDetailService.notifyCartUpdate();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteProduct(id: any) {
    this._productService.delete(this.token, id).subscribe(
      (response) => {
        this.updateProducts.emit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
