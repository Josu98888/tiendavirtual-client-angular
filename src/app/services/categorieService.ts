import { Injectable } from "@angular/core"; //para injectar en cualquier componente el servicio
import { HttpClient, HttpHeaders } from "@angular/common/http"; // para hacer las peticiones y las cabeceras
import { Observable } from "rxjs"; //para obtener la respuestta del server
import { environment } from "src/environments/environment";

@Injectable() //decorador pára no instaciar la clase donde se la cree
export class CategorieService {
    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = environment.url;
    }

    getCategories(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'categorie', { headers: headers });
    }

    create(categorie: any, token: any): Observable<any> {
        let json = JSON.stringify(categorie);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'categorie', params, { headers: headers });
    }

    update(categorie: any, id: any, token: any): Observable<any> {
        let json = JSON.stringify(categorie);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.put(this.url + 'categorie/' + id, params, { headers: headers });
    }

    getCategorie(id:any): Observable<any> {
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');

        return this._http.get(this.url + 'categorie/' + id, {headers: headers})
    }

    delete(id:any, token:any): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.delete(this.url + 'categorie/' + id, {headers: headers});
    }
}