/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Ims1TestModule } from '../../../test.module';
import { ProdNameImsComponent } from 'app/entities/prod-name-ims/prod-name-ims.component';
import { ProdNameImsService } from 'app/entities/prod-name-ims/prod-name-ims.service';
import { ProdNameIms } from 'app/shared/model/prod-name-ims.model';

describe('Component Tests', () => {
    describe('ProdNameIms Management Component', () => {
        let comp: ProdNameImsComponent;
        let fixture: ComponentFixture<ProdNameImsComponent>;
        let service: ProdNameImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [ProdNameImsComponent],
                providers: []
            })
                .overrideTemplate(ProdNameImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProdNameImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdNameImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProdNameIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prodNames[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
