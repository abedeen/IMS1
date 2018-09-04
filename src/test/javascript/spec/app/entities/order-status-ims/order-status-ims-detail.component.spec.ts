/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { OrderStatusImsDetailComponent } from 'app/entities/order-status-ims/order-status-ims-detail.component';
import { OrderStatusIms } from 'app/shared/model/order-status-ims.model';

describe('Component Tests', () => {
    describe('OrderStatusIms Management Detail Component', () => {
        let comp: OrderStatusImsDetailComponent;
        let fixture: ComponentFixture<OrderStatusImsDetailComponent>;
        const route = ({ data: of({ orderStatus: new OrderStatusIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [OrderStatusImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderStatusImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderStatusImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderStatus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
