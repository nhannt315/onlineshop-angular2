import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {UtilityService} from '../core/services/utility.service';
import {AuthenService} from '../core/services/authen.service';
import {mainRoutes} from './main.routes';
import {FunctionModule} from './function/function.module';
import {RoleModule} from './role/role.module';

@NgModule({
    imports: [
        CommonModule,
        HomeModule,
        FunctionModule,
        UserModule,
        RoleModule,
        RouterModule.forChild(mainRoutes)
    ],
    declarations: [MainComponent],
    providers: [UtilityService, AuthenService]
})
export class MainModule {
}
