import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdNameIms } from 'app/shared/model/prod-name-ims.model';
import { ProdNameImsService } from './prod-name-ims.service';
import { ProdNameImsComponent } from './prod-name-ims.component';
import { ProdNameImsDetailComponent } from './prod-name-ims-detail.component';
import { ProdNameImsUpdateComponent } from './prod-name-ims-update.component';
import { ProdNameImsDeletePopupComponent } from './prod-name-ims-delete-dialog.component';
import { IProdNameIms } from 'app/shared/model/prod-name-ims.model';

@Injectable({ providedIn: 'root' })
export class ProdNameImsResolve implements Resolve<IProdNameIms> {
    constructor(private service: ProdNameImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((prodName: HttpResponse<ProdNameIms>) => prodName.body));
        }
        return of(new ProdNameIms());
    }
}

export const prodNameRoute: Routes = [
    {
        path: 'prod-name-ims',
        component: ProdNameImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prod-name-ims/:id/view',
        component: ProdNameImsDetailComponent,
        resolve: {
            prodName: ProdNameImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prod-name-ims/new',
        component: ProdNameImsUpdateComponent,
        resolve: {
            prodName: ProdNameImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prod-name-ims/:id/edit',
        component: ProdNameImsUpdateComponent,
        resolve: {
            prodName: ProdNameImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdNames'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prodNamePopupRoute: Routes = [
    {
        path: 'prod-name-ims/:id/delete',
        component: ProdNameImsDeletePopupComponent,
        resolve: {
            prodName: ProdNameImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdNames'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
