import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { SaleDetailService } from 'src/app/services/saleDetailServoce';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toggle-cart',
  templateUrl: './toggle-cart.component.html',
  styleUrls: ['./toggle-cart.component.css'],
  providers: [SaleDetailService]
})
export class ToggleCartComponent implements OnInit {
  @Output() deleteProduct= new EventEmitter();
  @Input() token:any;
  @Input() quantity:any;
  @Input() quantityProduct:any;
  @Input() products:any;
  @Input() url:any;
  @Input() total:any;



  constructor(
    @Inject(SaleDetailService) private _saleDetailService: SaleDetailService
  ) { }

  ngOnInit(): void {
  }

  onDelete(id:any) {
    this._saleDetailService.delete(this.token, id).subscribe(
      response => {
        this.deleteProduct.emit();
      },
      error => {
        console.log(error);
      }
    );
  }

}
