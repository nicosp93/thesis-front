import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material';
import { NgModule } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';



@Component({
    selector: 'app-dialog-overview',
    templateUrl: './dialog-overview.component.html',
    styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent implements OnInit {

    ngOnInit() {}
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewComponent>, 
        private dataApi: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
    createUser():void{
        this.dataApi.createUser(this.data.username, this.data.firstName, this.data.lastName, this.data.admin, this.data.password).subscribe(
        	res=> {
				console.log(res);
			});
        
        console.log(this.data.devices);
        
        this.dataApi.subscribeToDevice(this.data.username, this.data.devices.split(",",999)).subscribe(
            	res=> {
    				console.log(res);
    			});
    }
}
