import {Component, OnInit, ViewChild} from '@angular/core';
import {TreeComponent} from 'angular-tree-component';
import {DataService} from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import {UtilityService} from '../../core/services/utility.service';
import {ModalDirective} from 'ngx-bootstrap';
import {MessageConstants} from '../../core/common/message.constants';

@Component({
    selector: 'app-function',
    templateUrl: './function.component.html',
    styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

    @ViewChild('addEditModal')
    public addEditModal: ModalDirective;
    @ViewChild(TreeComponent)
    private treeFunction: TreeComponent;
    @ViewChild('permissionModal')
    public permissionModal: ModalDirective;

    public _functionHierachy: any[];
    public _functions: any[];
    public entity: any;
    public editFlag: boolean;
    public filter = '';
    public functionId: string;
    public _permission: any[];

    constructor(private dataService: DataService, private notifyService: NotificationService, private utilService: UtilityService) {
    }

    ngOnInit() {
        this.search();
    }

    public search() {
        this.dataService.get('/api/function/getall?filter=' + this.filter)
            .subscribe((response: any[]) => {
                this._functions = response.filter(x => x.ParentId == null);
                this._functionHierachy = this.utilService.Unflatten(response);
            }, error => this.dataService.handleError(error));
    }

    public showPermission(id: any) {
        this.dataService.get(`/api/appRole/getAllPermission?functionId=${id}`).subscribe((response: any[]) => {
            this.functionId = id;
            this._permission = response;
            this.permissionModal.show();
            console.log(this._permission);
        }, error => this.dataService.handleError(error));
    }

    public showAdd() {
        this.entity = [];
        this.addEditModal.show();
        this.editFlag = false;
    }

    public showEdit(id: string) {
        this.dataService.get(`/api/function/detail/${id}`).subscribe((response: any) => {
            this.entity = response;
            this.editFlag = true;
            this.addEditModal.show();
        }, error => this.dataService.handleError(error));
    }

    public savePermission(valid: boolean, _permission: any) {
        if (valid) {
            const data = {
                Permissions: this._permission,
                FunctionId: this.functionId
            };
            this.dataService.post('/api/appRole/savePermission', JSON.stringify(data)).subscribe((response: any) => {
                this.notifyService.printSuccessMessage(response);
                this.permissionModal.hide();
            }, error => this.dataService.handleError(error));
        }
    }

    public saveChanges(valid: boolean) {
        if (valid) {
            if (!this.editFlag) {
                this.dataService.post('/api/function/add', JSON.stringify(this.entity)).subscribe((response: any) => {
                    this.search();
                    this.addEditModal.hide();
                    this.notifyService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
                }, error => this.dataService.handleError(error));
            } else {
                this.dataService.put('/api/function/update', JSON.stringify(this.entity)).subscribe((response: any) => {
                    this.search();
                    this.addEditModal.hide();
                    this.notifyService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
                }, error => this.dataService.handleError(error));
            }
        }
    }

    public deleteConfirm(id: string): void {
        this.dataService.delete('/api/function/delete', 'id', id).subscribe((response: any) => {
            this.notifyService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
            this.search();
        }, error => this.dataService.handleError(error));
    }

    public deleteFunction(id: string) {
        this.notifyService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
    }

}
