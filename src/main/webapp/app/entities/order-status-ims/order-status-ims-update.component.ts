import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderStatusIms } from 'app/shared/model/order-status-ims.model';
import { OrderStatusImsService } from './order-status-ims.service';

@Component({
    selector: 'jhi-order-status-ims-update',
    templateUrl: './order-status-ims-update.component.html'
})
export class OrderStatusImsUpdateComponent implements OnInit {
    private _orderStatus: IOrderStatusIms;
    isSaving: boolean;

    constructor(private orderStatusService: OrderStatusImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderStatus }) => {
            this.orderStatus = orderStatus;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderStatus.id !== undefined) {
            this.subscribeToSaveResponse(this.orderStatusService.update(this.orderStatus));
        } else {
            this.subscribeToSaveResponse(this.orderStatusService.create(this.orderStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderStatusIms>>) {
        result.subscribe((res: HttpResponse<IOrderStatusIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderStatus() {
        return this._orderStatus;
    }

    set orderStatus(orderStatus: IOrderStatusIms) {
        this._orderStatus = orderStatus;
    }
}
