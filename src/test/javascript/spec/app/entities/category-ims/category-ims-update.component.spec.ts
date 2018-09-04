/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { CategoryImsUpdateComponent } from 'app/entities/category-ims/category-ims-update.component';
import { CategoryImsService } from 'app/entities/category-ims/category-ims.service';
import { CategoryIms } from 'app/shared/model/category-ims.model';

describe('Component Tests', () => {
    describe('CategoryIms Management Update Component', () => {
        let comp: CategoryImsUpdateComponent;
        let fixture: ComponentFixture<CategoryImsUpdateComponent>;
        let service: CategoryImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [CategoryImsUpdateComponent]
            })
                .overrideTemplate(CategoryImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoryImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CategoryIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.category = entity;
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
                    const entity = new CategoryIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.category = entity;
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
