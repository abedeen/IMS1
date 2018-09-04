/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { VendorsImsDetailComponent } from 'app/entities/vendors-ims/vendors-ims-detail.component';
import { VendorsIms } from 'app/shared/model/vendors-ims.model';

describe('Component Tests', () => {
    describe('VendorsIms Management Detail Component', () => {
        let comp: VendorsImsDetailComponent;
        let fixture: ComponentFixture<VendorsImsDetailComponent>;
        const route = ({ data: of({ vendors: new VendorsIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [VendorsImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VendorsImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VendorsImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vendors).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
