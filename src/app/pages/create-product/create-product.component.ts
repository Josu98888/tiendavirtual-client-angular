import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService';
import { UserService } from 'src/app/services/userService';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorieService';
import { Router } from '@angular/router';


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
  public fileImage:any;
  public imagePreview:any;

  constructor(
    private _userService: UserService,
    @Inject(ProductService) private _productService: ProductService,
    private _categorieService: CategorieService,
    private _router:Router
  ) {
    this.title = 'Creá un nuevo producto'
    this.url = environment.url;
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
    const formData = new FormData();
  
    // Agregar los datos del producto al FormData
    formData.append('categorieID', this.formProduct.value.categorie);
    formData.append('name', this.formProduct.value.name);
    formData.append('description', this.formProduct.value.description);
    formData.append('priceNow', this.formProduct.value.priceNow);
    formData.append('priceBefore', this.formProduct.value.priceBefore);
    formData.append('numSales', '0');
    formData.append('stock', this.formProduct.value.stock);
  
    // Agregar la imagen solo si el usuario ha seleccionado una
    if (this.fileImage) {
      formData.append('image', this.fileImage);
    }
  
    // Enviar el producto al backend
    this._productService.create(this.token, formData).subscribe(
      (response) => {
        if (response && response.status == 'success') {
          this.status = 'success';
          setTimeout(() => {
            this._router.navigate(['']);
          }, 3000);
          console.log('Producto creado con éxito:', response);
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
