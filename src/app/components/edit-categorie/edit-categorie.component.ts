import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategorieService } from 'src/app/services/categorieService';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css'],
  providers: [CategorieService]
})
export class EditCategorieComponent implements OnInit {
  @Output() close:EventEmitter<void> = new EventEmitter();
  @Output() editCategorie:EventEmitter<void> = new EventEmitter();
  @Input() token:any;
  @Input() categorie:any;
  public editForm: FormGroup = new FormGroup({});
  public status:any;
  


  constructor(
    private _categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.categorie.name)
    });
  }


  onSubmit() {
    this.categorie.name =  this.editForm?.value.name ;

    this._categorieService.update(this.categorie, this.categorie.id, this.token).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success';
          this.editCategorie.emit();
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
    this.close.emit();
  }
}
