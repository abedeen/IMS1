import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConditionIms } from 'app/shared/model/condition-ims.model';
import { ConditionImsService } from './condition-ims.service';
import { ConditionImsComponent } from './condition-ims.component';
import { ConditionImsDetailComponent } from './condition-ims-detail.component';
import { ConditionImsUpdateComponent } from './condition-ims-update.component';
import { ConditionImsDeletePopupComponent } from './condition-ims-delete-dialog.component';
import { IConditionIms } from 'app/shared/model/condition-ims.model';

@Injectable({ providedIn: 'root' })
export class ConditionImsResolve implements Resolve<IConditionIms> {
    constructor(private service: ConditionImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((condition: HttpResponse<ConditionIms>) => condition.body));
        }
        return of(new ConditionIms());
    }
}

export const conditionRoute: Routes = [
    {
        path: 'condition-ims',
        component: ConditionImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'condition-ims/:id/view',
        component: ConditionImsDetailComponent,
        resolve: {
            condition: ConditionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'condition-ims/new',
        component: ConditionImsUpdateComponent,
        resolve: {
            condition: ConditionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'condition-ims/:id/edit',
        component: ConditionImsUpdateComponent,
        resolve: {
            condition: ConditionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conditionPopupRoute: Routes = [
    {
        path: 'condition-ims/:id/delete',
        component: ConditionImsDeletePopupComponent,
        resolve: {
            condition: ConditionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
