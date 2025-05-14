import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService, Station} from "../../services/api.service";
import {StationScheduleComponent} from "../../station-schedule/station-schedule.component";
import {NgIf} from "@angular/common";
import {StationService} from "../../services/station-code.service";

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    StationScheduleComponent,
    NgIf
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent implements OnInit{
  fromInput: string = '';
  toInput: string = '';
  stations: Station[] = [];
  fromStation?: Station;
  toStation?: Station;
  showScheduleClicked: boolean = false;

  constructor(private apiService: ApiService, private stationService: StationService) { }

  ngOnInit() {
    this.apiService.getAllStations().subscribe(data => {
      this.stations = data.stations;
    });
  }

  search() {
    this.stationService.resetStations();
    this.fromStation = this.stations.find(st =>
      st.title.toLowerCase() === this.fromInput.toLowerCase() &&
      ['suburban', 'train'].includes(st.transport_type)
    );
    this.stationService.setFromStation(this.fromStation!.code);
    this.toStation = this.stations.find(st =>
      st.title.toLowerCase() === this.toInput.toLowerCase() &&
      ['suburban', 'train'].includes(st.transport_type)
    );
    this.stationService.setToStation(this.toStation!.code);
    if (this.fromStation && this.toStation) {
      this.showScheduleClicked = true;
    }
  }
}
