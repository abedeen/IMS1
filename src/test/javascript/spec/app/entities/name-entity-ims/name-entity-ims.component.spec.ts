/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Ims1TestModule } from '../../../test.module';
import { NameEntityImsComponent } from 'app/entities/name-entity-ims/name-entity-ims.component';
import { NameEntityImsService } from 'app/entities/name-entity-ims/name-entity-ims.service';
import { NameEntityIms } from 'app/shared/model/name-entity-ims.model';

describe('Component Tests', () => {
    describe('NameEntityIms Management Component', () => {
        let comp: NameEntityImsComponent;
        let fixture: ComponentFixture<NameEntityImsComponent>;
        let service: NameEntityImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [NameEntityImsComponent],
                providers: []
            })
                .overrideTemplate(NameEntityImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NameEntityImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NameEntityImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NameEntityIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nameEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
