/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Ims1TestModule } from '../../../test.module';
import { ProdNameImsDeleteDialogComponent } from 'app/entities/prod-name-ims/prod-name-ims-delete-dialog.component';
import { ProdNameImsService } from 'app/entities/prod-name-ims/prod-name-ims.service';

describe('Component Tests', () => {
    describe('ProdNameIms Management Delete Component', () => {
        let comp: ProdNameImsDeleteDialogComponent;
        let fixture: ComponentFixture<ProdNameImsDeleteDialogComponent>;
        let service: ProdNameImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ProdNameImsDeleteDialogComponent]
            })
                .overrideTemplate(ProdNameImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProdNameImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdNameImsService);
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
