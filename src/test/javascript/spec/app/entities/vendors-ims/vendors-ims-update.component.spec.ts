/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { VendorsImsUpdateComponent } from 'app/entities/vendors-ims/vendors-ims-update.component';
import { VendorsImsService } from 'app/entities/vendors-ims/vendors-ims.service';
import { VendorsIms } from 'app/shared/model/vendors-ims.model';

describe('Component Tests', () => {
    describe('VendorsIms Management Update Component', () => {
        let comp: VendorsImsUpdateComponent;
        let fixture: ComponentFixture<VendorsImsUpdateComponent>;
        let service: VendorsImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [VendorsImsUpdateComponent]
            })
                .overrideTemplate(VendorsImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VendorsImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendorsImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VendorsIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vendors = entity;
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
                    const entity = new VendorsIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vendors = entity;
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
