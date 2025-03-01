import { Component } from '@angular/core';
import { UserService } from './services/userService';
// import { ProductService } from './services/productService';
import { Global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent {
  title = 'client';

  public identity: any;
  public token: any;
  public products: any;
  public url: any;

  constructor(
    private _userService: UserService,
    // private _productService: ProductService
  ) {
    this.url = Global.url;
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // this.products = this._productService.getProducts();
    // console.log('Identity: ', this.identity.name);
    // console.log('Token: ', this.token);
  }
}
