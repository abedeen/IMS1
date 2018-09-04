import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    CategoryImsComponent,
    CategoryImsDetailComponent,
    CategoryImsUpdateComponent,
    CategoryImsDeletePopupComponent,
    CategoryImsDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute
} from './';

const ENTITY_STATES = [...categoryRoute, ...categoryPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoryImsComponent,
        CategoryImsDetailComponent,
        CategoryImsUpdateComponent,
        CategoryImsDeleteDialogComponent,
        CategoryImsDeletePopupComponent
    ],
    entryComponents: [CategoryImsComponent, CategoryImsUpdateComponent, CategoryImsDeleteDialogComponent, CategoryImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1CategoryImsModule {}
