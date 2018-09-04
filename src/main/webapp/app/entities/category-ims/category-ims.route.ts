import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryIms } from 'app/shared/model/category-ims.model';
import { CategoryImsService } from './category-ims.service';
import { CategoryImsComponent } from './category-ims.component';
import { CategoryImsDetailComponent } from './category-ims-detail.component';
import { CategoryImsUpdateComponent } from './category-ims-update.component';
import { CategoryImsDeletePopupComponent } from './category-ims-delete-dialog.component';
import { ICategoryIms } from 'app/shared/model/category-ims.model';

@Injectable({ providedIn: 'root' })
export class CategoryImsResolve implements Resolve<ICategoryIms> {
    constructor(private service: CategoryImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((category: HttpResponse<CategoryIms>) => category.body));
        }
        return of(new CategoryIms());
    }
}

export const categoryRoute: Routes = [
    {
        path: 'category-ims',
        component: CategoryImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-ims/:id/view',
        component: CategoryImsDetailComponent,
        resolve: {
            category: CategoryImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-ims/new',
        component: CategoryImsUpdateComponent,
        resolve: {
            category: CategoryImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-ims/:id/edit',
        component: CategoryImsUpdateComponent,
        resolve: {
            category: CategoryImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-ims/:id/delete',
        component: CategoryImsDeletePopupComponent,
        resolve: {
            category: CategoryImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
