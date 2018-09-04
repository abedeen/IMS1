/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Ims1TestModule } from '../../../test.module';
import { NameEntityImsDeleteDialogComponent } from 'app/entities/name-entity-ims/name-entity-ims-delete-dialog.component';
import { NameEntityImsService } from 'app/entities/name-entity-ims/name-entity-ims.service';

describe('Component Tests', () => {
    describe('NameEntityIms Management Delete Component', () => {
        let comp: NameEntityImsDeleteDialogComponent;
        let fixture: ComponentFixture<NameEntityImsDeleteDialogComponent>;
        let service: NameEntityImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [NameEntityImsDeleteDialogComponent]
            })
                .overrideTemplate(NameEntityImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NameEntityImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NameEntityImsService);
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
