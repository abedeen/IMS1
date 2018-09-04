/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Ims1TestModule } from '../../../test.module';
import { CategoryImsDetailComponent } from 'app/entities/category-ims/category-ims-detail.component';
import { CategoryIms } from 'app/shared/model/category-ims.model';

describe('Component Tests', () => {
    describe('CategoryIms Management Detail Component', () => {
        let comp: CategoryImsDetailComponent;
        let fixture: ComponentFixture<CategoryImsDetailComponent>;
        const route = ({ data: of({ category: new CategoryIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [CategoryImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CategoryImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoryImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.category).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
