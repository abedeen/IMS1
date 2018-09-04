import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProdNameIms } from 'app/shared/model/prod-name-ims.model';
import { ProdNameImsService } from './prod-name-ims.service';

@Component({
    selector: 'jhi-prod-name-ims-delete-dialog',
    templateUrl: './prod-name-ims-delete-dialog.component.html'
})
export class ProdNameImsDeleteDialogComponent {
    prodName: IProdNameIms;

    constructor(private prodNameService: ProdNameImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prodNameService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prodNameListModification',
                content: 'Deleted an prodName'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prod-name-ims-delete-popup',
    template: ''
})
export class ProdNameImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prodName }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProdNameImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prodName = prodName;
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
