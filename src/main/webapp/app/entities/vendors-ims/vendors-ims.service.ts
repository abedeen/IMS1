import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVendorsIms } from 'app/shared/model/vendors-ims.model';

type EntityResponseType = HttpResponse<IVendorsIms>;
type EntityArrayResponseType = HttpResponse<IVendorsIms[]>;

@Injectable({ providedIn: 'root' })
export class VendorsImsService {
    private resourceUrl = SERVER_API_URL + 'api/vendors';

    constructor(private http: HttpClient) {}

    create(vendors: IVendorsIms): Observable<EntityResponseType> {
        return this.http.post<IVendorsIms>(this.resourceUrl, vendors, { observe: 'response' });
    }

    update(vendors: IVendorsIms): Observable<EntityResponseType> {
        return this.http.put<IVendorsIms>(this.resourceUrl, vendors, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVendorsIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVendorsIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
