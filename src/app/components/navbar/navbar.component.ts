import { Component, OnInit, ChangeDetectorRef, ElementRef, HostListener } from '@angular/core';
import { CategorieService } from 'src/app/services/categorieService';
import { SaleDetailService } from 'src/app/services/saleDetailServoce';
import { UserService } from 'src/app/services/userService';
import { Global } from 'src/app/services/global';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CategorieService, UserService]
})
export class NavbarComponent implements OnInit {
  private cartSubscription!: Subscription;
  public categories:any ;
  public viewCart:boolean = false;
  public token:any;
  public url:any;
  public text:any;
  // cart
  public products:any;
  public quantityProduct!:number;
  public quantityTotal!:number;
  public total:any;
  public products_cart!:any;
  // toggle
  public isCategoryOpen: boolean = false; 
  public isMobileView: boolean = false;
  public isMenuOpen: boolean = false;


  constructor(
    private _categorieService: CategorieService,
    private _saleDetailService: SaleDetailService,
    private _userService: UserService,
    private cdr: ChangeDetectorRef,
    private eRef: ElementRef
  ) { 
    this.token = this._userService.getToken();
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.getCategories();
    if(this.token) {
      this.indexCart();
    }
    this.cartSubscription = this._saleDetailService.cartUpdated$.subscribe(updated => {
      console.log('📢 cartUpdated$ recibido:', updated);
      this.indexCart();
    });
  }

  update() {
    this._saleDetailService.cartUpdated$.subscribe(() => {
      this.indexCart();
    });
  }
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();  // Evitar memory leaks
    }
  }

  getCategories() {
    this._categorieService.getCategories().subscribe(
      response => {
        if(response.status == 'success') {
          this.categories = response.categories ;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 678;
  }
  onToggleMenu(event:Event) {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation();
  }

  toggleCategory(event:Event) {
    this.isCategoryOpen = !this.isCategoryOpen;
    event.stopPropagation();
  }

  onToggleCart(event:Event) {
    this.viewCart = !this.viewCart;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isCategoryOpen = false; 
      this.viewCart = false;
      this.isMenuOpen = false;
    }
  }

  indexCart() {
      this._saleDetailService.index(this.token).subscribe(
      response => {
        if(response.status == 'success') {
          this.quantityTotal = response.count;
          this.quantityProduct = response.quantity;
          this.products = response.products;
          this.products_cart = response.cart;
          this.total = response.total;
          this.cdr.detectChanges();
          console.log(response);

          localStorage.setItem('cart', JSON.stringify(this.quantityTotal));
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onDelete(id:any) {
    this._saleDetailService.delete(this.token, id).subscribe(
      response => {
        if(response.status == 'success') {
          this.indexCart();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
