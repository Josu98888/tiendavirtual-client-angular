import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { CategorieService } from 'src/app/services/categorieService';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  providers: [UserService, CategorieService]
})
export class ListCategoriesComponent implements OnInit {
  public identity:any;
  public token:any;
  public status:any;
  public categories:any;
  public editId:any;

  constructor(
    private _userSerice: UserService,
    private _categorieSerive: CategorieService
  ) { 
    this.identity = this._userSerice.getIdentity();
    this.token = this._userSerice.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categorieSerive.getCategories().subscribe(
      response => {
        if( response && response.status == 'success') {
          this.categories = response.categories ;
          this.status = 'success';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  closeForId(id:any) {
    this.editId = this.editId === id ? null : id;
  }
  
  editCategorie(event:Event, id:number) {
    event.preventDefault();
    this.closeForId(id);
  }

}
