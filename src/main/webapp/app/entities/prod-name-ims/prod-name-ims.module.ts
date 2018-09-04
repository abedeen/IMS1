import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ims1SharedModule } from 'app/shared';
import {
    ProdNameImsComponent,
    ProdNameImsDetailComponent,
    ProdNameImsUpdateComponent,
    ProdNameImsDeletePopupComponent,
    ProdNameImsDeleteDialogComponent,
    prodNameRoute,
    prodNamePopupRoute
} from './';

const ENTITY_STATES = [...prodNameRoute, ...prodNamePopupRoute];

@NgModule({
    imports: [Ims1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProdNameImsComponent,
        ProdNameImsDetailComponent,
        ProdNameImsUpdateComponent,
        ProdNameImsDeleteDialogComponent,
        ProdNameImsDeletePopupComponent
    ],
    entryComponents: [ProdNameImsComponent, ProdNameImsUpdateComponent, ProdNameImsDeleteDialogComponent, ProdNameImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1ProdNameImsModule {}
