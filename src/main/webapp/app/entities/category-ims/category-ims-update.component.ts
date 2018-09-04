import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoryIms } from 'app/shared/model/category-ims.model';
import { CategoryImsService } from './category-ims.service';

@Component({
    selector: 'jhi-category-ims-update',
    templateUrl: './category-ims-update.component.html'
})
export class CategoryImsUpdateComponent implements OnInit {
    private _category: ICategoryIms;
    isSaving: boolean;

    constructor(private categoryService: CategoryImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(this.categoryService.create(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoryIms>>) {
        result.subscribe((res: HttpResponse<ICategoryIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get category() {
        return this._category;
    }

    set category(category: ICategoryIms) {
        this._category = category;
    }
}
