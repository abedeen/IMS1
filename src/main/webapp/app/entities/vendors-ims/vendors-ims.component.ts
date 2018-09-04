import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVendorsIms } from 'app/shared/model/vendors-ims.model';
import { Principal } from 'app/core';
import { VendorsImsService } from './vendors-ims.service';

@Component({
    selector: 'jhi-vendors-ims',
    templateUrl: './vendors-ims.component.html'
})
export class VendorsImsComponent implements OnInit, OnDestroy {
    vendors: IVendorsIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vendorsService: VendorsImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.vendorsService.query().subscribe(
            (res: HttpResponse<IVendorsIms[]>) => {
                this.vendors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVendors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVendorsIms) {
        return item.id;
    }

    registerChangeInVendors() {
        this.eventSubscriber = this.eventManager.subscribe('vendorsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
