import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';

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

    constructor(public dialog: MatDialog) {}

    ngOnInit() {}

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            width: '500px',
            data: { username: this.username, firstName: this.firstName, lastName: this.lastName, password: this.password }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('User Created');
            this.username = result;
        });
    }
}
