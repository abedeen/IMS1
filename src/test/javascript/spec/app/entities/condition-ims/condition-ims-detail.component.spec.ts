/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { ConditionImsDetailComponent } from 'app/entities/condition-ims/condition-ims-detail.component';
import { ConditionIms } from 'app/shared/model/condition-ims.model';

describe('Component Tests', () => {
    describe('ConditionIms Management Detail Component', () => {
        let comp: ConditionImsDetailComponent;
        let fixture: ComponentFixture<ConditionImsDetailComponent>;
        const route = ({ data: of({ condition: new ConditionIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ConditionImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConditionImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConditionImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.condition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
