import {Component, OnInit} from '@angular/core';
import {AuthenService} from '../core/services/authen.service';
import {NotificationService} from '../core/services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UrlConstants} from '../core/common/url.constants';
import {MessageConstants} from '../core/common/message.constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading = false;
    model = {username: '', password: ''};
    returnUrl: string;

    constructor(private router: Router,
                private activatedRouter: ActivatedRoute,
                private authService: AuthenService
        , private notifyService: NotificationService) {
    }

    ngOnInit() {
        this.activatedRouter.queryParams.subscribe(params => {
            this.returnUrl = params['returnUrl'] || UrlConstants.HOME;
        });
    }

    login() {
        this.loading = true;
        this.authService.login(this.model.username, this.model.password).subscribe(data => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
            this.loading = false;
        });
    }
}
