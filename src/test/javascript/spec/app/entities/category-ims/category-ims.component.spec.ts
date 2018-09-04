/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Ims1TestModule } from '../../../test.module';
import { CategoryImsComponent } from 'app/entities/category-ims/category-ims.component';
import { CategoryImsService } from 'app/entities/category-ims/category-ims.service';
import { CategoryIms } from 'app/shared/model/category-ims.model';

describe('Component Tests', () => {
    describe('CategoryIms Management Component', () => {
        let comp: CategoryImsComponent;
        let fixture: ComponentFixture<CategoryImsComponent>;
        let service: CategoryImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [CategoryImsComponent],
                providers: []
            })
                .overrideTemplate(CategoryImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoryImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CategoryIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.categories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
