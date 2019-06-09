import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/user.model';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    public ready:boolean = false;
    displayedColumns = [ 'username', 'firstName', 'lastName', 'admin','creationTime'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public isAdmin:string;
    
    constructor(private dataApi: ApiService) {
    	const msj: User[] = [];
		this.dataSource = new MatTableDataSource(msj);
    }

    
    ngOnInit() {
    	
        this.dataApi.getUsers().subscribe((list :User[]) => {
            this.dataSource.data = list;
            this.ready=true;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
