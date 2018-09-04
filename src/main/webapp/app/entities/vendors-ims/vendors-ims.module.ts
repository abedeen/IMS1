import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    VendorsImsComponent,
    VendorsImsDetailComponent,
    VendorsImsUpdateComponent,
    VendorsImsDeletePopupComponent,
    VendorsImsDeleteDialogComponent,
    vendorsRoute,
    vendorsPopupRoute
} from './';

const ENTITY_STATES = [...vendorsRoute, ...vendorsPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VendorsImsComponent,
        VendorsImsDetailComponent,
        VendorsImsUpdateComponent,
        VendorsImsDeleteDialogComponent,
        VendorsImsDeletePopupComponent
    ],
    entryComponents: [VendorsImsComponent, VendorsImsUpdateComponent, VendorsImsDeleteDialogComponent, VendorsImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1VendorsImsModule {}
