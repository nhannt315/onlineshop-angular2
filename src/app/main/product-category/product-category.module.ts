import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCategoryComponent} from './product-category.component';
import {DataService} from '../../core/services/data.service';
import {UtilityService} from '../../core/services/utility.service';
import {TreeModule} from 'angular-tree-component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {ProductCategoryRoute} from './product-category.routes';

@NgModule({
    imports: [
        CommonModule,
        TreeModule,
        ModalModule.forRoot(),
        FormsModule,
        ProductCategoryRoute
    ],
    declarations: [ProductCategoryComponent],
    providers: [DataService, UtilityService]
})
export class ProductCategoryModule {
}
