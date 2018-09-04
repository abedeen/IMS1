import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderStatusIms } from 'app/shared/model/order-status-ims.model';

@Component({
    selector: 'jhi-order-status-ims-detail',
    templateUrl: './order-status-ims-detail.component.html'
})
export class OrderStatusImsDetailComponent implements OnInit {
    orderStatus: IOrderStatusIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderStatus }) => {
            this.orderStatus = orderStatus;
        });
    }

    previousState() {
        window.history.back();
    }
}
