import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVendorsIms } from 'app/shared/model/vendors-ims.model';
import { VendorsImsService } from './vendors-ims.service';

@Component({
    selector: 'jhi-vendors-ims-delete-dialog',
    templateUrl: './vendors-ims-delete-dialog.component.html'
})
export class VendorsImsDeleteDialogComponent {
    vendors: IVendorsIms;

    constructor(private vendorsService: VendorsImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vendorsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vendorsListModification',
                content: 'Deleted an vendors'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vendors-ims-delete-popup',
    template: ''
})
export class VendorsImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vendors }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VendorsImsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.vendors = vendors;
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
