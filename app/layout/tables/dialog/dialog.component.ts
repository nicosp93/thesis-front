import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatButtonModule } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';

@Component({
    selector: 'app-not-admin',
    template: `
        <span class="example-pizza-party">
            You are not an Administrator
        </span>
    `,
    styles: []
})
export class NotAdminComponent {}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
    username: string;
    firstName: string;
    lastName: string;
    password: string;

    public isAdmin: string;

    constructor(public dialog: MatDialog,  private snackBar: MatSnackBar) {}
    ngOnInit() {
        this.isAdmin = localStorage.getItem('isAdmin');
    }
    openDialog(): void {
    	if (this.isAdmin === 'true') {
		    const dialogRef = this.dialog.open(DialogOverviewComponent, {
		        width: '500px',
		        data: { username: this.username, firstName: this.firstName, lastName: this.lastName, password: this.password }
		    });

		    dialogRef.afterClosed().subscribe(result => {
		        this.username = result;
		    });
    	} else {
   			this.openNotAdmin();
   		}

    }
    openNotAdmin() {
        this.snackBar.openFromComponent(NotAdminComponent, {
        	duration:  1000,
    	});
    }
}
