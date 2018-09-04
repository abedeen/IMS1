import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVendorsIms } from 'app/shared/model/vendors-ims.model';
import { VendorsImsService } from './vendors-ims.service';

@Component({
    selector: 'jhi-vendors-ims-update',
    templateUrl: './vendors-ims-update.component.html'
})
export class VendorsImsUpdateComponent implements OnInit {
    private _vendors: IVendorsIms;
    isSaving: boolean;

    constructor(private vendorsService: VendorsImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vendors }) => {
            this.vendors = vendors;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vendors.id !== undefined) {
            this.subscribeToSaveResponse(this.vendorsService.update(this.vendors));
        } else {
            this.subscribeToSaveResponse(this.vendorsService.create(this.vendors));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVendorsIms>>) {
        result.subscribe((res: HttpResponse<IVendorsIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get vendors() {
        return this._vendors;
    }

    set vendors(vendors: IVendorsIms) {
        this._vendors = vendors;
    }
}
