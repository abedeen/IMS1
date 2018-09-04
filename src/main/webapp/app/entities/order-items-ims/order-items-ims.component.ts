import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderItemsIms } from 'app/shared/model/order-items-ims.model';
import { Principal } from 'app/core';
import { OrderItemsImsService } from './order-items-ims.service';

@Component({
    selector: 'jhi-order-items-ims',
    templateUrl: './order-items-ims.component.html'
})
export class OrderItemsImsComponent implements OnInit, OnDestroy {
    orderItems: IOrderItemsIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderItemsService: OrderItemsImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderItemsService.query().subscribe(
            (res: HttpResponse<IOrderItemsIms[]>) => {
                this.orderItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderItemsIms) {
        return item.id;
    }

    registerChangeInOrderItems() {
        this.eventSubscriber = this.eventManager.subscribe('orderItemsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
