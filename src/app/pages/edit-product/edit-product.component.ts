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
  public fileImage:any;
  public imagePreview:any;

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
    // Creamos un FormData para enviar tanto los datos como la imagen
    const formData = new FormData();
  
    // Añadimos los datos del producto al FormData
    formData.append('name', this.formProduct?.value.name);
    formData.append('categorieID', this.formProduct?.value.categorie);
    formData.append('description', this.formProduct?.value.description);
    formData.append('priceNow', this.formProduct?.value.priceNow);
    formData.append('priceBefore', this.formProduct?.value.priceBefore);
    formData.append('stock', this.formProduct?.value.stock);
  
    // Verificamos si hay una nueva imagen seleccionada
    if (this.fileImage) {
      formData.append('image', this.fileImage);
    }
  
    // Llamamos al servicio de actualización con FormData
    this._productService.update(this.token, formData, this.product.id).subscribe(
      (response) => {
        if (response && response.status === 'success') {
          this.status = 'success';
          this._router.navigate(['']);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
  

  imageUpload($event: any) {
    if($event.target.files.length > 0){
      this.fileImage = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileImage);
      reader.onloadend = () => this.imagePreview = reader.result;
    }       
  }
}
