import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { HeadersComponent } from './components/headers/headers.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { appRoutingProviders, routing } from './app.routing';
import { RouterLink } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserService } from './services/userService';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductService } from './services/productService';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ObjToArrayPipe } from './pipes/obj-to-array.pipe';
import { CreateCategorieComponent } from './pages/create-categorie/create-categorie.component';
import { ModalComponent } from './components/modal/modal.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { ToggleCartComponent } from './components/toggle-cart/toggle-cart.component';
import { SaleDetailService } from './services/saleDetailServoce';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContainerPagesComponent } from './components/container-pages/container-pages.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    NavbarComponent,
    FooterComponent,
    CreateProductComponent,
    CardProductComponent,
    EditProductComponent,
    ObjToArrayPipe,
    CreateCategorieComponent,
    ModalComponent,
    ListCategoriesComponent,
    EditCategorieComponent,
    ToggleCartComponent,
    SaleDetailComponent,
    SalesComponent,
    ProductDetailComponent,
    AboutUsComponent,
    ContainerPagesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    // AngularFileUploaderModule,
    NgxFileDropModule,
    NgxPaginationModule
  ],
  providers: [appRoutingProviders, RouterLink, UserService, ProductService, SaleDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
