import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './role.component';
import {RouterModule, Routes} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';

const roleRoutes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: RoleComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(roleRoutes)
    ],
    providers: [DataService, NotificationService],
    declarations: [RoleComponent]
})
export class RoleModule {
}
