import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConditionIms } from 'app/shared/model/condition-ims.model';
import { ConditionImsService } from './condition-ims.service';

@Component({
    selector: 'jhi-condition-ims-delete-dialog',
    templateUrl: './condition-ims-delete-dialog.component.html'
})
export class ConditionImsDeleteDialogComponent {
    condition: IConditionIms;

    constructor(private conditionService: ConditionImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conditionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'conditionListModification',
                content: 'Deleted an condition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-condition-ims-delete-popup',
    template: ''
})
export class ConditionImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ condition }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConditionImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.condition = condition;
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
