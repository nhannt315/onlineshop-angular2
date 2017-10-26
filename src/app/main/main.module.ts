import {HomeModule} from './home/home.module';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {UtilityService} from '../core/services/utility.service';
import {AuthenService} from '../core/services/authen.service';
import {mainRoutes} from './main.routes';
import {SideBarComponent} from '../shared/side-bar/side-bar.component';
import {TopMenuComponent} from '../shared/top-menu/top-menu.component';
import {DataService} from '../core/services/data.service';
import {NotificationService} from '../core/services/notification.service';

@NgModule({
    imports: [
        CommonModule,
        HomeModule,
        RouterModule.forChild(mainRoutes)
    ],
    declarations: [MainComponent, SideBarComponent, TopMenuComponent],
    providers: [UtilityService, AuthenService, DataService, NotificationService]
})
export class MainModule {
}
