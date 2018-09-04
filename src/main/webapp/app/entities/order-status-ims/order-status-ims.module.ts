import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    OrderStatusImsComponent,
    OrderStatusImsDetailComponent,
    OrderStatusImsUpdateComponent,
    OrderStatusImsDeletePopupComponent,
    OrderStatusImsDeleteDialogComponent,
    orderStatusRoute,
    orderStatusPopupRoute
} from './';

const ENTITY_STATES = [...orderStatusRoute, ...orderStatusPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderStatusImsComponent,
        OrderStatusImsDetailComponent,
        OrderStatusImsUpdateComponent,
        OrderStatusImsDeleteDialogComponent,
        OrderStatusImsDeletePopupComponent
    ],
    entryComponents: [
        OrderStatusImsComponent,
        OrderStatusImsUpdateComponent,
        OrderStatusImsDeleteDialogComponent,
        OrderStatusImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1OrderStatusImsModule {}
