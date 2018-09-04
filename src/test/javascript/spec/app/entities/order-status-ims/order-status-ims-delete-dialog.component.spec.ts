/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Ims1TestModule } from '../../../test.module';
import { OrderStatusImsDeleteDialogComponent } from 'app/entities/order-status-ims/order-status-ims-delete-dialog.component';
import { OrderStatusImsService } from 'app/entities/order-status-ims/order-status-ims.service';

describe('Component Tests', () => {
    describe('OrderStatusIms Management Delete Component', () => {
        let comp: OrderStatusImsDeleteDialogComponent;
        let fixture: ComponentFixture<OrderStatusImsDeleteDialogComponent>;
        let service: OrderStatusImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [OrderStatusImsDeleteDialogComponent]
            })
                .overrideTemplate(OrderStatusImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderStatusImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderStatusImsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
