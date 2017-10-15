import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {DataService} from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import {MessageConstants} from '../../core/common/message.constants';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';

declare let moment: any;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    @ViewChild('modalAddEdit')
    public modalAddEdit: ModalDirective;
    public myRoles: string[] = [];
    public pageIndex = 1;
    public pageSize = 5;
    public pageDisplay = 10;
    public filter = '';
    public totalRow: number;
    public entity: any;

    public allRoles: IMultiSelectOption[] = [];
    public roles: any[];
    users: any[];

    public dateOptions: any = {
        locale: {format: 'DD/MM/YYYY'},
        alwaysShowCalendars: false,
        singleDatePicker: true
    };

    constructor(private dataService: DataService, private notifyService: NotificationService) {
    }

    ngOnInit() {
        this.loadData();
        this.getRoleList();
    }

    saveChange(isValid: boolean) {
        if (isValid) {
            console.log(this.entity);
            this.entity.Roles = this.myRoles;
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
}
