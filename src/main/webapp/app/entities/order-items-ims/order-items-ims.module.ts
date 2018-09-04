import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    OrderItemsImsComponent,
    OrderItemsImsDetailComponent,
    OrderItemsImsUpdateComponent,
    OrderItemsImsDeletePopupComponent,
    OrderItemsImsDeleteDialogComponent,
    orderItemsRoute,
    orderItemsPopupRoute
} from './';

const ENTITY_STATES = [...orderItemsRoute, ...orderItemsPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderItemsImsComponent,
        OrderItemsImsDetailComponent,
        OrderItemsImsUpdateComponent,
        OrderItemsImsDeleteDialogComponent,
        OrderItemsImsDeletePopupComponent
    ],
    entryComponents: [
        OrderItemsImsComponent,
        OrderItemsImsUpdateComponent,
        OrderItemsImsDeleteDialogComponent,
        OrderItemsImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1OrderItemsImsModule {}
