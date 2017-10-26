import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {TreeComponent} from 'angular-tree-component';
import {DataService} from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import {UtilityService} from '../../core/services/utility.service';
import {MessageConstants} from '../../core/common/message.constants';

@Component({
    selector: 'app-product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

    @ViewChild('addEditModal')
    public addEditModal: ModalDirective;
    @ViewChild(TreeComponent)
    private treeProductCategory: TreeComponent;
    public filter = '';
    public entity: any;
    public functionId: string;
    public _productCategoryHierachy: any[];
    public _productCategories: any[];

    constructor(private dataService: DataService,
                private notifyService: NotificationService,
                private utilService: UtilityService) {
    }

    ngOnInit() {
        this.search();
        this.getListForDropdown();
    }

    public createAlias() {
        this.entity.Alias = this.utilService.MakeSeoTitle(this.entity.Name);
    }

    public search() {
        this.dataService.get('/api/productCategory/getall?filter=' + this.filter)
            .subscribe((response: any[]) => {
                this._productCategoryHierachy = this.utilService.Unflatten2(response);
                this._productCategories = response;
            }, error => this.dataService.handleError(error));
    }

    public getListForDropdown() {
        this.dataService.get('/api/productCategory/getallhierachy')
            .subscribe((response: any[]) => {
                this._productCategories = response;
            }, error => this.dataService.handleError(error));
    }

    public showAdd() {
        this.entity = {};
        this.addEditModal.show();
    }

    public showEdit(id: string) {
        this.dataService.get('/api/productCategory/detail/' + id).subscribe((response: any[]) => {
            this.entity = response;
            this.addEditModal.show();
        }, error => this.dataService.handleError(error));
    }

    // Action delete
    public deleteConfirm(id: string): void {
        this.dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
            this.notifyService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
            this.search();
        }, error => this.dataService.handleError(error));
    }

    // Click button delete turn on confirm
    public delete(id: string) {
        this.notifyService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
    }

    // Save change for modal popup
    public saveChanges(valid: boolean) {
        if (valid) {
            if (this.entity.ID == undefined) {
                this.dataService.post('/api/productCategory/add', JSON.stringify(this.entity)).subscribe((response: any) => {
                    this.search();
                    this.addEditModal.hide();
                    this.notifyService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
                }, error => this.dataService.handleError(error));
            }
            else {
                this.dataService.put('/api/productCategory/update', JSON.stringify(this.entity)).subscribe((response: any) => {
                    this.search();
                    this.addEditModal.hide();
                    this.notifyService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
                }, error => this.dataService.handleError(error));
            }
        }
    }

    public onSelectedChange($event) {
        console.log($event);
    }
}
