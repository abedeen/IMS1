import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderStatusIms } from 'app/shared/model/order-status-ims.model';
import { OrderStatusImsService } from './order-status-ims.service';
import { OrderStatusImsComponent } from './order-status-ims.component';
import { OrderStatusImsDetailComponent } from './order-status-ims-detail.component';
import { OrderStatusImsUpdateComponent } from './order-status-ims-update.component';
import { OrderStatusImsDeletePopupComponent } from './order-status-ims-delete-dialog.component';
import { IOrderStatusIms } from 'app/shared/model/order-status-ims.model';

@Injectable({ providedIn: 'root' })
export class OrderStatusImsResolve implements Resolve<IOrderStatusIms> {
    constructor(private service: OrderStatusImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderStatus: HttpResponse<OrderStatusIms>) => orderStatus.body));
        }
        return of(new OrderStatusIms());
    }
}

export const orderStatusRoute: Routes = [
    {
        path: 'order-status-ims',
        component: OrderStatusImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-status-ims/:id/view',
        component: OrderStatusImsDetailComponent,
        resolve: {
            orderStatus: OrderStatusImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-status-ims/new',
        component: OrderStatusImsUpdateComponent,
        resolve: {
            orderStatus: OrderStatusImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-status-ims/:id/edit',
        component: OrderStatusImsUpdateComponent,
        resolve: {
            orderStatus: OrderStatusImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderStatusPopupRoute: Routes = [
    {
        path: 'order-status-ims/:id/delete',
        component: OrderStatusImsDeletePopupComponent,
        resolve: {
            orderStatus: OrderStatusImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
