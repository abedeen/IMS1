/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Ims1TestModule } from '../../../test.module';
import { ConditionImsComponent } from 'app/entities/condition-ims/condition-ims.component';
import { ConditionImsService } from 'app/entities/condition-ims/condition-ims.service';
import { ConditionIms } from 'app/shared/model/condition-ims.model';

describe('Component Tests', () => {
    describe('ConditionIms Management Component', () => {
        let comp: ConditionImsComponent;
        let fixture: ComponentFixture<ConditionImsComponent>;
        let service: ConditionImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ConditionImsComponent],
                providers: []
            })
                .overrideTemplate(ConditionImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConditionImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConditionImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ConditionIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.conditions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
