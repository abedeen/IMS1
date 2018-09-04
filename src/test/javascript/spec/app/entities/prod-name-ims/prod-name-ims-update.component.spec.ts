/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { ProdNameImsUpdateComponent } from 'app/entities/prod-name-ims/prod-name-ims-update.component';
import { ProdNameImsService } from 'app/entities/prod-name-ims/prod-name-ims.service';
import { ProdNameIms } from 'app/shared/model/prod-name-ims.model';

describe('Component Tests', () => {
    describe('ProdNameIms Management Update Component', () => {
        let comp: ProdNameImsUpdateComponent;
        let fixture: ComponentFixture<ProdNameImsUpdateComponent>;
        let service: ProdNameImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ProdNameImsUpdateComponent]
            })
                .overrideTemplate(ProdNameImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProdNameImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdNameImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProdNameIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prodName = entity;
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
                    const entity = new ProdNameIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prodName = entity;
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
