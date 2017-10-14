import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {ModalDirective} from 'ngx-bootstrap';
import {NotificationService} from '../../core/services/notification.service';
import {MessageConstants} from '../../core/common/message.constants';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
    @ViewChild('modalAddEdit')
    public modalAddEdit: ModalDirective;
    public pageIndex = 1;
    public pageSize = 10;
    public pageDisplay = 10;
    public filter = '';
    public totalRow: number;
    public entity: any;

    roles: any[];

    constructor(private dataService: DataService, private notifyService: NotificationService) {
    }

    ngOnInit() {
        this.loadData();
    }

    saveChange(isValid: boolean) {
        console.log(isValid);
        if (isValid) {
            if (this.entity.Id === undefined) {
                this.dataService.post('/api/appRole/add', JSON.stringify(this.entity)).subscribe((response: any) => {
                    this.loadData();
                    this.modalAddEdit.hide();
                    this.notifyService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
                }, error => this.dataService.handleError(error));
            } else {
                this.dataService.put('/api/appRole/update', JSON.stringify(this.entity)).subscribe((response: any) => {
                    this.loadData();
                    this.modalAddEdit.hide();
                    this.notifyService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
                }, error => this.dataService.handleError(error));
            }
        }
    }

    loadData() {
        this.dataService.get(
            `/api/appRole/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`
        ).subscribe((response: any) => {
            this.roles = response.Items;
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
        this.loadRole(id);
        this.modalAddEdit.show();
    }

    loadRole(id: any) {
        this.dataService.get(`/api/appRole/detail/${id}`).subscribe((response) => {
            this.entity = response;
        });
    }

    deleteRole(id: any) {
        this.notifyService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteRoleConfirm(id));
    }

    deleteRoleConfirm(id: any) {
        this.dataService.delete(`/api/appRole/delete`, 'id', id).subscribe((response) => {
            this.notifyService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
            this.loadData();
        }, error => {
            this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
        });
    }

}
