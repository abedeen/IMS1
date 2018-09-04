import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    NameEntityImsComponent,
    NameEntityImsDetailComponent,
    NameEntityImsUpdateComponent,
    NameEntityImsDeletePopupComponent,
    NameEntityImsDeleteDialogComponent,
    nameEntityRoute,
    nameEntityPopupRoute
} from './';

const ENTITY_STATES = [...nameEntityRoute, ...nameEntityPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NameEntityImsComponent,
        NameEntityImsDetailComponent,
        NameEntityImsUpdateComponent,
        NameEntityImsDeleteDialogComponent,
        NameEntityImsDeletePopupComponent
    ],
    entryComponents: [
        NameEntityImsComponent,
        NameEntityImsUpdateComponent,
        NameEntityImsDeleteDialogComponent,
        NameEntityImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1NameEntityImsModule {}
