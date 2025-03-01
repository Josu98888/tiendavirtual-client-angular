//impotar modulos del roueter
import { RouterModule, Routes } from '@angular/router'; //importo las clases y librerias necesarias para el router
import { ModuleWithProviders } from '@angular/core'; //me permite cargar como provider o servicio las cosas del router

//importar componentes
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

//creamos la ruta 
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'getProductsByCategory/:id', component: HomeComponent},
    {path: 'search/:text', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login' , component: LoginComponent},
    {path: 'userEdit', component: UserEditComponent},
    {path: 'createProduct', component: CreateProductComponent}, 
    {path: 'editProduct/:id', component: EditProductComponent}, 
    {path: 'productDetail/:id', component: ProductDetailComponent}, 
    {path: 'listCategories', component: ListCategoriesComponent},
    {path: 'saleDetail', component: SaleDetailComponent},
    {path: 'sales', component: SalesComponent},//
    {path: 'aboutUs', component: AboutUsComponent}
];

// exportamos el appRoutingProviders
export const appRoutingProviders: any[] = [];
//cargamos el array de rutas en el router
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 