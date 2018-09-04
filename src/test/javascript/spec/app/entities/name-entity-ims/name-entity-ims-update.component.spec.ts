/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { NameEntityImsUpdateComponent } from 'app/entities/name-entity-ims/name-entity-ims-update.component';
import { NameEntityImsService } from 'app/entities/name-entity-ims/name-entity-ims.service';
import { NameEntityIms } from 'app/shared/model/name-entity-ims.model';

describe('Component Tests', () => {
    describe('NameEntityIms Management Update Component', () => {
        let comp: NameEntityImsUpdateComponent;
        let fixture: ComponentFixture<NameEntityImsUpdateComponent>;
        let service: NameEntityImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [NameEntityImsUpdateComponent]
            })
                .overrideTemplate(NameEntityImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NameEntityImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NameEntityImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NameEntityIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nameEntity = entity;
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
                    const entity = new NameEntityIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nameEntity = entity;
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
