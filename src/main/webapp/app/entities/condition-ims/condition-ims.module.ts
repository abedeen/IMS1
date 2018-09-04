import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    ConditionImsComponent,
    ConditionImsDetailComponent,
    ConditionImsUpdateComponent,
    ConditionImsDeletePopupComponent,
    ConditionImsDeleteDialogComponent,
    conditionRoute,
    conditionPopupRoute
} from './';

const ENTITY_STATES = [...conditionRoute, ...conditionPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConditionImsComponent,
        ConditionImsDetailComponent,
        ConditionImsUpdateComponent,
        ConditionImsDeleteDialogComponent,
        ConditionImsDeletePopupComponent
    ],
    entryComponents: [
        ConditionImsComponent,
        ConditionImsUpdateComponent,
        ConditionImsDeleteDialogComponent,
        ConditionImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1ConditionImsModule {}
