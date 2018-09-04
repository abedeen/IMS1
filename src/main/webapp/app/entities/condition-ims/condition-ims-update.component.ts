import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IConditionIms } from 'app/shared/model/condition-ims.model';
import { ConditionImsService } from './condition-ims.service';

@Component({
    selector: 'jhi-condition-ims-update',
    templateUrl: './condition-ims-update.component.html'
})
export class ConditionImsUpdateComponent implements OnInit {
    private _condition: IConditionIms;
    isSaving: boolean;

    constructor(private conditionService: ConditionImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ condition }) => {
            this.condition = condition;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.condition.id !== undefined) {
            this.subscribeToSaveResponse(this.conditionService.update(this.condition));
        } else {
            this.subscribeToSaveResponse(this.conditionService.create(this.condition));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConditionIms>>) {
        result.subscribe((res: HttpResponse<IConditionIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get condition() {
        return this._condition;
    }

    set condition(condition: IConditionIms) {
        this._condition = condition;
    }
}
