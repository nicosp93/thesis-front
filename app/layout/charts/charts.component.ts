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

    constructor(private dataApi: ApiService, private datePipe: DatePipe) {
    }
    typeOfData: string ;
    dataType = 'temperature_1';

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
            // red
            backgroundColor: 'rgba(178,61,61,0.2)',
            borderColor: 'rgba(178,61,61,0.8)',
            pointBackgroundColor: 'rgba(178,61,61,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(178,61,61,0.8)'
        },
        {
            // grey
            backgroundColor: 'rgba(114,114,114,0.2)',
            borderColor: 'rgba(114,114,114,0.8)',
            pointBackgroundColor: 'rgba(114,114,114,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(114,114,114,0.8)'
        },
        {
            // orange
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

    public loaded = false;

    // Variables for last 24h chart
    public dataTypeToday = 'temperature_1';
    public dataValuesToday = new Array<Array<number>>();
    public devicesToday = new Array<string>();
    public lineChartLabelsToday: Array<string> = [];
    public loadedToday = false;
    public lineChartDataToday: Array<any> = [];

    // Variabels for last year chart
    public dataTypeYear = 'temperature_1';
    public dataValuesYear = new Array<Array<number>>();
    public devicesYear = new Array<string>();
    public lineChartLabelsYear: Array<string> = [];
    public loadedYear = false;
    public lineChartDataYear: Array<any> = [];

    ngOnInit() {
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lastWeeklyMessages();
        this.last24hours();
        this.lastyear();
    }

    sameDayOfWeek( date1: Date, date2: Date): boolean {
        if (date1 === date2) {
            return true;
        } else {
            return false;
        }
    }
    sameMonth( date1: Date, date2: Date): boolean {
        const datee1 = date1.toString().substring(0, 7);
        const datee2 = date1.toString().substring(0, 7);
        if (datee1 === datee2) {
            return true;
        } else {
            return false;
        }
    }

    talkBack(e: string) {
        this.dataType = e;
        console.log(this.dataType);
        this.lastWeeklyMessages();
    }
    talkBackToday(e: string) {
        this.dataTypeToday = e;
        console.log(this.dataTypeToday);
        this.last24hours();
    }
    talkBackYear(e: string) {
        this.dataTypeYear = e;
        console.log(this.dataTypeYear);
        this.lastyear();
    }

    clearVariables() {
        this.dataValues = new Array<Array<number>>();
        this.devices = new Array<string>();
        this.lineChartData = new Array<any>();
    }
    clearVariablesToday() {
        this.dataValuesToday = new Array<Array<number>>();
        this.lineChartLabelsToday  = new Array<string>();
        this.devicesToday  = new Array<string>();
        this.lineChartDataToday = new Array<any>();
    }
    clearVariablesYear() {
        this.dataValuesYear = new Array<Array<number>>();
        this.lineChartLabelsYear  = new Array<string>();
        this.devicesYear  = new Array<string>();
        this.lineChartDataYear = new Array<any>();
    }

    lastWeeklyMessages() {
        this.loaded = false;
        this.clearVariables();
        // Create last 7 days
        const today: Date = new Date();
        const day_one: Date = new Date(); day_one.setDate(today.getDate() - 1);
        const day_two: Date = new Date(); day_two.setDate(today.getDate() - 2);
        const day_three: Date = new Date(); day_three.setDate(today.getDate() - 3);
        const day_four: Date = new Date(); day_four.setDate(today.getDate() - 4);
        const day_five: Date = new Date(); day_five.setDate(today.getDate() - 5);
        const day_six: Date = new Date(); day_six.setDate(today.getDate() - 6);
        this.lineChartLabels = [this.datePipe.transform(today, 'yyyy-MM-dd'),
                                this.datePipe.transform(day_one, 'yyyy-MM-dd'),
                                this.datePipe.transform(day_two, 'yyyy-MM-dd'),
                                this.datePipe.transform(day_three, 'yyyy-MM-dd'),
                                this.datePipe.transform(day_four, 'yyyy-MM-dd'),
                                this.datePipe.transform(day_five, 'yyyy-MM-dd'),
                                this.datePipe.transform(day_six, 'yyyy-MM-dd')];
        const lastDatePerDevice  = new Array<Date>();
        const subscriptions: Array<string> = [];

        // Get data from Back-End
        this.dataApi.getLastWeek(this.dataType, localStorage.getItem('username')).subscribe((list: Message[]) => {
        for ( let i = 0; i <  list.length; i++) {
            if (this.devices.indexOf(list[i].sensorId) === -1 ) {
                // New Device Found
                this.devices.push(list[i].sensorId);
                lastDatePerDevice.push(list[i].date);
                const arrayAux: number[] = [+list[i].value];
                this.setValueInDayOfWeek(list[i], true);
            } else {
                // If device already is in data collected
                if (this.sameDayOfWeek(list[i].date, lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] )) {
                    // If the value is in the same day, do the average
                    const oldValue: number = this.dataValues[this.devices.indexOf(list[i].sensorId)][this.lineChartLabels
                                            .indexOf(list[i].date)];
                    const newValue: number = +list[i].value;
                    const average: number = (oldValue + newValue) / 2;
                    this.dataValues[this.devices.indexOf(list[i].sensorId)][this.lineChartLabels.indexOf(list[i].date)] = average;
                } else {
                    // If not, add new entry value
                    this.setValueInDayOfWeek(list[i], false);
                    lastDatePerDevice[this.devices.indexOf(list[i].sensorId)] = list[i].date;
                }
            }
        }
        // Assign variables
        this.lineChartData.length = 0;
        for (let n = 0; n < this.devices.length; n++) {
            this.lineChartData.push({
                label : this.devices[n],
                data : this.dataValues[n]
            });
        }
        this.loaded = true;
      });
    }

    setValueInDayOfWeek(item: Message, firstTime: Boolean) {
        if (firstTime) {
            const fixLenght: Array<number> = [null, null, null, null, null, null, null];
            this.dataValues.push(fixLenght);
            this.dataValues[this.dataValues.length - 1][this.lineChartLabels.indexOf(item.date)] = +item.value;
        } else {
            this.dataValues[this.devices.indexOf(item.sensorId)][this.lineChartLabels.indexOf(item.date)] = +item.value;
        }
    }
    setValueInMonth(item: Message, firstTime: Boolean) {
        if (firstTime) {
            const fixLenght: Array<number> = [null, null, null, null, null, null, null, null, null, null, null, null];
            this.dataValuesYear.push(fixLenght);
            console.log(item.date.toString().substring(0, 7));
            this.dataValuesYear[this.dataValuesYear.length - 1]
                                [this.lineChartLabelsYear.indexOf(item.date.toString().substring(0, 7))] = +item.value;
        } else {
            this.dataValuesYear[this.devicesYear.indexOf(item.sensorId)]
                                [this.lineChartLabelsYear.indexOf(item.date.toString().substring(0, 7))] = +item.value;
        }
    }

    last24hours() {
        this.loadedToday = false;
        this.clearVariablesToday();

        this.dataApi.getLast24hours(this.dataTypeToday, localStorage.getItem('username')).subscribe((list: Message[]) => {
            for ( let i = 0; i <  list.length; i++) {
                this.lineChartLabelsToday.push(list[i].time);
            }
            for ( let i = 0; i <  list.length; i++) {
                if (this.devicesToday.indexOf(list[i].sensorId) === -1 ) {
                    this.devicesToday.push(list[i].sensorId);
                    this.setValueInTime(list[i], true);
                } else {
                    this.setValueInTime(list[i], false);
                }
        }
        // Assign variables
        this.lineChartDataToday.length = 0;
        for (let n = 0; n < this.devicesToday.length; n++) {
            this.lineChartDataToday.push({
                label : this.devicesToday[n],
                data : this.dataValuesToday[n]
            });
        }
        this.loadedToday = true;
      });
    }
    setChartLabelHours() {
        const iter_date: Date = new Date();
        for (let i = 0; i < 24; i++) {
            iter_date.setHours(iter_date.getHours() - 1);
            const iter_str: string = this.datePipe.transform(iter_date, 'hh:mm:ss');
            this.lineChartLabelsToday.push(iter_str);
        }
    }
    setValueInTime(item: Message, firstTime: Boolean) {
        if (firstTime) {
            const arrayAux: Array<number> = [];
            for (let i = 0; i < this.lineChartLabelsToday.length; i++) {
                arrayAux.push(null);
            }
            this.dataValuesToday.push(arrayAux);
            this.dataValuesToday[this.devicesToday.indexOf(item.sensorId)][this.lineChartLabelsToday.indexOf(item.time)] = +item.value;
        } else {
            this.dataValuesToday[this.devicesToday.indexOf(item.sensorId)][this.lineChartLabelsToday.indexOf(item.time)] = +item.value;
        }
    }

    lastyear() {
        this.loadedYear = false;
        this.clearVariablesYear();
        // Create last 12 months
        const month: Date = new Date();
        for (let m = 0; m <= 11; m++) {
            const month_aux: Date = new Date();
            month_aux.setMonth(month.getMonth() - m);
            this.lineChartLabelsYear.push(this.datePipe.transform(month_aux, 'yyyy-MM'));
        }
        const lastDatePerDeviceYear  = new Array<Date>();
        const subscriptions: Array<string> = [];
        // Get data from Back-End
        this.dataApi.getLastYear(this.dataTypeYear, localStorage.getItem('username')).subscribe((list: Message[]) => {
        for ( let i = 0; i <  list.length; i++) {
            if (this.devicesYear.indexOf(list[i].sensorId) === -1 ) {
                // New Device Found
                this.devicesYear.push(list[i].sensorId);
                lastDatePerDeviceYear.push(list[i].date);
                const arrayAux: number[] = [+list[i].value];
                this.setValueInMonth(list[i], true);
            } else {
                // If device already is in data collected
                if (this.sameMonth(list[i].date, lastDatePerDeviceYear[this.devicesYear.indexOf(list[i].sensorId)] )) {
                    // If the value is in the same month, do the average
                    const oldValue: number = this.dataValuesYear[this.devicesYear.indexOf(list[i].sensorId)][this.lineChartLabelsYear
                                            .indexOf(list[i].date.toString().substring(0, 7))];
                    const newValue: number = +list[i].value;
                    const average: number = (oldValue + newValue) / 2;
                    this.dataValuesYear[this.devicesYear.indexOf(list[i].sensorId)]
                                        [this.lineChartLabelsYear.indexOf(list[i].date.toString().substring(0, 7))]
                    = average;
                } else {
                    // If not, add new entry value
                    this.setValueInMonth(list[i], false);
                    lastDatePerDeviceYear[this.devicesYear.indexOf(list[i].sensorId)] = list[i].date;
                }
            }
        }
        // Assign variables
        this.lineChartDataYear.length = 0;
        console.log('devicesyear');
        console.log(this.devicesYear);
        console.log('devicesValues');
        console.log(this.dataValuesYear);
        console.log(this.lineChartDataYear);
        for (let n = 0; n < this.devicesYear.length; n++) {
            this.lineChartDataYear.push({
                label : this.devicesYear[n],
                data : this.dataValuesYear[n]
            });
        }
        this.loadedYear = true;
      });
    }
}


