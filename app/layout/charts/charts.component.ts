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
    dataType: string = "temperature_1";

    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true,
        spanGaps: true
    };
    public lineChartColors: Array<any> = [
        {
            // blue
            backgroundColor: 'rgba(61,61,178,0.2)',
            borderColor: 'rgba(61,61,178,0.8)',
            pointBackgroundColor: 'rgba(61,61,178,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(61,61,178,0.8)'
        },
        {
            // green
            backgroundColor: 'rgba(119,178,61,0.2)',
            borderColor: 'rgba(119,178,61,0.8)',
            pointBackgroundColor: 'rgba(119,178,61,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(119,178,61,0.8)'
        },
        {
            //red
            backgroundColor: 'rgba(178,61,61,0.2)',
            borderColor: 'rgba(178,61,61,0.8)',
            pointBackgroundColor: 'rgba(178,61,61,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(178,61,61,0.8)'
        },
        {
            //grey
            backgroundColor: 'rgba(114,114,114,0.2)',
            borderColor: 'rgba(114,114,114,0.8)',
            pointBackgroundColor: 'rgba(114,114,114,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(114,114,114,0.8)'
        },
        {
            //orange
            backgroundColor: 'rgba(225,127,29,0.2)',
            borderColor: 'rgba(225,127,29,0.8)',
            pointBackgroundColor: 'rgba(225,127,29,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(225,127,29,0.8)'
        
        }
    ];
    public lineChartLegend: boolean;
    public lineChartType: string;

    public dataValues = new Array<Array<number>>();
    public devices = new Array<string>();
    public lineChartData: Array<any> = [];
 
    public loaded:boolean = false;

    constructor(private dataApi: ApiService, private datePipe: DatePipe) {}

    ngOnInit() {
        //BaseChartDirective.defaults.line.spanGaps = true;
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lastWeeklyMessages();
        this.last24hours();
    }

    sameDayOfWeek( date1: Date, date2: Date): boolean {
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
    clearVariablesToday(){
        this.dataValuesToday = new Array<Array<number>>();
        this.lineChartLabelsToday  = new Array<string>();
		this.devicesToday  = new Array<string>();
		this.lineChartDataToday= new Array<any>();
    }

    lastWeeklyMessages(){
        this.loaded= false;
        this.clearVariables();
        var today: Date = new Date();
        console.log("today");console.log(today);
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
            } else {
                if(this.sameDayOfWeek(list[i].date, lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] )){
                    var oldValue :number = this.dataValues[this.devices.indexOf(list[i].sensorId)][this.lineChartLabels.indexOf(list[i].date)];
                    var newValue :number = +list[i].value;
                    var average  :number = (oldValue+newValue)/2;
                    this.dataValues[this.devices.indexOf(list[i].sensorId)][this.lineChartLabels.indexOf(list[i].date)] = average;
                }else{
                    this.setValueInDayOfWeek(list[i], false);
                    lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] = list[i].date;
                }
            }
        }
        //Assign variables
        this.lineChartData.length = 0;
        for(let n=0; n < this.devices.length; n++){
            this.lineChartData.push({
                label : this.devices[n],
                data : this.dataValues[n]
            });
        }
        console.log(this.lineChartData);
        console.log(lastDatePerDevice);
        console.log(this.dataValues);
        this.loaded = true;
      });
    }

    setValueInDayOfWeek(item: Message, firstTime:Boolean){
        if(firstTime){
            var fixLenght: Array<number> = [null, null, null, null, null, null, null];
            this.dataValues.push(fixLenght);
            this.dataValues[this.dataValues.length-1][this.lineChartLabels.indexOf(item.date)] = +item.value;
        }else{
            this.dataValues[this.devices.indexOf(item.sensorId)][this.lineChartLabels.indexOf(item.date)] = +item.value;
        }
    }

    public dataTypeToday:string ="temperature_1";
    public dataValuesToday = new Array<Array<number>>();
    public devicesToday = new Array<string>();
    public lineChartLabelsToday: Array<string> = [];
    public loadedToday:boolean = false;
    public lineChartDataToday: Array<any> = [];
    last24hours(){
        this.loadedToday= false;
        this.clearVariablesToday();

        this.dataApi.getLast24hours(this.dataTypeToday).subscribe((list :Message[]) => {
            for( let i = 0; i <  list.length; i++){
            	this.lineChartLabelsToday.push(list[i].time);
            }
        	for( let i = 0; i <  list.length; i++){
                if(this.devicesToday.indexOf(list[i].sensorId) === -1 ){
                    this.devicesToday.push(list[i].sensorId);
                    this.setValueInTime(list[i],true);
                } else {
                    this.setValueInTime(list[i],false);
                }
        }
        //Assign variables
        this.lineChartDataToday.length = 0;
        for(let n=0; n < this.devicesToday.length; n++){
            this.lineChartDataToday.push({
                label : this.devicesToday[n],
                data : this.dataValuesToday[n]
            });
        }
        console.log("TODAY");
        console.log(this.dataValuesToday);
         console.log(this.devicesToday);
        console.log(this.lineChartDataToday);
        console.log(this.lineChartLabelsToday);
        this.loadedToday = true;
      });
    }

    talkBackToday(e:string) {
        this.dataTypeToday = e;
        console.log(this.dataTypeToday);
        this.last24hours()
    }

    setChartLabelHours(){
        var iter_date: Date = new Date();
        for(let i=0; i<24; i++){
            iter_date.setHours(iter_date.getHours() -1);
            var iter_str: string = this.datePipe.transform(iter_date,"hh:mm:ss");
            this.lineChartLabelsToday.push(iter_str);
        }
    }
    setValueInTime(item: Message, firstTime:Boolean){
        if(firstTime){
            var arrayAux: Array<number> = [];
            for(let i=0; i < this.lineChartLabelsToday.length;i++){
            	arrayAux.push(null);
            }
            console.log("fix lenght array");
            console.log(arrayAux);
            this.dataValuesToday.push(arrayAux);
            this.dataValuesToday[this.devicesToday.indexOf(item.sensorId)][this.lineChartLabelsToday.indexOf(item.time)] = +item.value;
        }else{
        	this.dataValuesToday[this.devicesToday.indexOf(item.sensorId)][this.lineChartLabelsToday.indexOf(item.time)] = +item.value;
        }
    }
}


