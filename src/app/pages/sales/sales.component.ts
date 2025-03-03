import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { SaleService } from 'src/app/services/saleService';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [SaleService, UserService]
})
export class SalesComponent implements OnInit {
  public identity:any;
  public token:any;
  public url:any;
  // sales
  public products!:Array<any>;
  public date!:Array<any>;
  public subtotals!:Array<any>;
  public quantityProduct!:Array<any>;

  constructor(
    private _userService: UserService,
    @Inject(SaleService) private _saleService: SaleService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = environment.url;
  }

  ngOnInit(): void {
    this.indexSales();
  }

  indexSales() {
    this._saleService.index(this.token).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.products = response.products;
          this.quantityProduct = response.quantityProduct;
          this.subtotals = response.subtotals;
          this.date = response.date;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
