import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ProductService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.url;
    }

    create(token: any, data: any): Observable<any> {
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url + 'product', data, { headers: headers });
    }

    getProducts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'product', { headers: headers });
    }

    update(token: any, data: any, id: any): Observable<any> {
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url + 'product/' + id + '?_method=PUT', data, { headers: headers });
    }

    getProduct(id: any, token: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'product/' + id, { headers: headers });
    }

    delete(token: any, id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.delete(this.url + 'product/' + id, { headers: headers });
    }

    getProductsByCategory(id:any): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'product/getProductsByCategory/' + id, {headers: headers});
    }

    getProductsByText(text:any): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'product/search/' + text, {headers: headers});
    }
}