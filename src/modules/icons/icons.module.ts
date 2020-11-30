/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fontAwesomeSolidIcons } from './icons.font-awesome-solid';
import { fontAwesomeRegularIcons } from './icons.font-awesome-regular';
import { fontAwesomeBrandsIcons } from './icons.font-awesome-brands';

import { ArrowDownComponent } from './arrow-down/arrow-down.component';
import { ArrowUpComponent } from './arrow-up/arrow-up.component';

@NgModule({
    declarations: [ ArrowDownComponent, ArrowUpComponent ],
    exports: [FontAwesomeModule, ArrowDownComponent, ArrowUpComponent ],
})
export class IconsModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(
            fontAwesomeSolidIcons,
            fontAwesomeRegularIcons,
            fontAwesomeBrandsIcons
        );
    }
}
