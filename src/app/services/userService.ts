import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Global } from './global';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable(
  // aca estoy definiendo que el servicio se va a poder inyectar en cualquier componente
  { providedIn: 'root' }
)
export class UserService {
  public url: string;
  public identity: any;
  public token: any;

  constructor(public _http: HttpClient) {
    this.url = environment.url;
  }

  register(user: any): Observable<any> {
    // aca estoy convirtiendo el objeto user a un json
    let json = JSON.stringify(user);
    // aca estoy creando un string con el json
    let params = 'json=' + json;

    // aca estoy definiendo el tipo de contenido que se va a enviar por el header
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // retorno el http con el metodo post, la url y los parametros y los headers que se van a enviar y capturo el error si lo hay
    return this._http.post(this.url + 'register', params, { headers: headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  signup(user: any, getToken: any = null): Observable<any> {
    if (getToken != null) {
      user.getToken = 'true';
    }
    //convierto en json string el user
    let json = JSON.stringify(user);
    //le damos el formato json
    let params = 'json=' + json;

    //creamos la cabecera
    let headers = new HttpHeaders().set(
      'Content-type',
      'application/x-www-form-urlencoded'
    );

    //retornamos la ruta, el json string y la cabecera
    return this._http.post(this.url + 'login', params, { headers: headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getIdentity(): Observable<any> {
    let identity = JSON.parse(localStorage.getItem('identity') || '{}');
    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken(): string{
    let token = localStorage.getItem('token');

    if (token && token !== 'undefined') {
      this.token = token;
    } else {
      this.token = '';
    }
    return this.token;
  }

  getUserImage(imageName: string | null): string {
    return imageName ? `${this.url}user/avatar/${imageName}` : 'assets/default-avatar.png';
  }

  update(token: any, data: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token).set('Contennt-Type', 'Multipart/form-data');

    return this._http.post(this.url+'update', data, {
      headers: headers
    });
  }
  

  clearSession(): void {
    this.identity = null;
    this.token = null;
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
  }

  saveSession(identity: any, token: any): void {
    this.identity = identity;
    this.token = token;
    localStorage.setItem('identity', JSON.stringify(identity));
    localStorage.setItem('token', token);
  }

}
