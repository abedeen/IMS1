import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderItemsIms } from 'app/shared/model/order-items-ims.model';
import { OrderItemsImsService } from './order-items-ims.service';

@Component({
    selector: 'jhi-order-items-ims-delete-dialog',
    templateUrl: './order-items-ims-delete-dialog.component.html'
})
export class OrderItemsImsDeleteDialogComponent {
    orderItems: IOrderItemsIms;

    constructor(
        private orderItemsService: OrderItemsImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderItemsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderItemsListModification',
                content: 'Deleted an orderItems'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-items-ims-delete-popup',
    template: ''
})
export class OrderItemsImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderItems }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderItemsImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderItems = orderItems;
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
