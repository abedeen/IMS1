/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Ims1TestModule } from '../../../test.module';
import { ConditionImsDeleteDialogComponent } from 'app/entities/condition-ims/condition-ims-delete-dialog.component';
import { ConditionImsService } from 'app/entities/condition-ims/condition-ims.service';

describe('Component Tests', () => {
    describe('ConditionIms Management Delete Component', () => {
        let comp: ConditionImsDeleteDialogComponent;
        let fixture: ComponentFixture<ConditionImsDeleteDialogComponent>;
        let service: ConditionImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ConditionImsDeleteDialogComponent]
            })
                .overrideTemplate(ConditionImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConditionImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConditionImsService);
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
