import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FunctionComponent} from './function.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../core/services/data.service';
import {UtilityService} from '../../core/services/utility.service';
import {NotificationService} from '../../core/services/notification.service';
import {TreeModule} from 'angular-tree-component';
import {ModalModule} from 'ngx-bootstrap';

const functionRoutes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: FunctionComponent}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TreeModule,
        ModalModule,
        RouterModule.forChild(functionRoutes)
    ],
    providers: [DataService, UtilityService, NotificationService],
    declarations: [FunctionComponent]
})
export class FunctionModule {
}
