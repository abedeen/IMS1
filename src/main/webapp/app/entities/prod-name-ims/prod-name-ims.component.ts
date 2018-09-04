import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProdNameIms } from 'app/shared/model/prod-name-ims.model';
import { Principal } from 'app/core';
import { ProdNameImsService } from './prod-name-ims.service';

@Component({
    selector: 'jhi-prod-name-ims',
    templateUrl: './prod-name-ims.component.html'
})
export class ProdNameImsComponent implements OnInit, OnDestroy {
    prodNames: IProdNameIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prodNameService: ProdNameImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.prodNameService.query().subscribe(
            (res: HttpResponse<IProdNameIms[]>) => {
                this.prodNames = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProdNames();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProdNameIms) {
        return item.id;
    }

    registerChangeInProdNames() {
        this.eventSubscriber = this.eventManager.subscribe('prodNameListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
