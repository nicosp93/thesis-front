import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api.service';
import { Message } from 'src/app/message.model';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    displayedColumns = [ 'sensorId', 'name', 'value', 'time','date'];
    dataSource: MatTableDataSource<Message>;

    @Input() public perdevice: boolean = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dataApi: ApiService) {
        // Get last 20 messages
        const users: Message[] = [];
        this.dataApi.getAllMessages().subscribe((list :Message[]) => {
            this.dataSource.data = list.slice(0, 20);
        }
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
        console.log(this.dataSource);
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        if(this.perdevice){
            console.log("si");
        }else{
            console.log("no");
        }
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