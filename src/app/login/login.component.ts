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

    constructor(private router: Router,
                private activatedRouter: ActivatedRoute,
                private authenService: AuthenService
        , private notiService: NotificationService) {
    }

    ngOnInit() {
    }

    login() {
        this.loading = true;
        this.authenService.login(this.model.username, this.model.password).subscribe(data => {
            this.router.navigate([UrlConstants.HOME]);
        }, error => {
            this.notiService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
            this.loading = false;
        });
    }
}
