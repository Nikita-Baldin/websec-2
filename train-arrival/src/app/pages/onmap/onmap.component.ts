import {Component, OnInit} from '@angular/core';
import {MapComponent} from "../../map/map.component";
import {NgIf} from "@angular/common";
import {StationScheduleComponent} from "../../station-schedule/station-schedule.component";
import {StationService} from "../../services/station-code.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-onmap',
  standalone: true,
  imports: [
    MapComponent,
    StationScheduleComponent,
    NgIf
  ],
  templateUrl: './onmap.component.html',
  styleUrl: './onmap.component.css'
})
export class OnmapComponent implements OnInit{
  selectedStationCode: string | null = null;
  private subscription!: Subscription;
  constructor(private stationService: StationService) {}

  ngOnInit() {
    this.subscription = this.stationService.selectedStations$.subscribe(([from, to]) => {});
  }

  onStationSelected(code: string) {
    this.selectedStationCode = code;
    console.log(this.selectedStationCode);
    this.stationService.setFromStation(code);
  }
}
