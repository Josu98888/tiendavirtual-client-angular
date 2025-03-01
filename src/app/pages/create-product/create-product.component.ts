import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService';
import { UserService } from 'src/app/services/userService';
import { Product } from 'src/app/models/product';
import { Global } from 'src/app/services/global';
// import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { FormGroup, FormControl } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorieService';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [UserService, ProductService, CategorieService],
})
export class CreateProductComponent implements OnInit {
  public title:string;
  public identity: any;
  public token: any;
  public product: Product;
  public categories: any;
  public status: any;
  public url: any;
  public is_edit: boolean;
  public resetVar = true;
  public formProduct: FormGroup = new FormGroup({});

  // configuracion de la libreria angular-file-update
  // public afuConfig: AngularFileUploaderConfig = {
  //   multiple: false, //para cargar un archivo a la vez
  //   formatsAllowed: '.jpg, .png, .gif, .jpeg', //extensiones disponibles
  //   maxSize: 600, //capacidad max en MB
  //   uploadAPI: {
  //     url: Global.url + 'product/upload',
  //     method: 'POST',
  //     headers: {
  //       Authorization: this._userService.getToken(),
  //     },
  //   },
  //   theme: 'attachPin', //temas disponlibles
  //   hideProgressBar: false, //oculta la barra de progreso
  //   hideResetBtn: true, //oculta el boton restablecer
  //   hideSelectBtn: false, //oculta el boton seleccionar achivo
  // };

  constructor(
    private _userService: UserService,
    private _productService: ProductService,
    private _categorieService: CategorieService
  ) {
    this.title = 'Creá un nuevo producto'
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = false;
    this.product = new Product(1, 0, '', '', '', 0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.getCategories();

    this.formProduct = new FormGroup({
      categorie: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      priceNow: new FormControl(''),
      priceBefore: new FormControl(''),
      stock: new FormControl(''),
    });
  }

  getCategories() {
    this._categorieService.getCategories().subscribe(
      (response) => {
        if (response && response.status == 'success') {
          this.categories = response.categories;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.product.id =  1,
    this.product.categorieID =  this.formProduct?.value.categorie,
    this.product.name =  this.formProduct?.value.name,
    this.product.description =  this.formProduct?.value.description,
    this.product.priceNow =  this.formProduct?.value.priceNow,
    this.product.priceBefore =  this.formProduct?.value.priceBefore,
    this.product.numSales =  0,
    this.product.stock =  this.formProduct?.value.stock

    this._productService.create(this.token, this.product).subscribe(
      (response) => {
        if (response && response.status == 'success') {
          this.status = 'success';
        }
      },
      (error) => {
        (this.status = 'error'), console.log(error);
      }
    );

    console.log(this.product);
  }

  imageUpload(datos: any) {
    // Verificar si 'datos' es una cadena y convertirla a JSON si es necesario
    let data = typeof datos === 'string' ? JSON.parse(datos) : datos;
    this.product.image = data.body.image;
  }
}
