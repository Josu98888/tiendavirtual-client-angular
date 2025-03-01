import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { CategorieService } from 'src/app/services/categorieService';
import { Categorie } from 'src/app/models/categorie';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.css'],
  providers: [UserService, CategorieService]
})
export class CreateCategorieComponent implements OnInit {
  public identity:any;
  public token:any;
  public status:any;
  public categorie:Categorie = new Categorie(1,'');
  public page_title:string;
  public formCategorie:FormGroup = new FormGroup({});
  @Output() createCategorie:EventEmitter<void> = new EventEmitter();

  
  constructor(
    private _userSerice: UserService,
    private _categorieSerive: CategorieService,
  ) { 
    this.identity = this._userSerice.getIdentity();
    this.token = this._userSerice.getToken();
    this.page_title = 'Creá una nueva categoría'
  }

  ngOnInit(): void {
    this.formCategorie = new FormGroup({
      name: new FormControl('')
    });
  }

  onSubmit() {
    this.categorie.name = this.formCategorie?.value.name;

    this._categorieSerive.create(this.categorie, this.token).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success';
          this.createCategorie.emit();
          this.formCategorie.reset();
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }
}
