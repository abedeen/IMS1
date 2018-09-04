import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameEntityIms } from 'app/shared/model/name-entity-ims.model';
import { NameEntityImsService } from './name-entity-ims.service';
import { NameEntityImsComponent } from './name-entity-ims.component';
import { NameEntityImsDetailComponent } from './name-entity-ims-detail.component';
import { NameEntityImsUpdateComponent } from './name-entity-ims-update.component';
import { NameEntityImsDeletePopupComponent } from './name-entity-ims-delete-dialog.component';
import { INameEntityIms } from 'app/shared/model/name-entity-ims.model';

@Injectable({ providedIn: 'root' })
export class NameEntityImsResolve implements Resolve<INameEntityIms> {
    constructor(private service: NameEntityImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((nameEntity: HttpResponse<NameEntityIms>) => nameEntity.body));
        }
        return of(new NameEntityIms());
    }
}

export const nameEntityRoute: Routes = [
    {
        path: 'name-entity-ims',
        component: NameEntityImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NameEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'name-entity-ims/:id/view',
        component: NameEntityImsDetailComponent,
        resolve: {
            nameEntity: NameEntityImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NameEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'name-entity-ims/new',
        component: NameEntityImsUpdateComponent,
        resolve: {
            nameEntity: NameEntityImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NameEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'name-entity-ims/:id/edit',
        component: NameEntityImsUpdateComponent,
        resolve: {
            nameEntity: NameEntityImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NameEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nameEntityPopupRoute: Routes = [
    {
        path: 'name-entity-ims/:id/delete',
        component: NameEntityImsDeletePopupComponent,
        resolve: {
            nameEntity: NameEntityImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NameEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
