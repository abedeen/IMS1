import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProdNameIms } from 'app/shared/model/prod-name-ims.model';
import { ProdNameImsService } from './prod-name-ims.service';

@Component({
    selector: 'jhi-prod-name-ims-update',
    templateUrl: './prod-name-ims-update.component.html'
})
export class ProdNameImsUpdateComponent implements OnInit {
    private _prodName: IProdNameIms;
    isSaving: boolean;

    constructor(private prodNameService: ProdNameImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prodName }) => {
            this.prodName = prodName;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prodName.id !== undefined) {
            this.subscribeToSaveResponse(this.prodNameService.update(this.prodName));
        } else {
            this.subscribeToSaveResponse(this.prodNameService.create(this.prodName));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProdNameIms>>) {
        result.subscribe((res: HttpResponse<IProdNameIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get prodName() {
        return this._prodName;
    }

    set prodName(prodName: IProdNameIms) {
        this._prodName = prodName;
    }
}
