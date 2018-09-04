/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { ConditionImsUpdateComponent } from 'app/entities/condition-ims/condition-ims-update.component';
import { ConditionImsService } from 'app/entities/condition-ims/condition-ims.service';
import { ConditionIms } from 'app/shared/model/condition-ims.model';

describe('Component Tests', () => {
    describe('ConditionIms Management Update Component', () => {
        let comp: ConditionImsUpdateComponent;
        let fixture: ComponentFixture<ConditionImsUpdateComponent>;
        let service: ConditionImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ConditionImsUpdateComponent]
            })
                .overrideTemplate(ConditionImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConditionImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConditionImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ConditionIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.condition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ConditionIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.condition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
