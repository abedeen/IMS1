import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INameEntityIms } from 'app/shared/model/name-entity-ims.model';

@Component({
    selector: 'jhi-name-entity-ims-detail',
    templateUrl: './name-entity-ims-detail.component.html'
})
export class NameEntityImsDetailComponent implements OnInit {
    nameEntity: INameEntityIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nameEntity }) => {
            this.nameEntity = nameEntity;
        });
    }

    previousState() {
        window.history.back();
    }
}
