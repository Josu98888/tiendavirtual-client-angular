import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService';
import { UserService } from 'src/app/services/userService';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, ProductService]
})
export class HomeComponent implements OnInit {
  public products: any;
  public title:any;
  public identity:any;
  public url:any;
  public status:any;
  public pag:number = 1;

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = Global.url ;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      let text = params['text'];
      if(id || text) {
        if(id) {
          this.getProductsByCategory(id);
        } else {
          this.getProductsByText(text);
        }
        
      } else {
        this.getProducts();
      }
    });
    
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        if(response && response.status == 'success') {
          this.products = response.products ;
          this.title = 'Todos los productos';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getProductsByCategory(id:any) {
    this._productService.getProductsByCategory(id).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success';
          this.products = response.products;
          this.title = response.categorie;
        }
      }, 
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  getProductsByText(text:any) {
    this._productService.getProductsByText(text).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.products = response.products;
          this.title = 'Resultados de la busqueda';
          this.status = 'success';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  updateProducts() {
    this.getProducts();
  }
}
