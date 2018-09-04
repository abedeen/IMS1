import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INameEntityIms } from 'app/shared/model/name-entity-ims.model';
import { NameEntityImsService } from './name-entity-ims.service';

@Component({
    selector: 'jhi-name-entity-ims-update',
    templateUrl: './name-entity-ims-update.component.html'
})
export class NameEntityImsUpdateComponent implements OnInit {
    private _nameEntity: INameEntityIms;
    isSaving: boolean;

    constructor(private nameEntityService: NameEntityImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nameEntity }) => {
            this.nameEntity = nameEntity;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nameEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.nameEntityService.update(this.nameEntity));
        } else {
            this.subscribeToSaveResponse(this.nameEntityService.create(this.nameEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INameEntityIms>>) {
        result.subscribe((res: HttpResponse<INameEntityIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get nameEntity() {
        return this._nameEntity;
    }

    set nameEntity(nameEntity: INameEntityIms) {
        this._nameEntity = nameEntity;
    }
}
