import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProdNameIms } from 'app/shared/model/prod-name-ims.model';

type EntityResponseType = HttpResponse<IProdNameIms>;
type EntityArrayResponseType = HttpResponse<IProdNameIms[]>;

@Injectable({ providedIn: 'root' })
export class ProdNameImsService {
    private resourceUrl = SERVER_API_URL + 'api/prod-names';

    constructor(private http: HttpClient) {}

    create(prodName: IProdNameIms): Observable<EntityResponseType> {
        return this.http.post<IProdNameIms>(this.resourceUrl, prodName, { observe: 'response' });
    }

    update(prodName: IProdNameIms): Observable<EntityResponseType> {
        return this.http.put<IProdNameIms>(this.resourceUrl, prodName, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProdNameIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProdNameIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
