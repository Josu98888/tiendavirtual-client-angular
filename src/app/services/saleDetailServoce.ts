import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class SaleDetailService {
  private cartUpdated = new BehaviorSubject<boolean>(false); // Subject para emitir eventos
  cartUpdated$ = this.cartUpdated.asObservable();
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = environment.url;
  }

  create(token: any, cart: any): Observable<any> {
    let json = JSON.stringify(cart);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'saleDetail', params, {
      headers: headers,
    });
  }

  index(token: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'saleDetail', { headers: headers });
  }

  delete(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders().set('Conten-type', 'application/x-www-form-urlencoded').set('Authorization', token);

    return this._http.delete(this.url + 'saleDetail/' + id, {headers:headers} );
  }

  deleteCart(token:any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

    return this._http.delete(this.url + 'delete', {headers: headers});
  }

  notifyCartUpdate() {
    console.log('🛒 Evento emitido: notifyCartUpdate');
    this.cartUpdated.next(true); 
  }
}
