/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Ims1TestModule } from '../../../test.module';
import { VendorsImsDeleteDialogComponent } from 'app/entities/vendors-ims/vendors-ims-delete-dialog.component';
import { VendorsImsService } from 'app/entities/vendors-ims/vendors-ims.service';

describe('Component Tests', () => {
    describe('VendorsIms Management Delete Component', () => {
        let comp: VendorsImsDeleteDialogComponent;
        let fixture: ComponentFixture<VendorsImsDeleteDialogComponent>;
        let service: VendorsImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [VendorsImsDeleteDialogComponent]
            })
                .overrideTemplate(VendorsImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VendorsImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendorsImsService);
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
