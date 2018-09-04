import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderItemsIms } from 'app/shared/model/order-items-ims.model';

@Component({
    selector: 'jhi-order-items-ims-detail',
    templateUrl: './order-items-ims-detail.component.html'
})
export class OrderItemsImsDetailComponent implements OnInit {
    orderItems: IOrderItemsIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderItems }) => {
            this.orderItems = orderItems;
        });
    }

    previousState() {
        window.history.back();
    }
}
