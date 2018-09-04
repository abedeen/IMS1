import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategoryIms } from 'app/shared/model/category-ims.model';
import { Principal } from 'app/core';
import { CategoryImsService } from './category-ims.service';

@Component({
    selector: 'jhi-category-ims',
    templateUrl: './category-ims.component.html'
})
export class CategoryImsComponent implements OnInit, OnDestroy {
    categories: ICategoryIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private categoryService: CategoryImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategoryIms[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICategoryIms) {
        return item.id;
    }

    registerChangeInCategories() {
        this.eventSubscriber = this.eventManager.subscribe('categoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
