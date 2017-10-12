import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {RouterModule, Routes} from '@angular/router';
import {mainRoutes} from './main.routes';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {UtilityService} from '../core/services/utility.service';
import {AuthenService} from '../core/services/authen.service';

@NgModule({
    imports: [
        CommonModule,
        UserModule,
        HomeModule,
        RouterModule.forChild(mainRoutes)
    ],
    declarations: [MainComponent],
    providers: [UtilityService, AuthenService]
})
export class MainModule {
}
