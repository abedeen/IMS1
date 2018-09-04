/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Ims1TestModule } from '../../../test.module';
import { OrderStatusImsComponent } from 'app/entities/order-status-ims/order-status-ims.component';
import { OrderStatusImsService } from 'app/entities/order-status-ims/order-status-ims.service';
import { OrderStatusIms } from 'app/shared/model/order-status-ims.model';

describe('Component Tests', () => {
    describe('OrderStatusIms Management Component', () => {
        let comp: OrderStatusImsComponent;
        let fixture: ComponentFixture<OrderStatusImsComponent>;
        let service: OrderStatusImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [OrderStatusImsComponent],
                providers: []
            })
                .overrideTemplate(OrderStatusImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderStatusImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderStatusImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderStatusIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
