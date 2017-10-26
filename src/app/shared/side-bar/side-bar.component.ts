import {Component, OnInit} from '@angular/core';
import {LoggedInUser} from '../../core/domain/loggedin.user';
import {SystemConstants} from '../../core/common/system.constants';
import {AuthenService} from '../../core/services/authen.service';
import {DataService} from '../../core/services/data.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    public user: LoggedInUser;
    public functions: any[];

    constructor(private authService: AuthenService, private dataService: DataService) {
    }

    ngOnInit() {
        this.user = this.authService.getLoggedInUser();
        this.dataService.get('/api/function/getlisthierarchy').subscribe((response: any[]) => {
            console.log(response);
            this.functions = response.sort((n1, n2) => {
                if (n1.DisplayOrder < n2.DisplayOrder) {
                    return -1;
                } else if (n1.DisplayOrder > n2.DisplayOrder) {
                    return 1;
                }
                return 0;
            });
        }, error => this.dataService.handleError(error));
    }

}
