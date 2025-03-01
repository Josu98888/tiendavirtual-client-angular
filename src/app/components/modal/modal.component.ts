import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategorieService } from 'src/app/services/categorieService';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [CategorieService]
})
export class ModalComponent implements OnInit {
  @Input() categorie:any;
  @Input() token:any;
  @Output() deleteProduct:EventEmitter<any> = new EventEmitter();
  public status:any;

  constructor(
    private _categorieService: CategorieService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this._categorieService.delete(this.categorie.id, this.token).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success';
          this.deleteProduct.emit();
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
}
