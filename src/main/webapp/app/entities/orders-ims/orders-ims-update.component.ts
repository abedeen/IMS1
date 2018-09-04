import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrdersIms } from 'app/shared/model/orders-ims.model';
import { OrdersImsService } from './orders-ims.service';
import { IVendorsIms } from 'app/shared/model/vendors-ims.model';
import { VendorsImsService } from 'app/entities/vendors-ims';

@Component({
    selector: 'jhi-orders-ims-update',
    templateUrl: './orders-ims-update.component.html'
})
export class OrdersImsUpdateComponent implements OnInit {
    private _orders: IOrdersIms;
    isSaving: boolean;

    vendors: IVendorsIms[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private ordersService: OrdersImsService,
        private vendorsService: VendorsImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orders }) => {
            this.orders = orders;
        });
        this.vendorsService.query({ filter: 'orders-is-null' }).subscribe(
            (res: HttpResponse<IVendorsIms[]>) => {
                if (!this.orders.vendorsId) {
                    this.vendors = res.body;
                } else {
                    this.vendorsService.find(this.orders.vendorsId).subscribe(
                        (subRes: HttpResponse<IVendorsIms>) => {
                            this.vendors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orders.id !== undefined) {
            this.subscribeToSaveResponse(this.ordersService.update(this.orders));
        } else {
            this.subscribeToSaveResponse(this.ordersService.create(this.orders));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrdersIms>>) {
        result.subscribe((res: HttpResponse<IOrdersIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackVendorsById(index: number, item: IVendorsIms) {
        return item.id;
    }
    get orders() {
        return this._orders;
    }

    set orders(orders: IOrdersIms) {
        this._orders = orders;
    }
}
