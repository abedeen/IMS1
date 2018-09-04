import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConditionIms } from 'app/shared/model/condition-ims.model';

type EntityResponseType = HttpResponse<IConditionIms>;
type EntityArrayResponseType = HttpResponse<IConditionIms[]>;

@Injectable({ providedIn: 'root' })
export class ConditionImsService {
    private resourceUrl = SERVER_API_URL + 'api/conditions';

    constructor(private http: HttpClient) {}

    create(condition: IConditionIms): Observable<EntityResponseType> {
        return this.http.post<IConditionIms>(this.resourceUrl, condition, { observe: 'response' });
    }

    update(condition: IConditionIms): Observable<EntityResponseType> {
        return this.http.put<IConditionIms>(this.resourceUrl, condition, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IConditionIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IConditionIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
