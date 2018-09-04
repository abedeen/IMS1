import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VendorsIms } from 'app/shared/model/vendors-ims.model';
import { VendorsImsService } from './vendors-ims.service';
import { VendorsImsComponent } from './vendors-ims.component';
import { VendorsImsDetailComponent } from './vendors-ims-detail.component';
import { VendorsImsUpdateComponent } from './vendors-ims-update.component';
import { VendorsImsDeletePopupComponent } from './vendors-ims-delete-dialog.component';
import { IVendorsIms } from 'app/shared/model/vendors-ims.model';

@Injectable({ providedIn: 'root' })
export class VendorsImsResolve implements Resolve<IVendorsIms> {
    constructor(private service: VendorsImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((vendors: HttpResponse<VendorsIms>) => vendors.body));
        }
        return of(new VendorsIms());
    }
}

export const vendorsRoute: Routes = [
    {
        path: 'vendors-ims',
        component: VendorsImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vendors-ims/:id/view',
        component: VendorsImsDetailComponent,
        resolve: {
            vendors: VendorsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vendors-ims/new',
        component: VendorsImsUpdateComponent,
        resolve: {
            vendors: VendorsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vendors-ims/:id/edit',
        component: VendorsImsUpdateComponent,
        resolve: {
            vendors: VendorsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vendorsPopupRoute: Routes = [
    {
        path: 'vendors-ims/:id/delete',
        component: VendorsImsDeletePopupComponent,
        resolve: {
            vendors: VendorsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
