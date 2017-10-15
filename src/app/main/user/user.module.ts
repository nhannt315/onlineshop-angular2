import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {FormsModule} from '@angular/forms';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {DataService} from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {Daterangepicker} from 'ng2-daterangepicker';

const userRoutes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: UserComponent}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MultiselectDropdownModule,
        Daterangepicker,
        RouterModule.forChild(userRoutes),
        PaginationModule.forRoot(),
        ModalModule.forRoot()
    ],
    providers: [DataService, NotificationService],
    declarations: [UserComponent]
})
export class UserModule {
}
