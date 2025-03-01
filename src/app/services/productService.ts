import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Observable } from "rxjs";

@Injectable()
export class ProductService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    create(token: any, product: any): Observable<any> {
        let json = JSON.stringify(product);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'product', params, { headers: headers });
    }

    getProducts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'product', { headers: headers });
    }

    update(token: any, product: any, id: any): Observable<any> {
        let json = JSON.stringify(product);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'product/' + id, params, { headers: headers });
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