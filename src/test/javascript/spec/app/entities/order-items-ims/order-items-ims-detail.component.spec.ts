/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { OrderItemsImsDetailComponent } from 'app/entities/order-items-ims/order-items-ims-detail.component';
import { OrderItemsIms } from 'app/shared/model/order-items-ims.model';

describe('Component Tests', () => {
    describe('OrderItemsIms Management Detail Component', () => {
        let comp: OrderItemsImsDetailComponent;
        let fixture: ComponentFixture<OrderItemsImsDetailComponent>;
        const route = ({ data: of({ orderItems: new OrderItemsIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [OrderItemsImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderItemsImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderItemsImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderItems).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
