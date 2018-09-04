import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderStatusIms } from 'app/shared/model/order-status-ims.model';
import { Principal } from 'app/core';
import { OrderStatusImsService } from './order-status-ims.service';

@Component({
    selector: 'jhi-order-status-ims',
    templateUrl: './order-status-ims.component.html'
})
export class OrderStatusImsComponent implements OnInit, OnDestroy {
    orderStatuses: IOrderStatusIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderStatusService: OrderStatusImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderStatusService.query().subscribe(
            (res: HttpResponse<IOrderStatusIms[]>) => {
                this.orderStatuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderStatusIms) {
        return item.id;
    }

    registerChangeInOrderStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('orderStatusListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
