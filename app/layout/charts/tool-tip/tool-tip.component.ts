import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
    selector: 'app-tool-tip',
    templateUrl: './tool-tip.component.html',
    styleUrls: ['./tool-tip.component.scss']
})
export class ToolTipComponent implements OnInit {
    typeOfData: string[] = [];

    position = null;

    constructor(private dataApi: ApiService) {
        this.dataApi.getTypeOfData().subscribe((values :string[]) => {
            console.log(values);
            for(let i=0; i< values.length; i++){
                this.typeOfData.push(values[i]);
            }
        });
        this.position = new FormControl(this.typeOfData[0]);
    }

    ngOnInit() {}
}
