import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderStatusIms } from 'app/shared/model/order-status-ims.model';
import { OrderStatusImsService } from './order-status-ims.service';

@Component({
    selector: 'jhi-order-status-ims-delete-dialog',
    templateUrl: './order-status-ims-delete-dialog.component.html'
})
export class OrderStatusImsDeleteDialogComponent {
    orderStatus: IOrderStatusIms;

    constructor(
        private orderStatusService: OrderStatusImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderStatusListModification',
                content: 'Deleted an orderStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-status-ims-delete-popup',
    template: ''
})
export class OrderStatusImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderStatus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderStatusImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderStatus = orderStatus;
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
