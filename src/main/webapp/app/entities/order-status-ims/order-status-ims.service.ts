import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderStatusIms } from 'app/shared/model/order-status-ims.model';

type EntityResponseType = HttpResponse<IOrderStatusIms>;
type EntityArrayResponseType = HttpResponse<IOrderStatusIms[]>;

@Injectable({ providedIn: 'root' })
export class OrderStatusImsService {
    private resourceUrl = SERVER_API_URL + 'api/order-statuses';

    constructor(private http: HttpClient) {}

    create(orderStatus: IOrderStatusIms): Observable<EntityResponseType> {
        return this.http.post<IOrderStatusIms>(this.resourceUrl, orderStatus, { observe: 'response' });
    }

    update(orderStatus: IOrderStatusIms): Observable<EntityResponseType> {
        return this.http.put<IOrderStatusIms>(this.resourceUrl, orderStatus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrderStatusIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderStatusIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
