import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService';
import { CategorieService } from 'src/app/services/categorieService';
import { UserService } from 'src/app/services/userService';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
// import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: '../create-product/create-product.component.html',
  styleUrls: ['../create-product/create-product.component.css'],
  providers: [CategorieService, ProductService, UserService]
})
export class EditProductComponent implements OnInit {
  public title:string;
  public categories:any ;
  public product:Product = new Product(1,0,'','','',1,1,1,1);
  public identity:any;
  public token:any;
  public status:any;
  public is_edit:boolean;
  public resetVar = true;
  public url:any;
  public formProduct = new FormGroup({});

  // public afuConfig: AngularFileUploaderConfig = {
  //     multiple: false, //para cargar un archivo a la vez
  //     formatsAllowed: '.jpg, .png, .gif, .jpeg', //extensiones disponibles
  //     maxSize: 600, //capacidad max en MB
  //     uploadAPI: {
  //       url: Global.url + 'product/upload',
  //       method: 'POST',
  //       headers: {
  //         Authorization: this._userService.getToken(),
  //       },
  //     },
  //     theme: 'attachPin', //temas disponlibles
  //     hideProgressBar: false, //oculta la barra de progreso
  //     hideResetBtn: true, //oculta el boton restablecer
  //     hideSelectBtn: false, //oculta el boton seleccionar achivo
  //   };

  constructor(
    private _categorieService: CategorieService,
    @Inject(ProductService) private _productService: ProductService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.title = 'Editar producto'
    this.url = environment.url;
    this.categories = this._categorieService.getCategories();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
    this.formProduct = this.formProduct = new FormGroup({
      categorie: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
      priceNow: new FormControl(null),
      priceBefore: new FormControl(null),
      stock: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct()
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

  getProduct() {
    this._route.params.subscribe(params => {
      // obtenemos el id
      var id:number = +params['id'];

      this._productService.getProduct(id, this.token).subscribe(
        response => {
          if(response.status == 'success') {
            this.product = response.product ;

            this.formProduct.patchValue({
              categorie: this.product.categorieID,
              name: this.product.name,
              description: this.product.description,
              priceNow: this.product.priceNow,
              priceBefore: this.product.priceBefore,
              stock: this.product.stock,
            });
          } else {
            this._router.navigate(['']);
          }
        },
        error => {
          this.status = 'error';
          this._router.navigate(['']);
          console.log(error);
        }
      );
    });
  }

  onSubmit() {
    this.product.categorieID =  this.formProduct?.value.categorie,
    this.product.name =  this.formProduct?.value.name,
    this.product.description =  this.formProduct?.value.description,
    this.product.priceNow =  this.formProduct?.value.priceNow,
    this.product.priceBefore =  this.formProduct?.value.priceBefore,
    this.product.stock =  this.formProduct?.value.stock
    console.log(this.product);

    this._productService.update(this.token, this.product, this.product.id).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success' ;
          this._router.navigate(['']);
        } else {
          this.status = 'error' ;
        }
      },
      error => {
        this.status = 'error' ;
        console.log(error) ;
      }
    );
  }

  imageUpload(datos: any) {
    // Verificar si 'datos' es una cadena y convertirla a JSON si es necesario
    let data = typeof datos === 'string' ? JSON.parse(datos) : datos;
    this.product.image = data.body.image;
  }
}
