import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProdNameIms } from 'app/shared/model/prod-name-ims.model';

@Component({
    selector: 'jhi-prod-name-ims-detail',
    templateUrl: './prod-name-ims-detail.component.html'
})
export class ProdNameImsDetailComponent implements OnInit {
    prodName: IProdNameIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prodName }) => {
            this.prodName = prodName;
        });
    }

    previousState() {
        window.history.back();
    }
}
