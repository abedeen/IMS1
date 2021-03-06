import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    UserGroupImsComponent,
    UserGroupImsDetailComponent,
    UserGroupImsUpdateComponent,
    UserGroupImsDeletePopupComponent,
    UserGroupImsDeleteDialogComponent,
    userGroupRoute,
    userGroupPopupRoute
} from './';

const ENTITY_STATES = [...userGroupRoute, ...userGroupPopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserGroupImsComponent,
        UserGroupImsDetailComponent,
        UserGroupImsUpdateComponent,
        UserGroupImsDeleteDialogComponent,
        UserGroupImsDeletePopupComponent
    ],
    entryComponents: [
        UserGroupImsComponent,
        UserGroupImsUpdateComponent,
        UserGroupImsDeleteDialogComponent,
        UserGroupImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1UserGroupImsModule {}
