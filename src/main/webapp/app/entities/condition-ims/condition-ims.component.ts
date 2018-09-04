import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConditionIms } from 'app/shared/model/condition-ims.model';
import { Principal } from 'app/core';
import { ConditionImsService } from './condition-ims.service';

@Component({
    selector: 'jhi-condition-ims',
    templateUrl: './condition-ims.component.html'
})
export class ConditionImsComponent implements OnInit, OnDestroy {
    conditions: IConditionIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private conditionService: ConditionImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.conditionService.query().subscribe(
            (res: HttpResponse<IConditionIms[]>) => {
                this.conditions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConditions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConditionIms) {
        return item.id;
    }

    registerChangeInConditions() {
        this.eventSubscriber = this.eventManager.subscribe('conditionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
