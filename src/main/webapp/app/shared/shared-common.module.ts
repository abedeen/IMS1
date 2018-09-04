import { NgModule } from '@angular/core';

import { Ims1SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Ims1SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Ims1SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Ims1SharedCommonModule {}
