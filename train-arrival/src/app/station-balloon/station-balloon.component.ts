import {Component, Input} from '@angular/core';
import {SelectButtonComponent} from "../select-button/select-button.component";

@Component({
  selector: 'app-station-balloon',
  standalone: true,
  imports: [
    SelectButtonComponent
  ],
  templateUrl: './station-balloon.component.html',
  styleUrl: './station-balloon.component.css'
})
export class StationBalloonComponent {
  @Input() title!: string;
  @Input() stationCode!: string;
}
