import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Message } from 'src/app/message.model';
import { Observable } from 'rxjs';
import { DataStored } from 'src/app/dataStored.model';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
    typeOfData: string ;

    @ViewChild(ToolTipComponent)
    set typeOfInfo(component: ToolTipComponent){
        setTimeout(() => { 
            this.typeOfData = component.dataSelected;
            console.log("leo del hijo:");
            console.log(component.dataSelected);
        }, 100);
    }
    @ViewChild(ToolTipComponent) test2: ToolTipComponent;

    dataType: string;
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: string;
    public barChartLegend: boolean;
   
    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string;

    // Radar
    public radarChartLabels: string[] = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];
    public radarChartType: string;

    // Pie
    public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string;

    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean;

    public polarAreaChartType: string;

    
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
        'dec2'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean;
    public lineChartType: string;

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
    public dataValues = new Array<Array<number>>();
    public devices = new Array<string>();
    public lineChartData: Array<any> = [];

    public 
    public loaded:boolean = false;
    lastWeekMessages(){
        this.loaded= false;
        this.clearVariables();
        console.log("Test");
        console.log(this.dataType);
        var today: Date = new Date();
        var day_one: Date = new Date();day_one.setDate(today.getDate() -1);
        var day_two: Date = new Date();day_two.setDate(today.getDate() -2);
        var day_three: Date = new Date();day_three.setDate(today.getDate() -3);
        var day_four: Date = new Date();day_four.setDate(today.getDate() -4);
        var day_five: Date = new Date();day_five.setDate(today.getDate() -5);
        var day_six: Date = new Date();day_six.setDate(today.getDate() -6);
        this.lineChartLabels = [today.toString().substring(0,15), day_one.toString().substring(0,15), day_two.toString().substring(0,15), day_three.toString().substring(0,15), day_four.toString().substring(0,15), day_five.toString().substring(0,15), day_six.toString().substring(0,15)];
        var lastDatePerDevice  = new Array<Date>();
        


        this.dataApi.getLastWeek(this.dataType).subscribe((list :Message[]) => {
        for( let i = 0; i <  list.length; i++){
            if(this.devices.indexOf(list[i].sensorId) === -1 ){
                this.devices.push(list[i].sensorId);
                lastDatePerDevice.push(list[i].date);
                var arrayAux: number[] = [+list[i].value];
                this.dataValues.push(arrayAux);
                console.log("Del Device:"+this.devices[this.devices.length-1]);
                console.log ("Nuevo deviceId:"+ this.devices[this.devices.length-1]);
                console.log("Nueva ultima fecha:"+ lastDatePerDevice[this.devices.length-1]);
                console.log("Numero total de devices actual:"+ this.devices.length);
            } else {
                console.log("Del Device:"+this.devices[this.devices.indexOf(list[i].sensorId)]);
                if(this.sameDayOfWeek(list[i].date, lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] )){
                    var oldValue :number = this.dataValues[this.devices.indexOf(list[i].sensorId)][this.dataValues[this.devices.indexOf(list[i].sensorId)].length-1];
                    var newValue :number = +list[i].value;
                    var average  :number = (oldValue+newValue)/2;
                    console.log("Same date, So Average of "+ newValue +" and "+ oldValue +" is "+ average);
                    this.dataValues[this.devices.indexOf(list[i].sensorId)][0] = average;
                }else{
                     this.dataValues[this.devices.indexOf(list[i].sensorId)].push(+list[i].value);
                     lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] = list[i].date;
                     console.log("Wasnt the same date, so we add new last date"+ lastDatePerDevice[this.devices.indexOf(list[i].sensorId)]);
                }
            }
        }
        //Assign variables
        var weeklyValues  = new Array<Array<number>>();


        this.lineChartData.length = 0;
        for(let n=0; n < this.devices.length; n++){
            this.lineChartData.push({
                label : this.devices[n],
                data : this.dataValues[n]
            });
        }
        this.loaded = true;
        console.log(this.lineChartData);
        console.log(lastDatePerDevice);
      });
    }

    constructor(private dataApi: ApiService, private datePipe: DatePipe) {}

    ngOnInit() {
        //BaseChartDirective.defaults.line.spanGaps = true;
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lastWeeklyMessages();
    }

    sameDayOfWeek( date1: Date, date2: Date): boolean {
        console.log(date1);
         console.log(date2);
        console.log("Evaluating if same date: "+date1.toString()+ " and "+ date2.toString());
        if (date1 == date2) {
            return true;
        } else {
            return false;
        }
    }

    talkBack(e:string) {
        this.dataType = e;
        console.log(this.dataType);
        this.lastWeeklyMessages()
    }

    clearVariables(){
        this.dataValues = new Array<Array<number>>();
        this.devices = new Array<string>();
        this.lineChartData= new Array<any>();
    }

    lastWeeklyMessages(){
        this.loaded= false;
        this.clearVariables();
        console.log("Test");
        console.log(this.dataType);
        var today: Date = new Date();
        var day_one: Date = new Date();day_one.setDate(today.getDate() -1);
        var day_two: Date = new Date();day_two.setDate(today.getDate() -2);
        var day_three: Date = new Date();day_three.setDate(today.getDate() -3);
        var day_four: Date = new Date();day_four.setDate(today.getDate() -4);
        var day_five: Date = new Date();day_five.setDate(today.getDate() -5);
        var day_six: Date = new Date();day_six.setDate(today.getDate() -6);
        this.lineChartLabels = [this.datePipe.transform(today, "yyyy-MM-dd"),this.datePipe.transform(day_one, "yyyy-MM-dd"),this.datePipe.transform(day_two, "yyyy-MM-dd"), this.datePipe.transform(day_three, "yyyy-MM-dd"), this.datePipe.transform(day_four, "yyyy-MM-dd"), this.datePipe.transform(day_five, "yyyy-MM-dd"), this.datePipe.transform(day_six, "yyyy-MM-dd")];
        var lastDatePerDevice  = new Array<Date>();
        this.dataApi.getLastWeek(this.dataType).subscribe((list :Message[]) => {
        for( let i = 0; i <  list.length; i++){
            if(this.devices.indexOf(list[i].sensorId) === -1 ){
                this.devices.push(list[i].sensorId);
                lastDatePerDevice.push(list[i].date);
                var arrayAux: number[] = [+list[i].value];
                this.setValueInDayOfWeek(list[i], true);
                console.log("Del Device:"+this.devices[this.devices.length-1]);
                console.log ("Nuevo deviceId:"+ this.devices[this.devices.length-1]);
                console.log("Nueva ultima fecha:"+ lastDatePerDevice[this.devices.length-1]);
                console.log("Numero total de devices actual:"+ this.devices.length);
            } else {
                console.log("Del Device:"+this.devices[this.devices.indexOf(list[i].sensorId)]);
                if(this.sameDayOfWeek(list[i].date, lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] )){
                    var oldValue :number = this.dataValues[this.devices.indexOf(list[i].sensorId)][this.lineChartLabels.indexOf(list[i].date)];
                    var newValue :number = +list[i].value;
                    var average  :number = (oldValue+newValue)/2;
                    console.log("Same date, So Average of "+ newValue +" and "+ oldValue +" is "+ average);
                    this.dataValues[this.devices.indexOf(list[i].sensorId)][this.lineChartLabels.indexOf(list[i].date)] = average;
                }else{
                    this.setValueInDayOfWeek(list[i], false);
                    lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] = list[i].date;
                    console.log("Wasnt the same date, so we add new date"+ lastDatePerDevice[this.devices.indexOf(list[i].sensorId)]);
                }
            }
        }
        //Assign variables
        var weeklyValues  = new Array<Array<number>>();


        this.lineChartData.length = 0;
        for(let n=0; n < this.devices.length; n++){
            this.lineChartData.push({
                label : this.devices[n],
                data : this.dataValues[n]
            });
        }
        console.log("LastThings");
        console.log(this.lineChartData);
        console.log(lastDatePerDevice);
        console.log(this.dataValues);
        console.log("LastThings");
        this.loaded = true;
        
      });
    }

    setValueInDayOfWeek(item: Message, firstTime:Boolean){
        if(firstTime){
            var fixLenght: Array<number> = [null, null, null, null, null, null, null];
            this.dataValues.push(fixLenght);
            console.log("dateaverno");
            console.log(item.date);
            console.log(this.lineChartLabels);
            this.dataValues[this.dataValues.length-1][this.lineChartLabels.indexOf(item.date)] = +item.value;
        }else{
            this.dataValues[this.devices.indexOf(item.sensorId)][this.lineChartLabels.indexOf(item.date)] = +item.value;
        }
    }

}


