import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoryIms } from 'app/shared/model/category-ims.model';
import { CategoryImsService } from './category-ims.service';

@Component({
    selector: 'jhi-category-ims-delete-dialog',
    templateUrl: './category-ims-delete-dialog.component.html'
})
export class CategoryImsDeleteDialogComponent {
    category: ICategoryIms;

    constructor(private categoryService: CategoryImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-ims-delete-popup',
    template: ''
})
export class CategoryImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ category }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoryImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.category = category;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
