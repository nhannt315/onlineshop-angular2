import {RouterModule, Routes} from '@angular/router';
import {ProductCategoryComponent} from './product-category.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: ProductCategoryComponent}
];

export const ProductCategoryRoute = RouterModule.forChild(routes);
