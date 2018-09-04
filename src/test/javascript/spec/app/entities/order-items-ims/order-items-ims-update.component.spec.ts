/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { OrderItemsImsUpdateComponent } from 'app/entities/order-items-ims/order-items-ims-update.component';
import { OrderItemsImsService } from 'app/entities/order-items-ims/order-items-ims.service';
import { OrderItemsIms } from 'app/shared/model/order-items-ims.model';

describe('Component Tests', () => {
    describe('OrderItemsIms Management Update Component', () => {
        let comp: OrderItemsImsUpdateComponent;
        let fixture: ComponentFixture<OrderItemsImsUpdateComponent>;
        let service: OrderItemsImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [OrderItemsImsUpdateComponent]
            })
                .overrideTemplate(OrderItemsImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderItemsImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemsImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderItemsIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderItems = entity;
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
                    const entity = new OrderItemsIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderItems = entity;
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
