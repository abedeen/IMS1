import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoryIms } from 'app/shared/model/category-ims.model';

@Component({
    selector: 'jhi-category-ims-detail',
    templateUrl: './category-ims-detail.component.html'
})
export class CategoryImsDetailComponent implements OnInit {
    category: ICategoryIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
        });
    }

    previousState() {
        window.history.back();
    }
}
