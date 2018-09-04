import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategoryIms } from 'app/shared/model/category-ims.model';

type EntityResponseType = HttpResponse<ICategoryIms>;
type EntityArrayResponseType = HttpResponse<ICategoryIms[]>;

@Injectable({ providedIn: 'root' })
export class CategoryImsService {
    private resourceUrl = SERVER_API_URL + 'api/categories';

    constructor(private http: HttpClient) {}

    create(category: ICategoryIms): Observable<EntityResponseType> {
        return this.http.post<ICategoryIms>(this.resourceUrl, category, { observe: 'response' });
    }

    update(category: ICategoryIms): Observable<EntityResponseType> {
        return this.http.put<ICategoryIms>(this.resourceUrl, category, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICategoryIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICategoryIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
