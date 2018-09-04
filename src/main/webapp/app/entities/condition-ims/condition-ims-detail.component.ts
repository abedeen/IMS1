import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConditionIms } from 'app/shared/model/condition-ims.model';

@Component({
    selector: 'jhi-condition-ims-detail',
    templateUrl: './condition-ims-detail.component.html'
})
export class ConditionImsDetailComponent implements OnInit {
    condition: IConditionIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ condition }) => {
            this.condition = condition;
        });
    }

    previousState() {
        window.history.back();
    }
}
