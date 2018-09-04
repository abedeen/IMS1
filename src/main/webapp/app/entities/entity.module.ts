import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Ims1TenantImsModule } from './tenant-ims/tenant-ims.module';
import { Ims1UserGroupImsModule } from './user-group-ims/user-group-ims.module';
import { Ims1StockImsModule } from './stock-ims/stock-ims.module';
import { Ims1OrderItemsImsModule } from './order-items-ims/order-items-ims.module';
import { Ims1OrdersImsModule } from './orders-ims/orders-ims.module';
import { Ims1OrderStatusImsModule } from './order-status-ims/order-status-ims.module';
import { Ims1VendorsImsModule } from './vendors-ims/vendors-ims.module';
import { Ims1CategoryImsModule } from './category-ims/category-ims.module';
import { Ims1ConditionImsModule } from './condition-ims/condition-ims.module';
import { Ims1UsersImsModule } from './users-ims/users-ims.module';
import { Ims1ProdNameImsModule } from './prod-name-ims/prod-name-ims.module';
import { Ims1NameEntityImsModule } from './name-entity-ims/name-entity-ims.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Ims1TenantImsModule,
        Ims1UserGroupImsModule,
        Ims1StockImsModule,
        Ims1OrderItemsImsModule,
        Ims1OrdersImsModule,
        Ims1OrderStatusImsModule,
        Ims1VendorsImsModule,
        Ims1CategoryImsModule,
        Ims1ConditionImsModule,
        Ims1UsersImsModule,
        Ims1ProdNameImsModule,
        Ims1NameEntityImsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ims1EntityModule {}
