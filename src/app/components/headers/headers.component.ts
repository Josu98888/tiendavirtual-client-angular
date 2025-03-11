import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/userService';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
  providers: [RouterLink]
})
export class HeadersComponent implements OnInit {
  public identity: any;
  public url: any;
  public imageUrl:any;

  constructor(
    private _userService: UserService, 
    private _router: Router, 
    @Inject(DOCUMENT) private document: Document
  ) {
    this.url = environment.url;
    this.loadUser();
  }

  ngOnInit(): void {
    this.imageUrl = this._userService.getUserImage(this.identity?.image);
  }
  
  loadUser() {
    this.identity = this._userService.getIdentity();
    if (Object.keys(this.identity).length === 0 || typeof this.identity == undefined) {
      this.identity = false;
    }
  }

  someMethode() {
    this.document.location.reload();
  }

  logout() {
    this._userService.clearSession();
    // redirigimos al home
    this._router.navigate(['']);
    // recargamos la pagina
    this.someMethode();
  }

}
