import { Component, Inject, OnInit } from '@angular/core';
import { SaleDetailService } from 'src/app/services/saleDetailServoce';
import { UserService } from 'src/app/services/userService';
import { SaleService } from 'src/app/services/saleService';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css'],
  providers: [ UserService, SaleService],
})
export class SaleDetailComponent implements OnInit {
  public identity: any;
  public token: any;
  public url: any;
  public status:any;
  // cart
  public products: any;
  public quantityProduct!: Array<any>;
  public quantityTotal!: number;
  public total: any;
  public products_cart!: any;

  constructor(
    private _saleDetailService: SaleDetailService,
    private _userService: UserService,
    @Inject(SaleService) private _saleService: SaleService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = environment.url;
  }

  ngOnInit(): void {
    this.indexCart();
  }

  indexCart() {
    this._saleDetailService.index(this.token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.quantityTotal = response.count;
          this.quantityProduct = response.quantity;
          this.products = response.products;
          this.products_cart = response.cart;
          this.total = response.total;

          localStorage.setItem('cart', JSON.stringify(this.quantityTotal));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDelete(id: any) {
    this._saleDetailService.delete(this.token, id).subscribe(
      (response) => {
        this._saleDetailService.notifyCartUpdate();
        this.indexCart();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this._saleService.create(this.token, this.identity).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success';
          this.deleteCart();
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  deleteCart() {
    this._saleDetailService.deleteCart(this.token).subscribe(
      response => {
        this._saleDetailService.notifyCartUpdate();
        this.indexCart();
      },
      error => {
        console.log(error);
      }
    );
  }
}
