import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INameEntityIms } from 'app/shared/model/name-entity-ims.model';

type EntityResponseType = HttpResponse<INameEntityIms>;
type EntityArrayResponseType = HttpResponse<INameEntityIms[]>;

@Injectable({ providedIn: 'root' })
export class NameEntityImsService {
    private resourceUrl = SERVER_API_URL + 'api/name-entities';

    constructor(private http: HttpClient) {}

    create(nameEntity: INameEntityIms): Observable<EntityResponseType> {
        return this.http.post<INameEntityIms>(this.resourceUrl, nameEntity, { observe: 'response' });
    }

    update(nameEntity: INameEntityIms): Observable<EntityResponseType> {
        return this.http.put<INameEntityIms>(this.resourceUrl, nameEntity, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INameEntityIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INameEntityIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
