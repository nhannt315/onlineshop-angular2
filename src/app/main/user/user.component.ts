import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {DataService} from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import {MessageConstants} from '../../core/common/message.constants';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {UploadService} from '../../core/services/upload.service';
import {SystemConstants} from '../../core/common/system.constants';
import {AuthenService} from '../../core/services/authen.service';
import {UtilityService} from '../../core/services/utility.service';

declare let moment: any;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
    @ViewChild('avatar') avatar;
    public myRoles: string[] = [];
    public pageIndex = 1;
    public pageSize = 5;
    public pageDisplay = 10;
    public filter = '';
    public totalRow: number;
    public entity: any;
    public baseUrl = SystemConstants.BASE_API;

    public allRoles: IMultiSelectOption[] = [];
    public roles: any[];
    users: any[];

    public dateOptions: any = {
        locale: {format: 'DD/MM/YYYY'},
        alwaysShowCalendars: false,
        singleDatePicker: true
    };

    constructor(public authService: AuthenService,
                private dataService: DataService,
                private notifyService: NotificationService,
                private uploadService: UploadService,
                private utilService: UtilityService) {
        if (!authService.checkAccess('USER')) {
            utilService.navigateToLogin();
        }
    }

    ngOnInit() {
        this.loadData();
        this.getRoleList();
    }

    saveChange(isValid: boolean) {
        if (isValid) {
            this.entity.Roles = this.myRoles;
            const fi = this.avatar.nativeElement;
            console.log(fi.files);
            if (fi.files.length > 0) {
                this.uploadService.postWithFile('/api/upload/saveImage', null, fi.files)
                    .then((imageUrl: string) => {
                        this.entity.Avatar = imageUrl;
                    }).then(() => {
                    this.saveData();
                });
            } else {
                this.saveData();
            }
        }
    }

    selectDate(event) {
        this.entity.BirthDay = event.end.format('DD/MM/YYYY');
    }

    loadData() {
        this.dataService.get(
            `/api/appUser/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`
        ).subscribe((response: any) => {
            this.users = response.Items;
            this.pageIndex = response.PageIndex;
            this.pageSize = response.PageSize;
            this.totalRow = response.TotalRows;
        });
    }

    pageChanged(event: any): void {
        this.pageIndex = event.page;
        this.loadData();
    }

    showAddModal() {
        this.entity = {};
        this.modalAddEdit.show();
    }

    showEditModal(id: any) {
        this.entity = {};
        this.loadUserDetail(id);
        this.modalAddEdit.show();
    }

    selectGender(event) {
        this.entity.Gender = event.target.value;
    }

    getRoleList() {
        this.dataService.get(
            `/api/appRole/getlistall`
        ).subscribe((response: any) => {
            this.allRoles = [];
            for (const role of response) {
                this.allRoles.push({id: role.Name, name: role.Description});
            }
        }, error => this.dataService.handleError(error));
    }

    loadUserDetail(id: any) {
        this.dataService.get(`/api/appUser/detail/${id}`).subscribe((response) => {
            this.entity = response;
            this.myRoles = [];
            for (const role of this.entity.Roles) {
                this.myRoles.push(role);
            }
            this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
            console.log(this.entity);
        });
    }

    deleteRole(id: any) {
        this.notifyService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteRoleConfirm(id));
    }

    deleteRoleConfirm(id: any) {
        this.dataService.delete(`/api/appUser/delete`, 'id', id).subscribe((response) => {
            this.notifyService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
            this.loadData();
        }, error => {
            this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
        });
    }

    saveData() {
        if (this.entity.Id === undefined) {
            this.dataService.post('/api/appUser/add', JSON.stringify(this.entity)).subscribe((response: any) => {
                this.loadData();
                this.modalAddEdit.hide();
                this.notifyService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
            }, error => this.dataService.handleError(error));
        } else {
            this.dataService.put('/api/appUser/update', JSON.stringify(this.entity)).subscribe((response: any) => {
                this.loadData();
                this.modalAddEdit.hide();
                this.notifyService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
            }, error => this.dataService.handleError(error));
        }
    }
}


