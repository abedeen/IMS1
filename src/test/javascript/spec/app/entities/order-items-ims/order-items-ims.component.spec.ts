/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Ims1TestModule } from '../../../test.module';
import { OrderItemsImsComponent } from 'app/entities/order-items-ims/order-items-ims.component';
import { OrderItemsImsService } from 'app/entities/order-items-ims/order-items-ims.service';
import { OrderItemsIms } from 'app/shared/model/order-items-ims.model';

describe('Component Tests', () => {
    describe('OrderItemsIms Management Component', () => {
        let comp: OrderItemsImsComponent;
        let fixture: ComponentFixture<OrderItemsImsComponent>;
        let service: OrderItemsImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [OrderItemsImsComponent],
                providers: []
            })
                .overrideTemplate(OrderItemsImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderItemsImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemsImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderItemsIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
