import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api.service';
import { Message } from 'src/app/message.model';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    public ready:boolean = true;
    displayedColumns = [ 'sensorId', 'name', 'value', 'time','date'];
    dataSource: MatTableDataSource<Message>;

    @Input() public perdevice: boolean = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dataApi: ApiService) {
        const msj: Message[] = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(msj);
    }

    ngOnInit() {
        if(!this.perdevice){
            this.dataApi.getAllMessages().subscribe((list :Message[]) => {
                this.dataSource.data = list.slice(0, 20);
                console.log(this.dataSource);
                this.ready=true;
            });
        }else{
            this.dataApi.getLastMsjPerDev().subscribe((list :Message[]) => {
                this.dataSource.data = list.slice(0, 20);
                console.log(this.dataSource);
                this.ready=true;
            });
        }
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





