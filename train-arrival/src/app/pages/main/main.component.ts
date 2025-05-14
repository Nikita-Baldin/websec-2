import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiService, Station} from "../../services/api.service";
import {StationCardComponent} from "../../station-card/station-card.component";
import {NgIf} from "@angular/common";
import {StationScheduleComponent} from "../../station-schedule/station-schedule.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    StationCardComponent,
    NgIf,
    StationScheduleComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements  OnInit{
  inputValue: string = '';
  stations: any[] = [];
  station?: Station = undefined;
  showScheduleClicked: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllStations().subscribe(data => {
      this.stations = data.stations;
      console.log(this.stations);
    });
  }

  search() {
    if (!this.stations) this.station = undefined;
    this.station = this.stations.find(st => st.title.toLowerCase() === this.inputValue.toLowerCase() &&
      ['suburban', 'train'].includes(st.transport_type));
    console.log(this.station?.code);
  }

  onStationSelected(code: string) {
    console.log('Station selected with code:', code);
    this.showScheduleClicked = true;
  }
}
