/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { NameEntityImsDetailComponent } from 'app/entities/name-entity-ims/name-entity-ims-detail.component';
import { NameEntityIms } from 'app/shared/model/name-entity-ims.model';

describe('Component Tests', () => {
    describe('NameEntityIms Management Detail Component', () => {
        let comp: NameEntityImsDetailComponent;
        let fixture: ComponentFixture<NameEntityImsDetailComponent>;
        const route = ({ data: of({ nameEntity: new NameEntityIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [NameEntityImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NameEntityImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NameEntityImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nameEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
