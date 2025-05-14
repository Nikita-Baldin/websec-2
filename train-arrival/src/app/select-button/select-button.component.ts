import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StationService} from "../services/station-code.service";

@Component({
  selector: 'app-select-button',
  standalone: true,
  imports: [],
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.css'
})
export class SelectButtonComponent {
  @Input() code!: string;
  @Output() stationSelected = new EventEmitter<string>();

  constructor(private stationService: StationService) {}

  onSelectStation() {
    this.stationService.resetStations();
    this.stationService.setFromStation(this.code);
    this.stationSelected.emit(this.code);
    console.log("Выбрана станция:", this.code);
  }
}
