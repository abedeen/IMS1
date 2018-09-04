import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderItemsIms } from 'app/shared/model/order-items-ims.model';
import { OrderItemsImsService } from './order-items-ims.service';
import { OrderItemsImsComponent } from './order-items-ims.component';
import { OrderItemsImsDetailComponent } from './order-items-ims-detail.component';
import { OrderItemsImsUpdateComponent } from './order-items-ims-update.component';
import { OrderItemsImsDeletePopupComponent } from './order-items-ims-delete-dialog.component';
import { IOrderItemsIms } from 'app/shared/model/order-items-ims.model';

@Injectable({ providedIn: 'root' })
export class OrderItemsImsResolve implements Resolve<IOrderItemsIms> {
    constructor(private service: OrderItemsImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderItems: HttpResponse<OrderItemsIms>) => orderItems.body));
        }
        return of(new OrderItemsIms());
    }
}

export const orderItemsRoute: Routes = [
    {
        path: 'order-items-ims',
        component: OrderItemsImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-items-ims/:id/view',
        component: OrderItemsImsDetailComponent,
        resolve: {
            orderItems: OrderItemsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-items-ims/new',
        component: OrderItemsImsUpdateComponent,
        resolve: {
            orderItems: OrderItemsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-items-ims/:id/edit',
        component: OrderItemsImsUpdateComponent,
        resolve: {
            orderItems: OrderItemsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderItems'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderItemsPopupRoute: Routes = [
    {
        path: 'order-items-ims/:id/delete',
        component: OrderItemsImsDeletePopupComponent,
        resolve: {
            orderItems: OrderItemsImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
