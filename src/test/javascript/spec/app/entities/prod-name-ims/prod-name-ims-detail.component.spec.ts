/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { ProdNameImsDetailComponent } from 'app/entities/prod-name-ims/prod-name-ims-detail.component';
import { ProdNameIms } from 'app/shared/model/prod-name-ims.model';

describe('Component Tests', () => {
    describe('ProdNameIms Management Detail Component', () => {
        let comp: ProdNameImsDetailComponent;
        let fixture: ComponentFixture<ProdNameImsDetailComponent>;
        const route = ({ data: of({ prodName: new ProdNameIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ProdNameImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProdNameImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProdNameImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prodName).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
