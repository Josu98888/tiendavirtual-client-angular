import { Injectable } from "@angular/core"; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
// injectamos el decorador para que no sea necesario instanciar al invocar la clase
@Injectable()
export class SaleService {
    public url:string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = environment.url;
    }

    create(token:any, user:any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.post(this.url + 'sale', params, {headers:headers});
    }

    index(token:any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.get(this.url + 'sale', {headers:headers});
    }
}