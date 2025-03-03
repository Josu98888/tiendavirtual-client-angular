import { Component, Inject, OnInit, ViewEncapsulation  } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { ProductService } from 'src/app/services/productService';
import { SaleDetailService } from 'src/app/services/saleDetailServoce';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Sale_Detail } from 'src/app/models/sale_detail';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [UserService, ProductService],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {
  public identity: any;
  public token: any;
  public url: any;
  public product: any;
  public cart: any;
  public status: any;

  constructor(
    private _userService: UserService,
    @Inject(ProductService) private _productService: ProductService,
    private _saleDetailService: SaleDetailService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = environment.url;
    this.cart = new Sale_Detail(1, 1, 1, 1);
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._route.params.subscribe((params) => {
      var id = +params['id'];

      this._productService.getProduct(id, this.token).subscribe(
        (response) => {
          if (response && response.status == 'success') {
            this.product = response.product;
            this.status = 'success';
          }
        },
        (error) => {
          console.log(error);
          this.status = 'error';
        }
      );
    });
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
}
