import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INameEntityIms } from 'app/shared/model/name-entity-ims.model';
import { Principal } from 'app/core';
import { NameEntityImsService } from './name-entity-ims.service';

@Component({
    selector: 'jhi-name-entity-ims',
    templateUrl: './name-entity-ims.component.html'
})
export class NameEntityImsComponent implements OnInit, OnDestroy {
    nameEntities: INameEntityIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private nameEntityService: NameEntityImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.nameEntityService.query().subscribe(
            (res: HttpResponse<INameEntityIms[]>) => {
                this.nameEntities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNameEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INameEntityIms) {
        return item.id;
    }

    registerChangeInNameEntities() {
        this.eventSubscriber = this.eventManager.subscribe('nameEntityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
