import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
    public pageIndex = 1;
    public pageSize = 1;
    public pageDisplay = 10;
    public filter = '';
    public totalRow: number;

    roles: any[];

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.loadData();
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

}
