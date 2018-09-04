/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Ims1TestModule } from '../../../test.module';
import { VendorsImsComponent } from 'app/entities/vendors-ims/vendors-ims.component';
import { VendorsImsService } from 'app/entities/vendors-ims/vendors-ims.service';
import { VendorsIms } from 'app/shared/model/vendors-ims.model';

describe('Component Tests', () => {
    describe('VendorsIms Management Component', () => {
        let comp: VendorsImsComponent;
        let fixture: ComponentFixture<VendorsImsComponent>;
        let service: VendorsImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Ims1TestModule],
                declarations: [VendorsImsComponent],
                providers: []
            })
                .overrideTemplate(VendorsImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VendorsImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendorsImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VendorsIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vendors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
