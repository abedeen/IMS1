import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INameEntityIms } from 'app/shared/model/name-entity-ims.model';
import { NameEntityImsService } from './name-entity-ims.service';

@Component({
    selector: 'jhi-name-entity-ims-delete-dialog',
    templateUrl: './name-entity-ims-delete-dialog.component.html'
})
export class NameEntityImsDeleteDialogComponent {
    nameEntity: INameEntityIms;

    constructor(
        private nameEntityService: NameEntityImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nameEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nameEntityListModification',
                content: 'Deleted an nameEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-name-entity-ims-delete-popup',
    template: ''
})
export class NameEntityImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nameEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NameEntityImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.nameEntity = nameEntity;
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
