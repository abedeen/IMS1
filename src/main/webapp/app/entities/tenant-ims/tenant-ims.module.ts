import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    TenantImsComponent,
    TenantImsDetailComponent,
    TenantImsUpdateComponent,
    TenantImsDeletePopupComponent,
    TenantImsDeleteDialogComponent,
    tenantRoute,
    tenantPopupRoute
} from './';

const ENTITY_STATES = [...tenantRoute, ...tenantPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TenantImsComponent,
        TenantImsDetailComponent,
        TenantImsUpdateComponent,
        TenantImsDeleteDialogComponent,
        TenantImsDeletePopupComponent
    ],
    entryComponents: [TenantImsComponent, TenantImsUpdateComponent, TenantImsDeleteDialogComponent, TenantImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1TenantImsModule {}
