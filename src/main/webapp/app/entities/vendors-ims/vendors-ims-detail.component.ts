import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVendorsIms } from 'app/shared/model/vendors-ims.model';

@Component({
    selector: 'jhi-vendors-ims-detail',
    templateUrl: './vendors-ims-detail.component.html'
})
export class VendorsImsDetailComponent implements OnInit {
    vendors: IVendorsIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vendors }) => {
            this.vendors = vendors;
        });
    }

    previousState() {
        window.history.back();
    }
}
