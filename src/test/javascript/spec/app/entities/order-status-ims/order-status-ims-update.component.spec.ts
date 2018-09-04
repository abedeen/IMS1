/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { OrderStatusImsUpdateComponent } from 'app/entities/order-status-ims/order-status-ims-update.component';
import { OrderStatusImsService } from 'app/entities/order-status-ims/order-status-ims.service';
import { OrderStatusIms } from 'app/shared/model/order-status-ims.model';

describe('Component Tests', () => {
    describe('OrderStatusIms Management Update Component', () => {
        let comp: OrderStatusImsUpdateComponent;
        let fixture: ComponentFixture<OrderStatusImsUpdateComponent>;
        let service: OrderStatusImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [OrderStatusImsUpdateComponent]
            })
                .overrideTemplate(OrderStatusImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderStatusImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderStatusImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderStatusIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderStatus = entity;
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
                    const entity = new OrderStatusIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderStatus = entity;
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
