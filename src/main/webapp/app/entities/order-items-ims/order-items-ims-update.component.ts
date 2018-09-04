import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderItemsIms } from 'app/shared/model/order-items-ims.model';
import { OrderItemsImsService } from './order-items-ims.service';
import { IOrderStatusIms } from 'app/shared/model/order-status-ims.model';
import { OrderStatusImsService } from 'app/entities/order-status-ims';
import { ICategoryIms } from 'app/shared/model/category-ims.model';
import { CategoryImsService } from 'app/entities/category-ims';
import { IConditionIms } from 'app/shared/model/condition-ims.model';
import { ConditionImsService } from 'app/entities/condition-ims';
import { IProdNameIms } from 'app/shared/model/prod-name-ims.model';
import { ProdNameImsService } from 'app/entities/prod-name-ims';
import { IOrdersIms } from 'app/shared/model/orders-ims.model';
import { OrdersImsService } from 'app/entities/orders-ims';
import { IStockIms } from 'app/shared/model/stock-ims.model';
import { StockImsService } from 'app/entities/stock-ims';

@Component({
    selector: 'jhi-order-items-ims-update',
    templateUrl: './order-items-ims-update.component.html'
})
export class OrderItemsImsUpdateComponent implements OnInit {
    private _orderItems: IOrderItemsIms;
    isSaving: boolean;

    statuses: IOrderStatusIms[];

    categories: ICategoryIms[];

    conditions: IConditionIms[];

    names: IProdNameIms[];

    orders: IOrdersIms[];

    stocks: IStockIms[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderItemsService: OrderItemsImsService,
        private orderStatusService: OrderStatusImsService,
        private categoryService: CategoryImsService,
        private conditionService: ConditionImsService,
        private prodNameService: ProdNameImsService,
        private ordersService: OrdersImsService,
        private stockService: StockImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderItems }) => {
            this.orderItems = orderItems;
        });
        this.orderStatusService.query({ filter: 'orderitems-is-null' }).subscribe(
            (res: HttpResponse<IOrderStatusIms[]>) => {
                if (!this.orderItems.statusId) {
                    this.statuses = res.body;
                } else {
                    this.orderStatusService.find(this.orderItems.statusId).subscribe(
                        (subRes: HttpResponse<IOrderStatusIms>) => {
                            this.statuses = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.categoryService.query({ filter: 'orderitems-is-null' }).subscribe(
            (res: HttpResponse<ICategoryIms[]>) => {
                if (!this.orderItems.categoryId) {
                    this.categories = res.body;
                } else {
                    this.categoryService.find(this.orderItems.categoryId).subscribe(
                        (subRes: HttpResponse<ICategoryIms>) => {
                            this.categories = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.conditionService.query({ filter: 'orderitems-is-null' }).subscribe(
            (res: HttpResponse<IConditionIms[]>) => {
                if (!this.orderItems.conditionId) {
                    this.conditions = res.body;
                } else {
                    this.conditionService.find(this.orderItems.conditionId).subscribe(
                        (subRes: HttpResponse<IConditionIms>) => {
                            this.conditions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.prodNameService.query({ filter: 'orderitems-is-null' }).subscribe(
            (res: HttpResponse<IProdNameIms[]>) => {
                if (!this.orderItems.namesId) {
                    this.names = res.body;
                } else {
                    this.prodNameService.find(this.orderItems.namesId).subscribe(
                        (subRes: HttpResponse<IProdNameIms>) => {
                            this.names = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ordersService.query().subscribe(
            (res: HttpResponse<IOrdersIms[]>) => {
                this.orders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.stockService.query().subscribe(
            (res: HttpResponse<IStockIms[]>) => {
                this.stocks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderItems.id !== undefined) {
            this.subscribeToSaveResponse(this.orderItemsService.update(this.orderItems));
        } else {
            this.subscribeToSaveResponse(this.orderItemsService.create(this.orderItems));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItemsIms>>) {
        result.subscribe((res: HttpResponse<IOrderItemsIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrderStatusById(index: number, item: IOrderStatusIms) {
        return item.id;
    }

    trackCategoryById(index: number, item: ICategoryIms) {
        return item.id;
    }

    trackConditionById(index: number, item: IConditionIms) {
        return item.id;
    }

    trackProdNameById(index: number, item: IProdNameIms) {
        return item.id;
    }

    trackOrdersById(index: number, item: IOrdersIms) {
        return item.id;
    }

    trackStockById(index: number, item: IStockIms) {
        return item.id;
    }
    get orderItems() {
        return this._orderItems;
    }

    set orderItems(orderItems: IOrderItemsIms) {
        this._orderItems = orderItems;
    }
}
