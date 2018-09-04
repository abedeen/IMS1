import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderItemsIms } from 'app/shared/model/order-items-ims.model';

type EntityResponseType = HttpResponse<IOrderItemsIms>;
type EntityArrayResponseType = HttpResponse<IOrderItemsIms[]>;

@Injectable({ providedIn: 'root' })
export class OrderItemsImsService {
    private resourceUrl = SERVER_API_URL + 'api/order-items';

    constructor(private http: HttpClient) {}

    create(orderItems: IOrderItemsIms): Observable<EntityResponseType> {
        return this.http.post<IOrderItemsIms>(this.resourceUrl, orderItems, { observe: 'response' });
    }

    update(orderItems: IOrderItemsIms): Observable<EntityResponseType> {
        return this.http.put<IOrderItemsIms>(this.resourceUrl, orderItems, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrderItemsIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderItemsIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
